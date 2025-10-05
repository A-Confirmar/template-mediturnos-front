/**
=========================================================
* MediTurnos - Registro de Turnos
=========================================================
*/

import { useState, useEffect } from "react";

// API Service
import { turnosAPI, profesionalesAPI } from "services/api";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Appointments() {
  const [formData, setFormData] = useState({
    paciente: "",
    dni: "",
    telefono: "",
    email: "",
    profesional: "",
    especialidad: "",
    fecha: "",
    hora: "",
    motivoConsulta: "",
    obraSocial: "",
    numeroAfiliado: "",
  });

  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Cargar profesionales
  useEffect(() => {
    const loadProfesionales = async () => {
      try {
        const data = await profesionalesAPI.getAll();
        setProfesionales(data);
      } catch (err) {
        console.error("Error al cargar profesionales:", err);
      }
    };

    loadProfesionales();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await turnosAPI.create({
        fecha: formData.fecha,
        hora: formData.hora,
        tipo: "regular", // o formData.especialidad
        profesional: formData.profesional,
        motivo: formData.motivoConsulta,
      });

      console.log("Turno registrado:", response);
      setSuccess(true);

      // Limpiar formulario después de 2 segundos y redirigir
      setTimeout(() => {
        window.location.href = "/turnos";
      }, 2000);
    } catch (err) {
      setError(err.error?.message || "Error al registrar el turno");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Registro de Nuevo Turno
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  {/* Mensaje de error */}
                  {error && (
                    <MDBox mb={2}>
                      <MDTypography variant="caption" color="error" fontWeight="medium">
                        ✕ {error}
                      </MDTypography>
                    </MDBox>
                  )}

                  {/* Mensaje de éxito */}
                  {success && (
                    <MDBox mb={2}>
                      <MDTypography variant="caption" color="success" fontWeight="regular">
                        ✓ ¡Turno registrado exitosamente! Redirigiendo...
                      </MDTypography>
                    </MDBox>
                  )}

                  {/* Sección: Datos del Paciente */}
                  <MDTypography variant="h6" fontWeight="medium" mb={2}>
                    Datos del Paciente
                  </MDTypography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="text"
                        label="Nombre Completo"
                        name="paciente"
                        value={formData.paciente}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="text"
                        label="DNI"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="tel"
                        label="Teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>

                  {/* Sección: Datos del Turno */}
                  <MDTypography variant="h6" fontWeight="medium" mt={4} mb={2}>
                    Datos del Turno
                  </MDTypography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="especialidad-label">Especialidad</InputLabel>
                        <Select
                          labelId="especialidad-label"
                          name="especialidad"
                          value={formData.especialidad}
                          onChange={handleChange}
                          required
                          sx={{ height: "45px" }}
                        >
                          <MenuItem value="cardiologia">Cardiología</MenuItem>
                          <MenuItem value="dermatologia">Dermatología</MenuItem>
                          <MenuItem value="traumatologia">Traumatología</MenuItem>
                          <MenuItem value="pediatria">Pediatría</MenuItem>
                          <MenuItem value="clinica-general">Clínica General</MenuItem>
                          <MenuItem value="ginecologia">Ginecología</MenuItem>
                          <MenuItem value="oftalmologia">Oftalmología</MenuItem>
                          <MenuItem value="odontologia">Odontología</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="profesional-label">Profesional</InputLabel>
                        <Select
                          labelId="profesional-label"
                          name="profesional"
                          value={formData.profesional}
                          onChange={handleChange}
                          required
                          sx={{ height: "45px" }}
                        >
                          <MenuItem value="dr-gomez">Dr. Juan Gómez</MenuItem>
                          <MenuItem value="dra-martinez">Dra. María Martínez</MenuItem>
                          <MenuItem value="dr-lopez">Dr. Carlos López</MenuItem>
                          <MenuItem value="dra-rodriguez">Dra. Ana Rodríguez</MenuItem>
                          <MenuItem value="dr-fernandez">Dr. Pedro Fernández</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="date"
                        label="Fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="hora-label">Horario</InputLabel>
                        <Select
                          labelId="hora-label"
                          name="hora"
                          value={formData.hora}
                          onChange={handleChange}
                          required
                          sx={{ height: "45px" }}
                        >
                          <MenuItem value="08:00">08:00</MenuItem>
                          <MenuItem value="08:30">08:30</MenuItem>
                          <MenuItem value="09:00">09:00</MenuItem>
                          <MenuItem value="09:30">09:30</MenuItem>
                          <MenuItem value="10:00">10:00</MenuItem>
                          <MenuItem value="10:30">10:30</MenuItem>
                          <MenuItem value="11:00">11:00</MenuItem>
                          <MenuItem value="11:30">11:30</MenuItem>
                          <MenuItem value="12:00">12:00</MenuItem>
                          <MenuItem value="14:00">14:00</MenuItem>
                          <MenuItem value="14:30">14:30</MenuItem>
                          <MenuItem value="15:00">15:00</MenuItem>
                          <MenuItem value="15:30">15:30</MenuItem>
                          <MenuItem value="16:00">16:00</MenuItem>
                          <MenuItem value="16:30">16:30</MenuItem>
                          <MenuItem value="17:00">17:00</MenuItem>
                          <MenuItem value="17:30">17:30</MenuItem>
                          <MenuItem value="18:00">18:00</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <MDInput
                        type="text"
                        label="Motivo de Consulta"
                        name="motivoConsulta"
                        value={formData.motivoConsulta}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        required
                      />
                    </Grid>
                  </Grid>

                  {/* Sección: Obra Social (Opcional) */}
                  <MDTypography variant="h6" fontWeight="medium" mt={4} mb={2}>
                    Obra Social (Opcional)
                  </MDTypography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="obra-social-label">Obra Social</InputLabel>
                        <Select
                          labelId="obra-social-label"
                          name="obraSocial"
                          value={formData.obraSocial}
                          onChange={handleChange}
                          sx={{ height: "45px" }}
                        >
                          <MenuItem value="">Sin Obra Social</MenuItem>
                          <MenuItem value="osde">OSDE</MenuItem>
                          <MenuItem value="swiss-medical">Swiss Medical</MenuItem>
                          <MenuItem value="galeno">Galeno</MenuItem>
                          <MenuItem value="medicus">Medicus</MenuItem>
                          <MenuItem value="omint">Omint</MenuItem>
                          <MenuItem value="pami">PAMI</MenuItem>
                          <MenuItem value="ioma">IOMA</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="text"
                        label="Número de Afiliado"
                        name="numeroAfiliado"
                        value={formData.numeroAfiliado}
                        onChange={handleChange}
                        fullWidth
                        disabled={!formData.obraSocial}
                      />
                    </Grid>
                  </Grid>

                  {/* Botones de acción */}
                  <MDBox mt={4} mb={1} display="flex" justifyContent="space-between">
                    <MDButton variant="outlined" color="secondary" href="/turnos">
                      Cancelar
                    </MDButton>
                    <MDButton type="submit" variant="gradient" color="success" disabled={loading}>
                      {loading ? "Registrando..." : "Registrar Turno"}
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Appointments;
