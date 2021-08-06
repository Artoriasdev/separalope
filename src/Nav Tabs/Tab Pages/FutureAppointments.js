import { Card, CardContent } from "@material-ui/core";
import { Alarm, Event, Person } from "@material-ui/icons";
import React, { Component } from "react";

class FutureAppointments extends Component {
  createData(id, name, email, date, time) {
    return { id, name, email, date, time };
  }

  componentDidMount() {
    console.log(this.rows);
  }

  rows = [
    this.createData(
      "1",
      "Clases de ingles básico",
      "jorgerojas@hotmail.com",
      "domingo, 24 de junio 2021",
      "12:00 PM"
    ),
    this.createData(
      "2",
      "Clases de ingles básico",
      "manuelvicio@hotmail.com",
      "sabado, 24 de junio 2021",
      "12:00 PM"
    ),
    this.createData(
      "3",
      "Clases de ingles básico",
      "test5@correotest.com",
      "viernes, 24 de junio 2021",
      "12:00 PM"
    ),
    this.createData(
      "4",
      "Clases de ingles básico",
      "haberhaber@correotest.com",
      "lunes, 24 de junio 2021",
      "12:00 PM"
    ),
    this.createData(
      "5",
      "Clases de ingles básico",
      "yuyuyu@hotmail.com",
      "lunes, 24 de junio 2021",
      "12:00 PM"
    ),
    this.createData(
      "6",
      "Clases de ingles básico",
      "arthasmenethil@blubblub.com",
      "miercoles, 24 de junio 2021",
      "12:00 PM"
    ),
    this.createData(
      "7",
      "Clases de ingles básico",
      "bolvarfordragon@blubblub.com",
      "martes, 24 de junio 2021",
      "12:00 PM"
    ),
  ];

  render() {
    return (
      <div>
        <h1>Citas a venir</h1>
        {this.rows.map((row) => (
          <Card
            style={{
              width: 275,
              display: "inline-block",
              margin: "10px 0 10px 40px",
            }}
            variant="elevation"
            key={row.id}
          >
            <CardContent className="font-tittle"> {row.name} </CardContent>
            <hr style={{ width: "80%", margin: "0 auto" }} />
            <CardContent className="font">
              <Person /> {row.email}
            </CardContent>
            <CardContent className="font">
              <Event /> {row.date}
            </CardContent>
            <CardContent className="font">
              <Alarm /> {row.time}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default FutureAppointments;
