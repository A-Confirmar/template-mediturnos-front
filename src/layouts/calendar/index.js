/**
=========================================================
* MediTurnos - Calendario de Turnos
=========================================================
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Simulación de turnos para el mes
  const appointments = {
    "2025-10-05": [
      {
        id: 1,
        time: "10:00",
        patient: "Juan Pérez",
        doctor: "Dr. López",
        status: "confirmed",
      },
      {
        id: 2,
        time: "14:30",
        patient: "María García",
        doctor: "Dra. Rodríguez",
        status: "pending",
      },
    ],
    "2025-10-06": [
      {
        id: 3,
        time: "09:00",
        patient: "Roberto Fernández",
        doctor: "Dr. Gómez",
        status: "confirmed",
      },
      {
        id: 4,
        time: "16:00",
        patient: "Laura Martínez",
        doctor: "Dr. Fernández",
        status: "completed",
      },
    ],
    "2025-10-07": [
      {
        id: 5,
        time: "11:30",
        patient: "Carlos Sánchez",
        doctor: "Dra. Martínez",
        status: "cancelled",
      },
    ],
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    // Días vacíos antes del primer día del mes
    for (let i = 0; i < startingDayOfWeek; i += 1) {
      days.push(
        <MDBox
          key={`empty-${i}`}
          sx={{
            border: "1px solid #e0e0e0",
            minHeight: "120px",
            p: 1,
            bgcolor: "#fafafa",
          }}
        />
      );
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`;
      const dayAppointments = appointments[dateKey] || [];
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push(
        <MDBox
          key={day}
          sx={{
            border: isToday ? "2px solid #2196f3" : "1px solid #e0e0e0",
            minHeight: "120px",
            p: 1,
            bgcolor: isToday ? "#e3f2fd" : "white",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <MDTypography
            variant="button"
            fontWeight={isToday ? "bold" : "regular"}
            color={isToday ? "info" : "text"}
          >
            {day}
          </MDTypography>
          <MDBox mt={1}>
            {dayAppointments.map((apt) => (
              <MDBox
                key={apt.id}
                sx={{
                  p: 0.5,
                  mb: 0.5,
                  borderRadius: "4px",
                  bgcolor: "#f0f8ff",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#d0e8ff",
                  },
                }}
              >
                <MDTypography variant="caption" fontWeight="medium" display="block">
                  {apt.time} - {apt.patient}
                </MDTypography>
                <MDBadge
                  badgeContent={getStatusText(apt.status)}
                  color={getStatusColor(apt.status)}
                  variant="contained"
                  size="xs"
                />
              </MDBox>
            ))}
          </MDBox>
        </MDBox>
      );
    }

    return days;
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox>
                  <MDTypography variant="h6" color="white">
                    Calendario de Turnos
                  </MDTypography>
                  <MDTypography variant="caption" color="white">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" gap={1}>
                  <MDButton
                    variant="outlined"
                    color="white"
                    size="small"
                    onClick={() => changeMonth(-1)}
                    iconOnly
                  >
                    <Icon>chevron_left</Icon>
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="white"
                    size="small"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Hoy
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="white"
                    size="small"
                    onClick={() => changeMonth(1)}
                    iconOnly
                  >
                    <Icon>chevron_right</Icon>
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox p={3}>
                {/* Encabezados de días de la semana */}
                <Grid container spacing={0} mb={0}>
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <Grid item xs={12 / 7} key={day}>
                      <MDBox
                        sx={{
                          bgcolor: "#f5f5f5",
                          p: 1,
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <MDTypography variant="button" fontWeight="bold">
                          {day}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  ))}
                </Grid>
                {/* Días del calendario */}
                <Grid container spacing={0}>
                  {renderCalendarDays().map((day, index) => (
                    <Grid item xs={12 / 7} key={index}>
                      {day}
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Leyenda */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" mb={2}>
                  Estados de Turnos
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <MDBadge
                        badgeContent="Confirmado"
                        color="success"
                        variant="gradient"
                        size="sm"
                      />
                      <MDTypography variant="caption">Turno confirmado</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <MDBadge
                        badgeContent="Pendiente"
                        color="warning"
                        variant="gradient"
                        size="sm"
                      />
                      <MDTypography variant="caption">Esperando confirmación</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <MDBadge
                        badgeContent="Completado"
                        color="info"
                        variant="gradient"
                        size="sm"
                      />
                      <MDTypography variant="caption">Turno finalizado</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <MDBadge
                        badgeContent="Cancelado"
                        color="error"
                        variant="gradient"
                        size="sm"
                      />
                      <MDTypography variant="caption">Turno cancelado</MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
