/**
=========================================================
* MediTurnos - Sistema de Reseñas
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Rating from "@mui/material/Rating";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// API Service
import { turnosAPI, resenasAPI } from "services/api";

function Resenas() {
  const [turnosCompletados, setTurnosCompletados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal para calificar
  const [openModal, setOpenModal] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Cargar turnos completados
  useEffect(() => {
    const loadTurnos = async () => {
      try {
        setLoading(true);
        const data = await turnosAPI.getMisTurnos();
        // Filtrar solo turnos completados
        const completados = data.filter((turno) => turno.estado === "completado");
        setTurnosCompletados(completados);
      } catch (err) {
        setError("Error al cargar turnos");
        console.error("Error:", err);
        // Datos de ejemplo
        const mockData = [
          {
            id: 1,
            fecha: "2024-01-10",
            hora: "10:00",
            profesional: "Dr. Carlos López",
            especialidad: "Cardiología",
            estado: "completado",
            motivoConsulta: "Control de rutina",
            resenaRealizada: false,
          },
          {
            id: 2,
            fecha: "2024-01-08",
            hora: "14:30",
            profesional: "Dra. Ana Rodríguez",
            especialidad: "Dermatología",
            estado: "completado",
            motivoConsulta: "Consulta dermatológica",
            resenaRealizada: true,
          },
          {
            id: 3,
            fecha: "2024-01-05",
            hora: "09:00",
            profesional: "Dr. Juan Gómez",
            especialidad: "Traumatología",
            estado: "completado",
            motivoConsulta: "Dolor de rodilla",
            resenaRealizada: false,
          },
        ];
        setTurnosCompletados(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadTurnos();
  }, []);

  // Abrir modal para calificar
  const handleOpenModal = (turno) => {
    setSelectedTurno(turno);
    setCalificacion(0);
    setComentario("");
    setOpenModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTurno(null);
    setCalificacion(0);
    setComentario("");
  };

  // Enviar reseña
  const handleSubmitResena = async () => {
    if (calificacion === 0) {
      alert("Por favor selecciona una calificación");
      return;
    }

    try {
      setSubmitting(true);
      await resenasAPI.crear({
        turnoId: selectedTurno.id,
        profesionalId: selectedTurno.profesionalId,
        calificacion: calificacion,
        comentario: comentario,
      });

      alert("¡Reseña enviada exitosamente! Está pendiente de moderación.");

      // Actualizar estado del turno
      setTurnosCompletados((prev) =>
        prev.map((turno) =>
          turno.id === selectedTurno.id ? { ...turno, resenaRealizada: true } : turno
        )
      );

      handleCloseModal();
    } catch (err) {
      console.error("Error:", err);
      alert("Error al enviar la reseña. Por favor intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

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
              >
                <MDTypography variant="h6" color="white">
                  Calificar Turnos Completados
                </MDTypography>
                <MDTypography variant="caption" color="white">
                  Ayuda a otros pacientes compartiendo tu experiencia
                </MDTypography>
              </MDBox>

              <MDBox pt={3} pb={3} px={3}>
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
                ) : turnosCompletados.length === 0 ? (
                  <MDBox display="flex" flexDirection="column" alignItems="center" p={5}>
                    <Icon fontSize="large" sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}>
                      rate_review
                    </Icon>
                    <MDTypography variant="h6" color="text" mb={1}>
                      No tienes turnos completados para calificar
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      Una vez que completes un turno, podrás dejarnos tu reseña aquí
                    </MDTypography>
                  </MDBox>
                ) : (
                  <Grid container spacing={3}>
                    {turnosCompletados.map((turno) => (
                      <Grid item xs={12} md={6} key={turno.id}>
                        <Card variant="outlined">
                          <MDBox p={3}>
                            <MDBox display="flex" justifyContent="space-between" mb={2}>
                              <MDBox>
                                <MDTypography variant="h6" fontWeight="medium">
                                  {turno.profesional}
                                </MDTypography>
                                <MDTypography variant="caption" color="text">
                                  {turno.especialidad}
                                </MDTypography>
                              </MDBox>
                              {turno.resenaRealizada && (
                                <MDBadge
                                  badgeContent="Calificado"
                                  color="success"
                                  variant="gradient"
                                  size="sm"
                                />
                              )}
                            </MDBox>

                            <MDBox mb={2}>
                              <MDBox display="flex" alignItems="center" mb={1}>
                                <Icon fontSize="small" sx={{ mr: 1 }}>
                                  calendar_today
                                </Icon>
                                <MDTypography variant="caption">
                                  {new Date(turno.fecha).toLocaleDateString("es-AR")} - {turno.hora}
                                </MDTypography>
                              </MDBox>
                              <MDBox display="flex" alignItems="center">
                                <Icon fontSize="small" sx={{ mr: 1 }}>
                                  description
                                </Icon>
                                <MDTypography variant="caption" color="text">
                                  {turno.motivoConsulta}
                                </MDTypography>
                              </MDBox>
                            </MDBox>

                            <MDButton
                              variant="gradient"
                              color={turno.resenaRealizada ? "secondary" : "info"}
                              fullWidth
                              onClick={() => handleOpenModal(turno)}
                              disabled={turno.resenaRealizada}
                            >
                              <Icon sx={{ mr: 1 }}>star</Icon>
                              {turno.resenaRealizada ? "Ya Calificado" : "Calificar Turno"}
                            </MDButton>
                          </MDBox>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Modal para calificar */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>
            <MDTypography variant="h5" fontWeight="medium">
              Calificar Turno
            </MDTypography>
          </DialogTitle>
          <DialogContent>
            <MDBox pt={2}>
              {selectedTurno && (
                <>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      {selectedTurno.profesional}
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      {selectedTurno.especialidad}
                    </MDTypography>
                  </MDBox>

                  <MDBox mb={3} textAlign="center">
                    <MDTypography variant="caption" fontWeight="medium" mb={1}>
                      ¿Cómo calificarías tu experiencia?
                    </MDTypography>
                    <MDBox display="flex" justifyContent="center" mt={2}>
                      <Rating
                        name="calificacion"
                        value={calificacion}
                        onChange={(event, newValue) => setCalificacion(newValue)}
                        size="large"
                      />
                    </MDBox>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Comentario (opcional)"
                      multiline
                      rows={4}
                      fullWidth
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      placeholder="Cuéntanos sobre tu experiencia..."
                    />
                  </MDBox>

                  <MDBox>
                    <MDTypography variant="caption" color="text" fontStyle="italic">
                      * Tu reseña estará pendiente de moderación antes de ser publicada.
                    </MDTypography>
                  </MDBox>
                </>
              )}
            </MDBox>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={handleCloseModal} variant="outlined" color="secondary">
              Cancelar
            </MDButton>
            <MDButton
              onClick={handleSubmitResena}
              variant="gradient"
              color="success"
              disabled={submitting || calificacion === 0}
            >
              {submitting ? "Enviando..." : "Enviar Reseña"}
            </MDButton>
          </DialogActions>
        </Dialog>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Resenas;
