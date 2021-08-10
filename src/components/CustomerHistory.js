import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Event } from "@material-ui/icons";
import React, { Component } from "react";

class CustomerHistory extends Component {
  createData(id, name, type, date, time, status, points) {
    return { id, name, type, date, time, status, points };
  }

  rows = [
    this.createData(
      "1",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
    this.createData(
      "2",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
    this.createData(
      "3",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
    this.createData(
      "4",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
    this.createData(
      "5",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
    this.createData(
      "6",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
    this.createData(
      "7",
      "Luke Skywalker",
      "Como usar la fuerza",
      "12/10/2040",
      "4.35 P.M",
      "Activo",
      "5/5"
    ),
  ];
  render() {
    return (
      <div style={{ maxWidth: "90%", margin: "40px auto" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Event fontSize="large" style={{ margin: "0 5px 0 0" }} />
          <h1 style={{ color: "#5829dd" }}>Mis historial de citas</h1>
        </div>
        <TableContainer
          style={{
            width: "100%",
            borderRadius: "10px 10px",
            margin: "10px 0",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              style={{
                background: "#f3f3f3",
              }}
            >
              <TableRow>
                <TableCell className="font-tittle">Profesor/a</TableCell>
                <TableCell className="font-tittle">Tipo de clase</TableCell>
                <TableCell className="font-tittle">Fecha</TableCell>
                <TableCell className="font-tittle">Hora</TableCell>
                <TableCell className="font-tittle">Estado</TableCell>
                <TableCell className="font-tittle">Puntuado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map(
                ({ id, name, type, date, time, status, points }) => (
                  <TableRow key={id}>
                    <TableCell className="font">{name}</TableCell>
                    <TableCell className="font">{type}</TableCell>
                    <TableCell className="font">{date}</TableCell>
                    <TableCell className="font">{time}</TableCell>
                    <TableCell className="font">{status}</TableCell>
                    <TableCell className="font">{points}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default CustomerHistory;
