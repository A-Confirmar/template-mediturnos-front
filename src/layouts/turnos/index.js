/**
=========================================================
* MediTurnos - Mis Turnos
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API Service
import { turnosAPI } from "services/api";

function MisTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar turnos desde la API
  useEffect(() => {
    const loadTurnos = async () => {
      try {
        setLoading(true);
        const data = await turnosAPI.getMisTurnos();
        setTurnos(data);
      } catch (err) {
        setError("Error al cargar turnos");
        console.error("Error:", err);
        // Datos de ejemplo en caso de error
        const mockData = [
          {
            id: 1,
            fecha: "2024-01-15",
            hora: "10:00",
            profesional: "Dr. Carlos López",
            especialidad: "Cardiología",
            estado: "confirmado",
            motivoConsulta: "Control de rutina",
          },
          {
            id: 2,
            fecha: "2024-01-20",
            hora: "14:30",
            profesional: "Dra. Ana Rodríguez",
            especialidad: "Dermatología",
            estado: "pendiente",
            motivoConsulta: "Consulta dermatológica",
          },
          {
            id: 3,
            fecha: "2024-01-10",
            hora: "09:00",
            profesional: "Dr. Juan Gómez",
            especialidad: "Traumatología",
            estado: "completado",
            motivoConsulta: "Dolor de rodilla",
          },
          {
            id: 4,
            fecha: "2024-01-08",
            hora: "16:00",
            profesional: "Dra. María Martínez",
            especialidad: "Pediatría",
            estado: "cancelado",
            motivoConsulta: "Control pediátrico",
          },
        ];
        setTurnos(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadTurnos();
  }, []);

  // Función para cancelar turno
  const handleCancelarTurno = async (turnoId) => {
    if (window.confirm("¿Estás seguro que deseas cancelar este turno?")) {
      try {
        await turnosAPI.cancelar(turnoId);
        // Recargar turnos
        const data = await turnosAPI.getMisTurnos();
        setTurnos(data);
        alert("Turno cancelado exitosamente");
      } catch (err) {
        console.error("Error:", err);
        alert("Error al cancelar el turno");
      }
    }
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "warning";
      case "confirmado":
        return "info";
      case "completado":
        return "success";
      case "cancelado":
        return "error";
      default:
        return "default";
    }
  };

  // Preparar datos para la tabla
  const columns = [
    { Header: "Fecha", accessor: "fecha", width: "10%" },
    { Header: "Hora", accessor: "hora", width: "10%" },
    { Header: "Profesional", accessor: "profesional", width: "20%" },
    { Header: "Especialidad", accessor: "especialidad", width: "15%" },
    { Header: "Motivo", accessor: "motivo", width: "20%" },
    { Header: "Estado", accessor: "estado", width: "15%" },
    { Header: "Acciones", accessor: "acciones", width: "10%" },
  ];

  const rows = turnos.map((turno) => ({
    fecha: (
      <MDTypography variant="caption" fontWeight="medium">
        {new Date(turno.fecha).toLocaleDateString("es-AR")}
      </MDTypography>
    ),
    hora: (
      <MDTypography variant="caption" fontWeight="medium">
        {turno.hora}
      </MDTypography>
    ),
    profesional: (
      <MDTypography variant="caption" fontWeight="medium">
        {turno.profesional}
      </MDTypography>
    ),
    especialidad: (
      <MDTypography variant="caption" color="text">
        {turno.especialidad}
      </MDTypography>
    ),
    motivo: (
      <MDTypography variant="caption" color="text">
        {turno.motivoConsulta}
      </MDTypography>
    ),
    estado: (
      <Chip
        label={turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1)}
        color={getEstadoColor(turno.estado)}
        size="small"
      />
    ),
    acciones: (
      <MDBox display="flex" gap={1}>
        {turno.estado === "pendiente" && (
          <MDButton
            variant="text"
            color="error"
            size="small"
            onClick={() => handleCancelarTurno(turno.id)}
          >
            <Icon fontSize="small">cancel</Icon>
          </MDButton>
        )}
      </MDBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox>
                  <MDTypography variant="h6" color="white">
                    Mis Turnos
                  </MDTypography>
                  <MDTypography variant="caption" color="white">
                    Historial y próximos turnos médicos
                  </MDTypography>
                </MDBox>
                <MDButton variant="outlined" color="white" href="/appointments">
                  <Icon sx={{ mr: 1 }}>add</Icon>
                  Solicitar Turno
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                {loading ? (
                  <MDBox display="flex" justifyContent="center" p={3}>
                    <MDTypography variant="h6" color="text">
                      Cargando turnos...
                    </MDTypography>
                  </MDBox>
                ) : error ? (
                  <MDBox p={3}>
                    <MDTypography variant="caption" color="error">
                      {error}
                    </MDTypography>
                  </MDBox>
                ) : turnos.length === 0 ? (
                  <MDBox display="flex" flexDirection="column" alignItems="center" p={5}>
                    <Icon fontSize="large" sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}>
                      event_busy
                    </Icon>
                    <MDTypography variant="h6" color="text" mb={1}>
                      No tienes turnos registrados
                    </MDTypography>
                    <MDTypography variant="caption" color="text" mb={3}>
                      Solicita tu primer turno con nuestros profesionales
                    </MDTypography>
                    <MDButton variant="gradient" color="info" href="/appointments">
                      <Icon sx={{ mr: 1 }}>add</Icon>
                      Solicitar Turno
                    </MDButton>
                  </MDBox>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MisTurnos;
