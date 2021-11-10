import { createTheme } from "@material-ui/core/styles";
export const INITIAL_ASYNC_STATE = {
  payload: null,
  error: null,
  loading: false,
  message: "",
};

export const DEFAULT_JOB = {
  dependiente: true,
  razonSocial: "",
  ruc: "",
  direccion: "",
  estatal: false,
  codigoCargoLaboral: "",
  codigoSector: "",
  descripcionCargoLaboral: "",
  descripcionProfesion: "",
};

export const SEGMENTS = [
  {
    key: "Y",
    mensajes: [
      "Me gusta vivir nuevas experiencias y compartirlo con mis amigos",
      "No hay límites para todo lo que puedo soñar",
      "Me encanta viajar y vivir nuevas experiencias",
    ],
  },
  {
    key: "BB",
    mensajes: [
      "Quiero disfrutar mi futuro sin preocupaciones",
      "Me gusta disfrutar todos los momentos con mi familia sin preocupaciones",
      "Vivamos el momento porque mi futuro es hoy",
    ],
  },
  {
    key: "X",
    mensajes: [
      "Mi prioridad es mi familia y siempre quiero darle lo mejor",
      "Enseñarle a mis hijos lo valioso que es estar en familia",
      "Los mejores recuerdos son en familia",
    ],
  },
];

export const DESKTOP_RES = 1200;
export const TABLET_RES = 992;
export const MOBILE_RES = 768;

export const MESSAGE_TIMING = 3500;
export const CAROUSEL_TIMING = 7000;
export const GROUP_TIMING = 60000;
export const WIZARD_CAROUSEL_TIMING = 600000;
export const WIZARD_MESSAGE_TIMING = 60000;

// export const REQUIRED = "*Este campo es obligatorio.";
export const REQUIRED = "Estos campos son obligatorios.";
export const U_MINLENGTH = (minLength) =>
  `Debes subir al menos ${minLength} documentos.`;

export const DOCUMENT = "DNI";
export const D_MINLENGTH = 8;
export const DOCUMENT_INVALID = `El número de ${DOCUMENT} no es válido.`;
export const DOCUMENT_MINLENGTH = `El número de ${DOCUMENT} debe tener ${D_MINLENGTH} dígitos.`;

export const TRACKING = "código de solicitud";
export const T_MINLENGTH = 10;
export const TRACKING_INVALID = `El ${TRACKING} no es válido.`;
export const TRACKING_MINLENGTH = `El ${TRACKING} debe tener ${T_MINLENGTH} dígitos.`;

export const PHONE = "teléfono";
export const P_MINLENGTH = 9;
export const PHONE_INVALID = `El número de ${PHONE} no es válido.`;
export const PHONE_START_INVALID = `El número de ${PHONE} debe iniciar con el dígito 9.`;
export const PHONE_MINLENGTH = `El número de ${PHONE} debe tener ${P_MINLENGTH} dígitos.`;

export const EMAIL = "correo electrónico";
export const E_MINLENGTH = 3;
export const EMAIL_INVALID = `El ${EMAIL} no es válido.`;
export const EMAIL_MINLENGTH = `El ${EMAIL} debe tener mínimo ${E_MINLENGTH} dígitos.`;

export const MATCH = "Las contraseñas no coinciden.";
export const PASSN_MINLENGTH = 8;
export const PASS_INVALID = `La contraseña no es válida, debe tener mínimo 8 caracteres, un número y una mayúscula`;

export const ADDRESS = "dirección";
export const A_MINLENGTH = 3;
export const ADDRESS_INVALID = `La ${ADDRESS} no es válida.`;
export const ADDRESS_MINLENGTH = `La ${ADDRESS} debe tener mínimo ${A_MINLENGTH} dígitos.`;

export const CUSPP = "CUSPP";
export const C_MINLENGTH = 12;
export const CUSPP_INVALID = `El ${CUSPP} no es válido.`;
export const CUSPP_MINLENGTH = `El ${CUSPP} debe tener ${C_MINLENGTH} dígitos.`;

export const COMERCIAL_NAME = "Separalo";
export const BUSINESS_NAME = "Separalo.pe";

export const OBJApi = {
  apellidoMaterno: "",
  apellidoPaterno: "",
  codigoAfpOrigen: "",
  codigoAsesor: "",
  codigoDepartamento: "",
  codigoDistrito: "",
  codigoFondo: "",
  codigoPais: "",
  codigoProvincia: "",
  correoElectronico: "",
  cuspp: "",
  // datosLaborales: {
  //   codigoCargo: "",
  //   codigoRangoSalarial: "",
  //   codigoSector: "",
  //   descripcionCargo: "",
  //   direccion: "",
  //   indicadorDependiente: "",
  //   indicadorEstatal: "",
  //   profesion: "",
  //   razonSocial: "",
  //   rucEmpleador: "",
  // },
  datosLaborales: [],
  direccion: "",
  fechaIngresoSPP: "",
  indicadorAsesor: "",
  numeroCelular: "",
  pathDatosLaborales: "",
  pathDni: "",
  prefijodireccion: "",
  primerNombre: "",
  segundoNombre: "",
  sexo: "",
  codigoEstadoCivil: "",
  fechaNacimiento: "",
};

export const COMPONENT_ERROR = (componentName) =>
  `Ha ocurrido un error en el componente ${componentName}.`;
export const UNHANDLED_ERROR = (methodName) =>
  `Ha ocurrido un error inesperado en el método ${methodName}.`;

export const TRASPASOS_URL =
  "https://www.profuturo.com.pe/Personas/Tu-Aportes/Cambiate-a-Profuturo/cambiate-a-profuturo";

// yarn build && serve -s build

export const terms = {
  codigo: "PFP0001",
  asunto: "Términos y condiciones",
  html: '<p><strong>Derechos de Autor</strong></p><p><br></p><p>Los derechos de propiedad intelectual de estas páginas y de las pantallas que muestran estas páginas, su contenido y diseño visual, pertenecen a Profuturo salvo que se indique lo contrario. En consecuencia está prohibido utilizar, modificar, copiar, distribuir, transmitir o comercializar los derechos involucrados sin el correspondiente permiso expreso.</p><p><br></p><p><strong>Marcas, Patentes y Logotipos</strong></p><p><br></p><p>Las Marcas, Patentes y Logotipos que aparecen en este sitio son de propiedad de Profuturo a menos que se diga lo contrario. En consecuencia está prohibido el uso de cualquier marca, patente o logotipo sin el correspondiente permiso expreso. Uso de información y materiales: Profuturo presenta en su página WEB información relacionada con el tipo de actividad que realiza y los productos y servicios que proporciona debiendo ser considerada dicha información a modo de introducción, por lo que las consultas personales deben ser canalizadas a través de nuestras áreas de atención.</p><p>La información y materiales que figuran en la presente página WEB incluyendo textos, gráficos, conexiones u otros y, los términos, condiciones y descripciones que aparecen están sujetos a cambio. Profuturo se reserva el derecho de actualizar, modificar o eliminar la información contenida en su página WEB pudiendo inclusive limitar o no permitir el acceso a dicha información. Asimismo, Profuturo procura tener información exacta y actualizada, no obstante pueden ocurrir errores u omisiones por lo que Profuturo no otorga ninguna garantía sobre la exactitud o integridad de la información y los materiales de la presente página WEB y expresamente renuncia a toda responsabilidad por errores u omisiones en estos. En ningún caso Profuturo será responsable de algún daño o perjuicio incluyendo, sin límites, daños, pérdidas o gastos directos, indirectos, incidentales, consecuentes o especiales como consecuencia del uso de esta página o de las páginas referenciados o la imposibilidad de uso por alguna de las partes o en relación con cualquier falla en el rendimiento, error, omisión, interrupción, defecto, demora en la operación o transmisión, virus de la computadora o falla del sistema o línea, aun en el caso que Profuturo o sus representantes fueran informados sobre la posibilidad de dichos daños, pérdidas o gastos. Las conexiones con otros medios de la Internet son a riesgo del visitante: Profuturo no investiga, verifica, controla, ni respalda el contenido, la exactitud, las opiniones expresadas y demás suministradas por estos medios. Los visitantes son responsables de evaluar la exactitud, integridad o utilidad de cualquier información disponible o accesible desde este sitio. Los productos y servicios de inversión no son obligación ni se encuentran garantizados por Profuturo y están sujetos a los riesgos de inversiones.</p><p><br></p><p><strong>Tratamiento de Datos Personales</strong></p><p><br></p><p>PROFUTURO es una Administradora Privada de Fondos de Pensiones que forma parte del grupo económico internacional de The Bank of Nova Scotia (en adelante el "grupo Scotiabank"). El grupo Scotiabank ejerce el control sobre un conjunto de empresas del sistema financiero, seguros y de AFP, así como sobre empresas vinculadas al mercado de valores, entre otras, tanto en el Perú como en el extranjero, las cuales, por razones de sinergias, mayor eficiencia y calidad de servicios, comparten procesos de negocio, estructuras gerenciales y sistemas tecnológicos de alcance transfronterizo, dentro de los alcances permitidos por la ley. La información sobre la identificación de EL AFILIADO Y/O CLIENTE, o datos que permitan hacerlo identificable (p.e. datos biométricos), así como sobre la información personal, incluyendo información calificada como datos sensibles (ocupación, estudios, domicilio, correo electrónico, teléfono, estado de salud, actividades que realiza, ingresos económicos patrimonio, gastos, o cualquier dato sobre rasgos físicos y/o de conducta, entre otros) por la ley, proporcionada, de forma oral, escrita o electrónica, por EL AFILIADO Y/O CLIENTE u obtenida a través de otras personas, sociedades y/o instituciones (públicas o privadas, nacionales o extranjeras) es considerada como Datos Personales. EL AFILIADO Y/O CLIENTE , de forma libre, informada, previa y expresa, consiente que PROFUTURO pueda dar tratamiento a los Datos Personales, es decir podrá acceder, recopilar, registrar, organizar, almacenar, conservar, elaborar, modificar, bloquear, suprimir, extraer, consultar, utilizar, transferir o procesar de cualquier otra forma prevista por la ley. EL AFILIADO Y/O CLIENTE consiente que PROFUTURO podrá dar tratamiento a los Datos Personales, de manera directa o por intermedio de terceros, lo cual incluye el tratamiento necesario para: (i) el cumplimiento de las obligaciones legales aplicables a PROFUTURO, (ii) enviar a EL AFILIADO Y/O CLIENTE publicidad e información en general por cualquier medio, sobre PROFUTURO, lo que se podrá realizar a través de terceras personas; y (iii) usar, compartir o transferir los Datos Personales a otras empresas que conforman el Grupo Scotiabank o lo conformen en el futuro, así como a sus socios comerciales, o terceros (por ejemplo: bancos, imprentas, empresas de mensajería, auditoría, entre otros), tanto dentro como fuera del país, nacionales o extranjeros, públicos o privados, con la finalidad de realizar las acciones indicadas en los puntos precedentes o con la finalidad que éstos puedan directamente ofrecer o informar a EL AFILIADO Y/O CLIENTE, por cualquier medio, acerca de cualquier producto o servicio que comercialicen o puedan poner en su conocimiento publicidad comercial o institucional. EL AFILIADO Y/O CLIENTE conviene en que PROFUTURO podrá conservar en sus registros los Datos Personales y darle tratamiento a éstos en los términos antes expuestos de forma indefinida, aun cuando EL AFILIADO Y/O CLIENTE pierda su condición como tal. Los Datos Personales serán almacenados en el banco de datos de clientes del cual PROFUTURO es titular o cualquier otro que en el futuro pudieran establecer. PROFUTURO declara que ha adoptado las medidas necesarias para mantener segura la información en cumplimiento de la Ley Nº 29733 de Protección de Datos Personales. EL AFILIADO Y/O CLIENTE declara que se le ha informado que tiene derecho a no proporcionar los Datos Personales. De no proporcionarlos, no se podrá dar tratamiento a los mismos tal como se señala de forma precedente. Asimismo, EL AFILIADO Y/O CLIENTE puede revocar el consentimiento para tratar sus Datos Personales en cualquier momento. Para ejercer este derecho o cualquier otro que la ley establezca relacionado a Datos Personales deberá presentar una solicitud escrita en nuestras oficinas. Se podrán establecer otros canales para tramitar estas solicitudes, lo que será informado oportunamente por PROFUTURO a través de la página web.</p><p><br></p><p><strong>Confidencialidad de la Información</strong></p><p><br></p><p>Profuturo considera importante mantener la privacidad de la información de sus clientes por lo que realiza sus mejores esfuerzos para mantener dicha confidencialidad.</p><p>Con este propósito Profuturo se compromete a proteger de acuerdo a los mejores estándares de seguridad la información que nuestros clientes nos brindan. En ese sentido la información del cliente se utilizará de manera limitada con el fin de entregarles el mejor servicio, asesorándolos sobre nuestros productos y servicios y demás oportunidades de negocio. Únicamente tendrán acceso a la información de nuestros clientes las personas autorizadas por Profuturo, sean dependientes o no, las que estarán debidamente capacitadas en el uso de dicha información. Las personas que no cumplan con nuestras políticas de confidencialidad podrán ser pasibles de sanción conforme lo señala la ley.</p>',
  titulo: "Términos y condiciones",
};

export const pickerTheme = createTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#5E4696",
      },
    },
    MuiPickersDay: {
      isSelected: {
        backgroundColor: "#5E4696",
        "&:hover": {
          backgroundColor: "#5E4696",
        },
      },
      current: {
        color: "#5E4696",
      },
    },
    MuiPickersYear: {
      root: {
        "&:focus": {
          color: "#5E4696",
        },
      },
      "&$selected": {
        color: "#5E4696",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "gray",
        "&:last-child": {
          display: "none", // esto oculta el boton OK del picker
        },
      },
    },
  },
});

// constructor(props) {
//   super(props);
//   this.resize = this.resize.bind(this);
// }

// componentDidMount() {
//   window.addEventListener('resize', this.resize);
//   this.resize();
// }

// resize() {
//   // this.setState({hideNav: window.innerWidth <= 760});
//   console.log('>>>>>>>>>>>>>>>', window.innerWidth <= RESIZE_GAP);
// }

// componentWillUnmount() {
//   window.removeEventListener('resize', this.resize);
// }
