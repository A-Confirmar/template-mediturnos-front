/**
=========================================================
* MediTurnos - Lista de Turnos del Día
=========================================================
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React custom components
import AppointmentCard from "components/AppointmentCard";
import Grid from "@mui/material/Grid";

function AppointmentsList() {
  const todayAppointments = [
    {
      patient: "Juan Pérez",
      dni: "35.123.456",
      doctor: "Dr. Carlos López",
      specialty: "Cardiología",
      date: "05/10/2025",
      time: "10:00 hs",
      status: "confirmed",
      reason: "Control anual, dolor de pecho ocasional",
      healthInsurance: "OSDE",
      actions: true,
    },
    {
      patient: "María García",
      dni: "28.456.789",
      doctor: "Dra. Ana Rodríguez",
      specialty: "Dermatología",
      date: "05/10/2025",
      time: "14:30 hs",
      status: "pending",
      reason: "Manchas en la piel",
      healthInsurance: "Swiss Medical",
      actions: true,
    },
    {
      patient: "Laura Martínez",
      dni: "40.234.567",
      doctor: "Dr. Pedro Fernández",
      specialty: "Pediatría",
      date: "05/10/2025",
      time: "16:00 hs",
      status: "completed",
      reason: "Control del niño sano",
      healthInsurance: "Galeno",
      observations: "Paciente en buen estado de salud. Próximo control en 6 meses.",
      actions: true,
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDBox display="flex" alignItems="center" justifyContent="space-between">
          <MDTypography variant="h6" fontWeight="medium">
            Turnos de Hoy
          </MDTypography>
          <MDBox display="flex" alignItems="center" color="text">
            <Icon fontSize="small">calendar_today</Icon>
            <MDTypography variant="button" color="text" fontWeight="regular" ml={0.5}>
              {new Date().toLocaleDateString("es-AR")}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            {todayAppointments.length} turnos programados
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={2}>
          {todayAppointments.map((appointment, index) => (
            <Grid item xs={12} key={index}>
              <AppointmentCard appointment={appointment} />
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default AppointmentsList;
