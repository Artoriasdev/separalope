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
  Twitter,
  LinkedIn,
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
    textAlign: "center",
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

  const handleGetTerms = (id) => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getTemplates/${id}`;

    const rspApi = axios
      .get(linkDocumentsApi, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response.data;

        setTerms(data);

        return response;
      })
      .catch((error) => {
        console.log(error);
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

  const handleModalTerm = (id) => {
    handleGetTerms(id);
    setTerm(true);
  };

  const handleClose = () => {
    setTerm(false);
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
            <button className="font-p" onClick={() => handleModalTerm(1)}>
              Términos y condiciones
            </button>
          </ListItem>
          <ListItem>
            <button className="font-p" onClick={() => handleRedirect(1)}>
              Preguntas frecuentes
            </button>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );

  const renderMobileHeader = (
    <>
      <Grid item>
        <p className="font-tittle">Contáctanos</p>
        <p className="text">Celular : +51 978 731 556</p>
        <p className="text" style={{ marginTop: "5px" }}>
          Correo: contacto@separalo.pe
        </p>
      </Grid>

      <Grid item>
        <p className="font-tittle title" style={{ textAlign: "center" }}>
          Búscanos en
        </p>
        <span>
          <IconButton
            aria-label="facebook"
            color="inherit"
            style={{ marginRight: "10px" }}
            href="https://www.facebook.com/Separalo-pe-114080404377277"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            aria-label="instagram"
            color="inherit"
            style={{ marginRight: "10px" }}
            href="https://www.instagram.com/separalope/"
            target="_blank"
          >
            <Instagram />
          </IconButton>
          <IconButton
            aria-label="twitter"
            color="inherit"
            style={{ marginRight: "10px" }}
            href="https://www.instagram.com/separalope/"
            target="_blank"
          >
            <Twitter />
          </IconButton>
          <IconButton
            size="small"
            aria-label="twitter"
            color="inherit"
            href="https://www.linkedin.com/company/separalo-pe/?viewAsMember=true"
            target="_blank"
          >
            <LinkedIn />
          </IconButton>
        </span>
      </Grid>
    </>
  );

  return (
    <div className="footer-container">
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
          <Toolbar className="footer">
            <div className={classes.sectionDesktop}>
              <Grid item>
                <p className="font-tittle">Contáctanos</p>
                <p className="text">Celular : +51 978 731 556</p>
                <p className="text" style={{ marginTop: "5px" }}>
                  Correo: contacto@separalo.pe
                </p>
              </Grid>
            </div>
            <div className={classes.grow} />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Grid item>
                <p
                  className="font-tittle title"
                  style={{ textAlign: "center" }}
                >
                  Búscanos en
                </p>
                <span>
                  <IconButton
                    size="small"
                    aria-label="facebook"
                    color="inherit"
                    style={{ marginRight: "15px" }}
                    href="https://www.facebook.com/Separalo-pe-114080404377277"
                    target="_blank"
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="instagram"
                    color="inherit"
                    style={{ marginRight: "15px" }}
                    href="https://www.instagram.com/separalope/"
                    target="_blank"
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="twitter"
                    color="inherit"
                    style={{ marginRight: "15px" }}
                    href="https://twitter.com/SeparaloPe"
                    target="_blank"
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="twitter"
                    color="inherit"
                    href="https://www.linkedin.com/company/separalo-pe/?viewAsMember=true"
                    target="_blank"
                  >
                    <LinkedIn />
                  </IconButton>
                </span>
              </Grid>
            </div>
            <div className={classes.sectionMobile}>{renderMobileHeader}</div>
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
              <p className="p">Copyright © 2021 separalo.pe</p>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleModalTerm(1)}>
                Términos y condiciones
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
              <button className="font-p" onClick={() => handleRedirect(2)}>
                Libro de reclamaciones
              </button>
            </div>

            <div className={classes.sectionMobile}>
              <p className="p">Copyright © 2021 Separalope</p>
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
