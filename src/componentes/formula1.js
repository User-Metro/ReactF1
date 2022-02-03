//manejando datos desde un servidor externo
import React, { Component } from "react";

export default class Formula1 extends Component {
  //creamos un estado que contendrá arreglos para almacenar la informacion de la API
  state = {
    dataList: [],
    dataSeries: [],
    dataSeason: [],
    prueba: [],
  };

  //await = sirve para indicar que llevará algo de tiempo obtener esos datos
  async componentDidMount() {
    const respuesta = await fetch("http://ergast.com/api/f1/2021.json");
    const datos = await respuesta.json(); //parsear los datos a formato json
    //mostrar los datos en consola
    console.log(datos);
    console.log("dato:" + datos.MRData.RaceTable.season);
    console.log("dato:" + datos.MRData.RaceTable.Races.Circuit);

    //en el estado pasamos los datos de la API a los arreglos que hemos creado
    this.setState({
      dataList: datos.MRData.RaceTable.Races,
      dataSeries: datos.MRData.series,
      dataSeason: datos.MRData.RaceTable.season,
    });
  }

  //renderizamos los datos obtenidos
  render() {
    //validamos que tengamos informacion en el arreglo
    if (this.state.dataList.length > 0) {
      return (
        //creamos un div contenedor par alos datos
        <div className="container-fluid">
          <div className="TablaCotent">
            <div className="label">
              <tr>
                <td>
                  <span>
                    <b>Series:</b> {this.state.dataSeries}
                  </span>
                </td>
                <td>
                  <span>
                    <b>Temporada:</b> {this.state.dataSeason}
                  </span>
                </td>
                <td>
                  <span>
                    <b>Resultados:</b> {this.state.dataList.length}
                  </span>
                </td>
              </tr>
            </div>

            <table id="F1Table">
              <tr>
                <th>Nombre</th>
                <th>Ronda</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Circuito</th>
                <th>Localidad</th>
                <th>País</th>
                <th>URL</th>
              </tr>

              {this.state.dataList.map((list) => {
                return (
                  <tr key={list.round}>
                    <td>{list.raceName}</td>
                    <td>{list.round}</td>
                    <td>{list.date}</td>
                    <td>{list.time}</td>
                    <td>{list.Circuit.circuitName}</td>
                    <td>{list.Circuit.Location.locality}</td>
                    <td>{list.Circuit.circuitId}</td>
                    <td>
                      <a href={list.Circuit.url}>Visitar circuito</a>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div> //container
      );
      /*en caso de que no contener información o de que esté cargando, 
       aparecerá el siguiente mensaje de "Cargando datos"
    */
    } else {
      return <p className="text-center">Cargando datos...</p>;
    }
  }
}
