/**
=========================================================
* MediTurnos - Profesionales
=========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Professionals() {
  const professionals = [
    {
      id: 1,
      name: "Dr. Carlos López",
      specialty: "Cardiología",
      matricula: "MN 12345",
      phone: "+54 11 1234-5678",
      email: "carlos.lopez@mediturnos.com",
      experience: "15 años",
      rating: 4.8,
      availability: "Lunes a Viernes 9:00-17:00",
      image: team1,
      specialties: ["Cardiología General", "Ecocardiograma", "Holter"],
    },
    {
      id: 2,
      name: "Dra. Ana Rodríguez",
      specialty: "Dermatología",
      matricula: "MN 23456",
      phone: "+54 11 2345-6789",
      email: "ana.rodriguez@mediturnos.com",
      experience: "10 años",
      rating: 4.9,
      availability: "Martes y Jueves 14:00-20:00",
      image: team2,
      specialties: ["Dermatología Clínica", "Cirugía Dermatológica", "Estética"],
    },
    {
      id: 3,
      name: "Dr. Juan Gómez",
      specialty: "Traumatología",
      matricula: "MN 34567",
      phone: "+54 11 3456-7890",
      email: "juan.gomez@mediturnos.com",
      experience: "20 años",
      rating: 4.7,
      availability: "Lunes, Miércoles y Viernes 10:00-16:00",
      image: team3,
      specialties: ["Traumatología General", "Artroscopia", "Cirugía de Mano"],
    },
    {
      id: 4,
      name: "Dra. María Martínez",
      specialty: "Pediatría",
      matricula: "MN 45678",
      phone: "+54 11 4567-8901",
      email: "maria.martinez@mediturnos.com",
      experience: "12 años",
      rating: 5.0,
      availability: "Lunes a Viernes 8:00-14:00",
      image: team4,
      specialties: ["Pediatría General", "Neonatología", "Control del Niño Sano"],
    },
  ];

  function ProfessionalCard({ professional }) {
    return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={3}>
        <MDBox display="flex" alignItems="center" mb={3}>
          <MDAvatar src={professional.image} alt={professional.name} size="xl" />
          <MDBox ml={2} flexGrow={1}>
            <MDTypography variant="h5" fontWeight="medium">
              {professional.name}
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {professional.specialty}
            </MDTypography>
            <MDBox display="flex" alignItems="center" mt={0.5}>
              <Icon color="warning" fontSize="small">
                star
              </Icon>
              <MDTypography variant="button" fontWeight="medium" ml={0.5}>
                {professional.rating}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBadge badgeContent="Activo" color="success" variant="gradient" size="sm" />
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Información Profesional
          </MDTypography>
          <MDBox mt={1}>
            <MDBox display="flex" alignItems="center" mb={1}>
              <Icon fontSize="small" sx={{ mr: 1 }}>
                badge
              </Icon>
              <MDTypography variant="button" fontWeight="regular">
                Matrícula: {professional.matricula}
              </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" mb={1}>
              <Icon fontSize="small" sx={{ mr: 1 }}>
                work_history
              </Icon>
              <MDTypography variant="button" fontWeight="regular">
                Experiencia: {professional.experience}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Especialidades
          </MDTypography>
          <MDBox mt={1} display="flex" flexWrap="wrap" gap={0.5}>
            {professional.specialties.map((spec, index) => (
              <MDBadge key={index} badgeContent={spec} color="info" variant="contained" size="sm" />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Contacto
          </MDTypography>
          <MDBox mt={1}>
            <MDBox display="flex" alignItems="center" mb={1}>
              <Icon fontSize="small" sx={{ mr: 1 }}>
                phone
              </Icon>
              <MDTypography variant="button" fontWeight="regular">
                {professional.phone}
              </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" mb={1}>
              <Icon fontSize="small" sx={{ mr: 1 }}>
                email
              </Icon>
              <MDTypography variant="button" fontWeight="regular">
                {professional.email}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Disponibilidad
          </MDTypography>
          <MDBox mt={1} display="flex" alignItems="center">
            <Icon fontSize="small" sx={{ mr: 1 }} color="success">
              schedule
            </Icon>
            <MDTypography variant="button" fontWeight="regular">
              {professional.availability}
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox display="flex" gap={1} mt={3}>
          <MDButton variant="gradient" color="info" fullWidth>
            <Icon sx={{ mr: 1 }}>calendar_today</Icon>
            Agendar Turno
          </MDButton>
          <MDButton variant="outlined" color="info" fullWidth>
            <Icon sx={{ mr: 1 }}>visibility</Icon>
            Ver Perfil
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
    );
  }

  ProfessionalCard.propTypes = {
    professional: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      matricula: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      availability: PropTypes.string.isRequired,
    }).isRequired,
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox>
                  <MDTypography variant="h6" color="white">
                    Profesionales Médicos
                  </MDTypography>
                  <MDTypography variant="caption" color="white">
                    Equipo de especialistas disponibles
                  </MDTypography>
                </MDBox>
                <MDButton variant="outlined" color="white">
                  <Icon sx={{ mr: 1 }}>add</Icon>
                  Nuevo Profesional
                </MDButton>
              </MDBox>
            </Card>
          </Grid>

          {professionals.map((professional) => (
            <Grid item xs={12} md={6} lg={6} key={professional.id}>
              <ProfessionalCard professional={professional} />
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Professionals;
