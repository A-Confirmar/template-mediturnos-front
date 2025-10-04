/**
=========================================================
* MediTurnos - Tarjeta de Turno
=========================================================
*/

import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

function AppointmentCard({ appointment }) {
  const {
    patient,
    doctor,
    specialty,
    date,
    time,
    status,
    reason,
    healthInsurance,
    observations,
    actions,
  } = appointment;

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "check_circle";
      case "pending":
        return "pending";
      case "completed":
        return "task_alt";
      case "cancelled":
        return "cancel";
      default:
        return "info";
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={2}>
        {/* Header con estado */}
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <MDBox>
            <MDTypography variant="h6" fontWeight="medium">
              {patient}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              DNI: {appointment.dni || "N/A"}
            </MDTypography>
          </MDBox>
          <MDBadge
            badgeContent={getStatusText(status)}
            color={getStatusColor(status)}
            variant="gradient"
            size="sm"
          />
        </MDBox>

        <Divider />

        {/* Información del profesional */}
        <MDBox mt={2} mb={2}>
          <MDBox display="flex" alignItems="center" mb={1}>
            <Icon fontSize="small" sx={{ mr: 1 }} color="info">
              medical_services
            </Icon>
            <MDTypography variant="button" fontWeight="medium">
              {doctor}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={1}>
            <Icon fontSize="small" sx={{ mr: 1 }}>
              category
            </Icon>
            <MDTypography variant="button" color="text">
              {specialty}
            </MDTypography>
          </MDBox>
        </MDBox>

        <Divider />

        {/* Fecha y hora */}
        <MDBox mt={2} mb={2}>
          <MDBox display="flex" alignItems="center" mb={1}>
            <Icon fontSize="small" sx={{ mr: 1 }} color="primary">
              calendar_today
            </Icon>
            <MDTypography variant="button" fontWeight="medium">
              {date}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" alignItems="center" mb={1}>
            <Icon fontSize="small" sx={{ mr: 1 }} color="primary">
              schedule
            </Icon>
            <MDTypography variant="button" fontWeight="medium">
              {time}
            </MDTypography>
          </MDBox>
        </MDBox>

        {reason && (
          <>
            <Divider />
            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Motivo de consulta
              </MDTypography>
              <MDTypography variant="button" color="text" display="block" mt={0.5}>
                {reason}
              </MDTypography>
            </MDBox>
          </>
        )}

        {healthInsurance && (
          <>
            <Divider />
            <MDBox mt={2} mb={2}>
              <MDBox display="flex" alignItems="center">
                <Icon fontSize="small" sx={{ mr: 1 }} color="success">
                  verified
                </Icon>
                <MDTypography variant="button" color="text">
                  Obra Social: <strong>{healthInsurance}</strong>
                </MDTypography>
              </MDBox>
            </MDBox>
          </>
        )}

        {observations && (
          <>
            <Divider />
            <MDBox mt={2} mb={2}>
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Observaciones
              </MDTypography>
              <MDTypography variant="button" color="text" display="block" mt={0.5}>
                {observations}
              </MDTypography>
            </MDBox>
          </>
        )}

        {/* Acciones */}
        {actions && (
          <>
            <Divider />
            <MDBox mt={2} display="flex" gap={1}>
              {status === "pending" && (
                <>
                  <MDButton variant="gradient" color="success" size="small" fullWidth>
                    <Icon sx={{ mr: 0.5 }} fontSize="small">
                      check
                    </Icon>
                    Confirmar
                  </MDButton>
                  <MDButton variant="outlined" color="error" size="small" fullWidth>
                    <Icon sx={{ mr: 0.5 }} fontSize="small">
                      close
                    </Icon>
                    Cancelar
                  </MDButton>
                </>
              )}
              {status === "confirmed" && (
                <>
                  <MDButton variant="gradient" color="info" size="small" fullWidth>
                    <Icon sx={{ mr: 0.5 }} fontSize="small">
                      edit
                    </Icon>
                    Editar
                  </MDButton>
                  <MDButton variant="outlined" color="error" size="small" fullWidth>
                    <Icon sx={{ mr: 0.5 }} fontSize="small">
                      cancel
                    </Icon>
                    Cancelar
                  </MDButton>
                </>
              )}
              {status === "completed" && (
                <MDButton variant="gradient" color="info" size="small" fullWidth>
                  <Icon sx={{ mr: 0.5 }} fontSize="small">
                    visibility
                  </Icon>
                  Ver Historia Clínica
                </MDButton>
              )}
              {status === "cancelled" && (
                <MDButton variant="gradient" color="primary" size="small" fullWidth>
                  <Icon sx={{ mr: 0.5 }} fontSize="small">
                    refresh
                  </Icon>
                  Reprogramar
                </MDButton>
              )}
            </MDBox>
          </>
        )}
      </MDBox>
    </Card>
  );
}

// Typechecking props
AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    patient: PropTypes.string.isRequired,
    dni: PropTypes.string,
    doctor: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["confirmed", "pending", "completed", "cancelled"]).isRequired,
    reason: PropTypes.string,
    healthInsurance: PropTypes.string,
    observations: PropTypes.string,
    actions: PropTypes.bool,
  }).isRequired,
};

export default AppointmentCard;
