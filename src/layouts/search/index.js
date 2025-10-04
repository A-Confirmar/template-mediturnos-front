/**
=========================================================
* MediTurnos - Búsqueda de Profesionales
=========================================================
*/

import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    const allProfessionals = [
        {
            id: 1,
            name: "Dr. Carlos López",
            specialty: "Cardiología",
            rating: 4.8,
            availability: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            nextAvailable: "Hoy 15:00",
            image: team1,
            address: "Av. Corrientes 1234, CABA",
        },
        {
            id: 2,
            name: "Dra. Ana Rodríguez",
            specialty: "Dermatología",
            rating: 4.9,
            availability: ["Martes", "Jueves"],
            nextAvailable: "Mañana 10:00",
            image: team2,
            address: "Av. Santa Fe 5678, CABA",
        },
        {
            id: 3,
            name: "Dr. Juan Gómez",
            specialty: "Traumatología",
            rating: 4.7,
            availability: ["Lunes", "Miércoles", "Viernes"],
            nextAvailable: "05/10 14:00",
            image: team3,
            address: "Av. Rivadavia 9012, CABA",
        },
        {
            id: 4,
            name: "Dra. María Martínez",
            specialty: "Pediatría",
            rating: 5.0,
            availability: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            nextAvailable: "Hoy 09:00",
            image: team4,
            address: "Av. Callao 3456, CABA",
        },
        {
            id: 5,
            name: "Dr. Pedro Fernández",
            specialty: "Oftalmología",
            rating: 4.6,
            availability: ["Lunes", "Miércoles", "Viernes"],
            nextAvailable: "06/10 11:00",
            image: team5,
            address: "Av. Belgrano 7890, CABA",
        },
    ];

    const filteredProfessionals = allProfessionals.filter((prof) => {
        const matchesSearch =
            prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prof.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = !selectedSpecialty || prof.specialty === selectedSpecialty;
        const matchesDay = !selectedDay || prof.availability.includes(selectedDay);

        return matchesSearch && matchesSpecialty && matchesDay;
    });

    const specialties = [...new Set(allProfessionals.map((p) => p.specialty))];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    function ProfessionalSearchCard({ professional }) {
        return (
            <Card sx={{ mb: 2 }}>
                <MDBox p={2}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={2}>
                            <MDBox display="flex" justifyContent="center">
                                <MDAvatar src={professional.image} alt={professional.name} size="xl" />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MDTypography variant="h6" fontWeight="medium">
                                {professional.name}
                            </MDTypography>
                            <MDBox display="flex" alignItems="center" gap={1} mt={0.5}>
                                <MDBadge
                                    badgeContent={professional.specialty}
                                    color="info"
                                    variant="contained"
                                    size="sm"
                                />
                                <MDBox display="flex" alignItems="center">
                                    <Icon color="warning" fontSize="small">
                                        star
                                    </Icon>
                                    <MDTypography variant="button" fontWeight="medium" ml={0.5}>
                                        {professional.rating}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                            <MDBox mt={1}>
                                <MDBox display="flex" alignItems="center" gap={0.5} mb={0.5}>
                                    <Icon fontSize="small">location_on</Icon>
                                    <MDTypography variant="caption" color="text">
                                        {professional.address}
                                    </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center" gap={0.5}>
                                    <Icon fontSize="small" color="success">
                                        schedule
                                    </Icon>
                                    <MDTypography variant="caption" color="success" fontWeight="medium">
                                        Próximo turno: {professional.nextAvailable}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MDBox display="flex" flexDirection="column" gap={1}>
                                <MDButton variant="gradient" color="info" fullWidth>
                                    <Icon sx={{ mr: 1 }}>calendar_today</Icon>
                                    Agendar Turno
                                </MDButton>
                                <MDButton variant="outlined" color="info" fullWidth>
                                    <Icon sx={{ mr: 1 }}>visibility</Icon>
                                    Ver Perfil
                                </MDButton>
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </Card>
        );
    }

    ProfessionalSearchCard.propTypes = {
        professional: PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            specialty: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
            nextAvailable: PropTypes.string.isRequired,
        }).isRequired,
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={3}>
                    {/* Barra de búsqueda */}
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="primary"
                                borderRadius="lg"
                                coloredShadow="primary"
                            >
                                <MDTypography variant="h6" color="white">
                                    Buscar Profesionales
                                </MDTypography>
                                <MDTypography variant="caption" color="white">
                                    Encuentra al especialista que necesitas
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <MDInput
                                            type="text"
                                            label="Buscar por nombre o especialidad"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <Icon fontSize="small" sx={{ mr: 1 }}>
                                                        search
                                                    </Icon>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="specialty-label">Especialidad</InputLabel>
                                            <Select
                                                labelId="specialty-label"
                                                value={selectedSpecialty}
                                                onChange={(e) => setSelectedSpecialty(e.target.value)}
                                                sx={{ height: "45px" }}
                                            >
                                                <MenuItem value="">Todas las especialidades</MenuItem>
                                                {specialties.map((spec) => (
                                                    <MenuItem key={spec} value={spec}>
                                                        {spec}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="day-label">Día de la semana</InputLabel>
                                            <Select
                                                labelId="day-label"
                                                value={selectedDay}
                                                onChange={(e) => setSelectedDay(e.target.value)}
                                                sx={{ height: "45px" }}
                                            >
                                                <MenuItem value="">Cualquier día</MenuItem>
                                                {days.map((day) => (
                                                    <MenuItem key={day} value={day}>
                                                        {day}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>

                    {/* Resultados */}
                    <Grid item xs={12}>
                        <MDBox mb={2}>
                            <MDTypography variant="h6">
                                {filteredProfessionals.length} profesionales encontrados
                            </MDTypography>
                        </MDBox>
                        {filteredProfessionals.length > 0 ? (
                            filteredProfessionals.map((professional) => (
                                <ProfessionalSearchCard key={professional.id} professional={professional} />
                            ))
                        ) : (
                            <Card>
                                <MDBox p={5} textAlign="center">
                                    <Icon fontSize="large" color="text">
                                        search_off
                                    </Icon>
                                    <MDTypography variant="h5" color="text" mt={2}>
                                        No se encontraron profesionales
                                    </MDTypography>
                                    <MDTypography variant="button" color="text">
                                        Intenta con otros filtros de búsqueda
                                    </MDTypography>
                                </MDBox>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Search;
