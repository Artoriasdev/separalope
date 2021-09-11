import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/styles";
import { ExpandMore, QuestionAnswer } from "@material-ui/icons";
import React, { Component } from "react";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "0px 2px 2px 0px rgb(0 0 0 / 20%)",
    marginBottom: "0.8rem",
    position: "relative",
    transition: "margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",

    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "16px 0 12px 0",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    padding: "0px 16px",
    minHeight: 48,
    transition:
      "min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&$expanded": {
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    margin: "8px 16px 0px 16px",
  },
}))(MuiAccordionDetails);

class Question extends Component {
  createData(id, tittle, content) {
    return { id, tittle, content };
  }

  rows = [
    this.createData(
      "1",
      "¿Qué es sepáralo.pe?",
      "Somos una plataforma que tiene como objetivo tu bienestar y crecimiento personal, poniendo a tu disposición distintos especialistas que te brindarán sus servicios de manera virtual."
    ),
    this.createData(
      "2",
      "¿Cuál es la misión de  sepáralo.pe?",
      "Impulsar el desarrollo social y de emprendedores peruanos, promoviendo un medio seguro que permita cuidarnos unos a otros."
    ),
    this.createData(
      "3",
      "¿Quiénes son los prestadores de servicios?",
      "Son profesionales, técnicos o especialistas  que ponen sus servicios a disposición de los usuarios que se encuentren interesados."
    ),
    this.createData(
      "4",
      "¿Cómo puedo registrarme?",
      "Puedes registrarte en nuestra plataforma como usuario o prestador de servicios, para lo cual deberás completar el formulario que se encuentra detallado en nuestros términos y condiciones."
    ),
    this.createData(
      "5",
      "¿Qué pasa si no puedo asistir  en el horario reservado?",
      "Si has realizado la reserva y aun no has pagado, no te preocupes la cita se cancelará sola."
    ),
    this.createData(
      "6",
      "¿Qué pasa si el prestador de servicio no se presentó en el horario reservado y ya pagué el servicio?",
      "La tolerancia será de 10 minutos de iniciada la sesión. Si este no se conectó a la sesión pactada, entonces deberás tomarle un print de pantalla a la sesión donde se vea la fecha y hora, y enviarlo a soporte@sepáralo.pe. Luego de revisar la información enviada, te estaremos devolviendo el costo para que puedas reservar otra sesión."
    ),
  ];

  render() {
    return (
      <div style={{ width: "40%", margin: " 40px auto" }}>
        <div style={{ color: "#5829dd" }}>
          <QuestionAnswer
            style={{ fontSize: "24px", position: "absolute", marginTop: "5px" }}
          />
          <h1 style={{ marginLeft: "30px" }}>Preguntas Frecuentes</h1>
        </div>
        {this.rows.map(({ id, tittle, content }) => (
          <Accordion key={id}>
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: "#5829dd" }} />}
              className="font-tittle"
            >
              {tittle}
            </AccordionSummary>
            <AccordionDetails className="font">{content}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
}

export default Question;
