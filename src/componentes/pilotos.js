//manejando datos desde un servidor externo
import React, { Component } from "react";

export default class PilotosF1 extends Component {
  state = {
    dataDriverList: [],
    dataSeason: [],
    dataSeries: [],
  };

  //await = sirve para indicar que llevará algo de tiempo obtener esos datos
  async componentDidMount() {
    const respuesta = await fetch("http://ergast.com/api/f1/2021/drivers.json");
    const datos = await respuesta.json();
    console.log(datos);

    this.setState({
      dataDriverList: datos.MRData.DriverTable.Drivers,
      dataSeason: datos.MRData.DriverTable.season,
      dataSeries: datos.MRData.series,
    });
  }

  render() {
    if (this.state.dataDriverList.length > 0) {
      return (
        <div className="container-fluid">
          <div className="TablaCotent">
            <div className="label">
              <tr>
                <td>
                  <span>
                    <b>Serie:</b> {this.state.dataSeries}
                  </span>
                </td>
                <td>
                  <span>
                    <b>Temporada:</b> {this.state.dataSeason}
                  </span>
                </td>
                <td>
                  <span>
                    <b>Corredores:</b> {this.state.dataDriverList.length}
                  </span>
                </td>
              </tr>
            </div>

            <table id="F1Table">
              <tr>
                <th>Nombre</th>
                <th>Nacionalidad</th>
                <th>DOB</th>
                <th>Información</th>
                <th>Código</th>
                <th>Número permanente</th>
              </tr>

              {this.state.dataDriverList.map((list) => {
                return (
                  <tr key={list.driverId}>
                    <td>
                      {list.givenName} {list.familyName}
                    </td>
                    <td>{list.nationality}</td>
                    <td>{list.dateOfBirth}</td>
                    <td>
                      <a href={list.url}>Conocer más</a>
                    </td>
                    <td>
                       {list.code} 
                    </td>
                    <td>
                        {list.permanentNumber}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      );
    } else {
      return <p className="text-center">Cargando datos...</p>;
    }
  }
}
