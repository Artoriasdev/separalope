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
      <div className="page-container" style={{ padding: "0" }}>
        <div className="appointment-container">
          <Event fontSize="large" style={{ margin: "0 5px 0 0" }} />
          <h1>Mis historial de citas</h1>
        </div>
        <TableContainer className="table">
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
