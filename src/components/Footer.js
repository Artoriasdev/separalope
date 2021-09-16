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
  createTheme,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  Facebook,
  Instagram,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const tema = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 550,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 2,
  },
  sectionDesktop: {
    display: "none",
    [tema.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    flexDirection: "column",
    [tema.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export const Footer = () => {
  const classes = useStyles();

  const [terms, setTerms] = useState([]);

  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    handleGetTerms();
  }, []);

  const handleGetTerms = () => {
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

        return response;
      });
    return rspApi;
  };

  const handleRedirect = (id) => {
    if (id === 1) {
      history.push("/frequent-questions");
    } else if (id === 2) {
      history.push("/quejas-y-reclamaciones");
    }
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

  const renderMobileMenu = (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemText
          primary="Nuestras políticas"
          style={{ textAlign: "center" }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <button className="font-p" onClick={handleModalPriv}>
              Políticas de privacidad
            </button>
          </ListItem>
          <ListItem>
            <button className="font-p" onClick={() => handleRedirect(1)}>
              Preguntas frecuentes
            </button>
          </ListItem>
          <ListItem>
            <button className="font-p" onClick={() => handleModalTerm()}>
              Términos y condiciones
            </button>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );

  return (
    <div className="footer-container">
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

      <AppBar position="static" className="footer">
        <Container maxWidth="lg">
          <Toolbar>
            <Grid item>
              <p className="font-tittle">Contáctanos</p>
              <p className="text">Celular : 999</p>
              <p className="text">Correo: aaa@aaa</p>
            </Grid>
            <div className={classes.grow} />
            <Grid item>
              <p className="font-tittle title">Búscanos en</p>
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
      <hr className="hr" />
      <AppBar
        position="static"
        className="footer"
        style={{
          marginTop: "-1px",
          padding: "0",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar className="footer">
            <div className={classes.sectionDesktop}>
              <p className="p">Copyright © 2021 separalope</p>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={handleModalPriv}>
                Políticas de privacidad
              </button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleRedirect(1)}>
                Preguntas frecuentes
              </button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleModalTerm()}>
                Términos y condiciones
              </button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleRedirect(2)}>
                Libro de reclamaciones
              </button>
            </div>
            <div className={classes.sectionMobile}>
              <p className="p">Copyright © 2021 separalope</p>
              <button
                className="font-p"
                onClick={() => handleRedirect(2)}
                style={{ marginTop: "20px" }}
              >
                Libro de reclamaciones
              </button>
              {renderMobileMenu}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
