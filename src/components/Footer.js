import {
  AppBar,
  Grid,
  Container,
  makeStyles,
  Toolbar,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText as p,
  DialogTitle,
} from "@material-ui/core";
import { Facebook, Instagram } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 3,
  },
}));

export const Footer = () => {
  const classes = useStyles();

  const [terms, setTerms] = useState([]);

  useEffect(() => {
    handleGetList();
  }, []);

  const handleGetList = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/generic/getTermsAndConditions`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        setTerms(data);

        console.log(data);

        return response;
      });
    return rspApi;
  };

  const [term, setTerm] = useState(false);
  const [priv, setPriv] = useState(false);

  const handleModalPriv = () => {
    setPriv(true);
  };
  const handleModalTerm = () => {
    setTerm(true);
  };

  const handleClose = () => {
    setTerm(false);
    setPriv(false);
  };
  return (
    <div style={{ marginTop: "30px" }}>
      <Dialog open={priv} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0", color: "#5829dd" }} className="font-p">
            Políticas de privacidad
          </h2>
        </DialogTitle>
        <DialogContent>
          <p
            className="font"
            style={{ margin: "0 0 10px 0", textAlign: "justify" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas
            leo sit amet ornare luctus. Phasellus sem sapien, ultrices sed nisi
            eget, dignissim ullamcorper urna. Suspendisse at quam sem. Integer a
            facilisis metus, ut vestibulum nulla. Sed non mi vitae lectus mollis
            facilisis non sed neque. Curabitur semper augue id odio porta
            mollis. Donec consequat tincidunt turpis vitae rhoncus. Proin
            lacinia sollicitudin tempor. Vestibulum molestie blandit maximus.
            Donec cursus ipsum id neque porta consequat.
          </p>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              className="font-p btn-primary"
              color="primary"
              onClick={handleClose}
              variant="contained"
              style={{
                width: "30%",
                textTransform: "capitalize",
              }}
            >
              Salir
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={term} onClose={handleClose} scroll="paper">
        {terms.map(({ id, value }) => (
          <DialogContent key={id}>
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </DialogContent>
        ))}
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            className="font-p btn-primary"
            color="primary"
            onClick={handleClose}
            variant="contained"
            style={{
              margin: "5px 0 3px 0",
              width: "30%",
              textTransform: "capitalize",
            }}
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar
        position="static"
        style={{ backgroundColor: "#232323", paddingBottom: "25px" }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Grid item>
              <p style={{ margin: "20px 0 10px 0" }} className="font-tittle">
                Contáctanos
              </p>
              <p style={{ fontSize: "13px", margin: "0", padding: "0" }}>
                Celular : 999
              </p>
              <p style={{ fontSize: "13px", margin: "0", padding: "0" }}>
                Correo: aaa@aaa
              </p>
            </Grid>
            <div className={classes.grow} />
            <Grid item>
              <p style={{ margin: "20px 0 10px 0" }} className="font-tittle">
                Búscanos en
              </p>
              <span>
                <IconButton aria-label="facebook" color="inherit">
                  <Facebook />
                </IconButton>
                <IconButton aria-label="facebook" color="inherit">
                  <Instagram />
                </IconButton>
              </span>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <hr
        style={{ margin: "0", padding: "0", borderTop: "1px solid #e9e9e9" }}
      />
      <AppBar
        position="static"
        style={{
          backgroundColor: "#232323",
          marginTop: "-1px",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <p style={{ fontSize: "13px", margin: "0", padding: "0" }}>
              Copyright © 2021 separalope
            </p>
            <div className={classes.grow} />
            <hr
              style={{
                border: "none",
                margin: 0,
                marginLeft: "1rem",
                marginRight: "1rem",
                width: "1px",
                height: "20px",
                borderLeft: "1px solid #e9e9e9",
              }}
            />
            <div className={classes.grow} />
            <button
              className="font-p"
              onClick={handleModalPriv}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0",
                fontSize: "13px",
              }}
            >
              Politicas de privacidad
            </button>
            <div className={classes.grow} />
            <hr
              style={{
                border: "none",
                margin: 0,
                marginLeft: "1rem",
                marginRight: "1rem",
                width: "1px",
                height: "20px",
                borderLeft: "1px solid #e9e9e9",
              }}
            />
            <div className={classes.grow} />
            <button
              className="font-p"
              onClick={() => handleModalTerm()}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0",
                fontSize: "13px",
              }}
            >
              Términos y condiciones
            </button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
