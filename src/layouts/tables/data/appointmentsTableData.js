/**
=========================================================
* MediTurnos - Datos de Turnos
=========================================================
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

export default function data() {
  return {
    columns: [
      { Header: "paciente", accessor: "paciente", width: "20%", align: "left" },
      { Header: "profesional", accessor: "profesional", align: "left" },
      { Header: "especialidad", accessor: "especialidad", align: "center" },
      { Header: "fecha/hora", accessor: "fechaHora", align: "center" },
      { Header: "estado", accessor: "estado", align: "center" },
      { Header: "acciones", accessor: "acciones", align: "center" },
    ],

    rows: [
      {
        paciente: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Juan Pérez
              </MDTypography>
              <MDTypography variant="caption">DNI: 35.123.456</MDTypography>
            </MDBox>
          </MDBox>
        ),
        profesional: (
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="caption" fontWeight="medium">
              Dr. Carlos López
            </MDTypography>
            <MDTypography variant="caption">Cardiología</MDTypography>
          </MDBox>
        ),
        especialidad: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Cardiología
          </MDTypography>
        ),
        fechaHora: (
          <MDBox lineHeight={1}>
            <MDTypography variant="caption" fontWeight="medium">
              05/10/2025
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {" "}
              - 10:00 hs
            </MDTypography>
          </MDBox>
        ),
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="confirmado" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        acciones: (
          <MDBox display="flex" gap={1}>
            <MDButton variant="text" color="info" size="small">
              Ver
            </MDButton>
            <MDButton variant="text" color="error" size="small">
              Cancelar
            </MDButton>
          </MDBox>
        ),
      },
      {
        paciente: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                María García
              </MDTypography>
              <MDTypography variant="caption">DNI: 28.456.789</MDTypography>
            </MDBox>
          </MDBox>
        ),
        profesional: (
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="caption" fontWeight="medium">
              Dra. Ana Rodríguez
            </MDTypography>
            <MDTypography variant="caption">Dermatología</MDTypography>
          </MDBox>
        ),
        especialidad: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Dermatología
          </MDTypography>
        ),
        fechaHora: (
          <MDBox lineHeight={1}>
            <MDTypography variant="caption" fontWeight="medium">
              05/10/2025
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {" "}
              - 14:30 hs
            </MDTypography>
          </MDBox>
        ),
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pendiente" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        acciones: (
          <MDBox display="flex" gap={1}>
            <MDButton variant="text" color="success" size="small">
              Confirmar
            </MDButton>
            <MDButton variant="text" color="error" size="small">
              Cancelar
            </MDButton>
          </MDBox>
        ),
      },
      {
        paciente: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Roberto Fernández
              </MDTypography>
              <MDTypography variant="caption">DNI: 32.789.012</MDTypography>
            </MDBox>
          </MDBox>
        ),
        profesional: (
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="caption" fontWeight="medium">
              Dr. Juan Gómez
            </MDTypography>
            <MDTypography variant="caption">Traumatología</MDTypography>
          </MDBox>
        ),
        especialidad: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Traumatología
          </MDTypography>
        ),
        fechaHora: (
          <MDBox lineHeight={1}>
            <MDTypography variant="caption" fontWeight="medium">
              06/10/2025
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {" "}
              - 09:00 hs
            </MDTypography>
          </MDBox>
        ),
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="confirmado" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        acciones: (
          <MDBox display="flex" gap={1}>
            <MDButton variant="text" color="info" size="small">
              Ver
            </MDButton>
            <MDButton variant="text" color="error" size="small">
              Cancelar
            </MDButton>
          </MDBox>
        ),
      },
      {
        paciente: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Laura Martínez
              </MDTypography>
              <MDTypography variant="caption">DNI: 40.234.567</MDTypography>
            </MDBox>
          </MDBox>
        ),
        profesional: (
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="caption" fontWeight="medium">
              Dr. Pedro Fernández
            </MDTypography>
            <MDTypography variant="caption">Pediatría</MDTypography>
          </MDBox>
        ),
        especialidad: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Pediatría
          </MDTypography>
        ),
        fechaHora: (
          <MDBox lineHeight={1}>
            <MDTypography variant="caption" fontWeight="medium">
              06/10/2025
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {" "}
              - 16:00 hs
            </MDTypography>
          </MDBox>
        ),
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="completado" color="info" variant="gradient" size="sm" />
          </MDBox>
        ),
        acciones: (
          <MDBox display="flex" gap={1}>
            <MDButton variant="text" color="info" size="small">
              Ver
            </MDButton>
            <MDButton variant="text" color="secondary" size="small">
              Historial
            </MDButton>
          </MDBox>
        ),
      },
      {
        paciente: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Carlos Sánchez
              </MDTypography>
              <MDTypography variant="caption">DNI: 25.678.901</MDTypography>
            </MDBox>
          </MDBox>
        ),
        profesional: (
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="caption" fontWeight="medium">
              Dra. María Martínez
            </MDTypography>
            <MDTypography variant="caption">Oftalmología</MDTypography>
          </MDBox>
        ),
        especialidad: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Oftalmología
          </MDTypography>
        ),
        fechaHora: (
          <MDBox lineHeight={1}>
            <MDTypography variant="caption" fontWeight="medium">
              07/10/2025
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {" "}
              - 11:30 hs
            </MDTypography>
          </MDBox>
        ),
        estado: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="cancelado" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        acciones: (
          <MDBox display="flex" gap={1}>
            <MDButton variant="text" color="info" size="small">
              Ver
            </MDButton>
            <MDButton variant="text" color="success" size="small">
              Reprogramar
            </MDButton>
          </MDBox>
        ),
      },
    ],
  };
}
