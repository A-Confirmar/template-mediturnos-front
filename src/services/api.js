// src/services/api.js
import axios from "axios";

// Configuración base de Axios
const api = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========== AUTENTICACIÓN ==========

export const authAPI = {
  // Registro de usuario
  register: async (userData) => {
    try {
      const response = await api.post("/auth/local/register", {
        username: userData.email,
        email: userData.email,
        password: userData.password,
      });
      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login
  login: async (identifier, password) => {
    try {
      const response = await api.post("/auth/local", {
        identifier,
        password,
      });
      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// ========== PROFESIONALES ==========

export const profesionalesAPI = {
  // Obtener todos los profesionales
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.especialidad) {
        params.append("filters[especialidad][$eq]", filters.especialidad);
      }
      if (filters.nombre) {
        params.append("filters[nombre_completo][$contains]", filters.nombre);
      }
      params.append("populate", "*");

      const response = await api.get(`/profesionales?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener profesional por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/profesionales/${id}?populate=*`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Buscar profesionales
  search: async (searchTerm) => {
    try {
      const response = await api.get(
        `/profesionales?filters[nombre_completo][$contains]=${searchTerm}&populate=*`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ========== TURNOS ==========

export const turnosAPI = {
  // Crear turno
  create: async (turnoData) => {
    try {
      const response = await api.post("/turnos", {
        data: turnoData,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener turnos del usuario
  getMisTurnos: async (userId) => {
    try {
      const response = await api.get(
        `/turnos?filters[paciente][id][$eq]=${userId}&populate=*&sort=fecha:desc`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar turno
  update: async (id, turnoData) => {
    try {
      const response = await api.put(`/turnos/${id}`, {
        data: turnoData,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cancelar turno
  cancelar: async (id) => {
    try {
      const response = await api.put(`/turnos/${id}`, {
        data: { estado: "cancelado" },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default api;
