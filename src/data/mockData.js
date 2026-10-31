export const mockUser = {
  nombre: "Nicolás Quispe",
  cuil: "20-38841029-4",
  dni: "38.841.029",
  genero: "Masculino",
  fechaNacimiento: "14/05/1995",
  nacionalidad: "Argentina",
  condicionFiscal: "Responsable Inscripto",
  ciudad: "Mendoza",
  provincia: "Mendoza",
  direccionReal: "Av. Belgrano 1240, 4° B, Ciudad de Mendoza (CP 5500)",
  email: "n.quispe@mza-comercio.com.ar",
  telefono: "+54 9 261 423-8891",
  nivelMiArgentina: "Nivel 3 - Validación Biométrica Renaper",
  domicilioFiscalElectronico: "Constituido y Activo",
  actividadPrincipal: "476100 - Venta al por menor de libros, revistas y artículos de papelería",
  fechaAltaAfip: "01/03/2018",
  estadoIdentidad: "Validada Oficialmente"
};

export const initialBusinesses = [
  {
    id: "com-1",
    razonSocial: "Librería y Papelería San Martín S.R.L.",
    nombreFantasia: "Librería San Martín",
    cuit: "30-71458923-8",
    padronMunicipal: "8492",
    habilitacion: "Expediente N° 8492-M-2024",
    direccion: "Av. San Martín 1045, Ciudad de Mendoza",
    rubro: "Comercio Minorista / Librería e Insumos",
    estado: "HABILITADO",
    estadoFiscal: "HABILITADO",
    tieneDeuda: false,
    antiguedad: "8 años",
    superficie: "120 m²",
    ultimoPagoTasas: "Al día (Octubre 2026)"
  },
  {
    id: "com-2",
    razonSocial: "Gastronomía Peatonal S.A.",
    nombreFantasia: "Restó Sarmiento",
    cuit: "30-68912345-4",
    padronMunicipal: "12480",
    habilitacion: "Expediente N° 12480-M-2023",
    direccion: "Peatonal Sarmiento 230, Ciudad de Mendoza",
    rubro: "Gastronomía / Restaurante",
    estado: "BLOQUEADO",
    estadoFiscal: "BLOQUEADO",
    tieneDeuda: true,
    motivoBloqueo: "Deuda en Tasas Municipales y ATM Mendoza",
    antiguedad: "4 años",
    superficie: "210 m²",
    detalleDeuda: [
      "Municipalidad de Mendoza: Tasa de Comercio e Higiene y Derecho de Inspección (Padrón N° 12480) - Deuda impaga: $45.200 ARS.",
      "ATM Mendoza: Impuesto a los Ingresos Brutos Régimen General - Deuda líquida exigible Períodos 06/2026 a 08/2026: $148.500 ARS."
    ]
  }
];

export const publicRecordsDatabase = [
  {
    cuit: "30-71889912-3",
    razonSocial: "Ferretería El Cóndor Andino S.H.",
    nombreFantasia: "Ferretería El Cóndor",
    padronMunicipal: "11045",
    direccion: "Av. Las Heras 450, Ciudad de Mendoza",
    rubro: "Ferretería, Materiales de Construcción y Electricidad",
    habilitacion: "Expediente N° 11045-M-2025",
    estado: "HABILITADO",
    estadoFiscal: "HABILITADO",
    tieneDeuda: false,
    arcaStatus: "CUIT Activo y Registrado en Domicilio Fiscal Electrónico",
    atmStatus: "Ingresos Brutos al Día - Constancia de Cumplimiento Fiscal Vigente",
    municipalStatus: "Habilitación Comercial N° 11045 - Libre Deuda Tasas Comerciales"
  },
  {
    cuit: "30-65432109-8",
    razonSocial: "Indumentaria & Calzado Cuyo S.A.",
    nombreFantasia: "Calzados Cuyo",
    padronMunicipal: "9932",
    direccion: "Necochea 185, Ciudad de Mendoza",
    rubro: "Textil e Indumentaria Comercial",
    habilitacion: "Expediente N° 9932-M-2024",
    estado: "HABILITADO",
    estadoFiscal: "HABILITADO",
    tieneDeuda: false,
    arcaStatus: "CUIT Activo - Responsable Inscripto",
    atmStatus: "ATM Mendoza: Situación Regularizada",
    municipalStatus: "Padrón Municipal N° 9932: Sin observaciones"
  }
];
