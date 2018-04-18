import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { relative } from "path";

class App extends Component {
  state = {
    isDataWeather: [], //detaile sur aujourd' hui et les jour a venir (3 jours)
    istxt_forecast: [], // detail sur aujourd'hui et les jours a venir (3 jours) pour le matin et le soir
    ismoon_phase: [],
    issun_phase: []
  };

  componentWillMount() {
    axios
      .get(
        "http://api.wunderground.com/api/080cf384795729db/conditions/astronomy/forecast/lang:FR/q/Spain/Madrid.json"
      )
      .then(response => {
        console.log(response.data.moon_phase);
        console.log(response.data);
        this.setState({
          isDataWeather: response.data.forecast.simpleforecast.forecastday,
          istxt_forecast: response.data.forecast.txt_forecast.forecastday,
          ismoon_phase: [response.data.moon_phase],
          issun_phase: [response.data.sun_phase]
        });
      })
      .catch(error => {
        console.log("Erreur");
      });
  }

  render() {
    const dataWeather = this.state.isDataWeather;
    console.log(this.state.isDataWeather);
    console.log(this.state.ismoon_phase);
    return (
      <div className="App">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">
                Logo
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="sass.html">Sass</a>
                </li>
                <li>
                  <a href="badges.html">Components</a>
                </li>
                <li>
                  <a href="collapsible.html">JavaScript</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="box">
          <div className="title">
            <p>HELLO</p>
          </div>
          <div className="contenu">
            <div className="map">
              <p>MAP</p>
              {this.state.istxt_forecast.map((element, index) => {
                let image =
                  "https://icons.wxug.com/i/c/i/" + element.icon + ".gif";
                return (
                  <div key={index}>
                    <p>{element.title}</p>
                    <img src={image} alt={index} />
                    <p>texte:&nbsp;{element.fcttext_metric}</p>
                  </div>
                );
              })}
            </div>
            <div className="sentence">
              {dataWeather.map((element, index) => {
                let image =
                  "https://icons.wxug.com/i/c/i/" + element.icon + ".gif";
                return (
                  <div key={index}>
                    <img src={image} alt={index} />
                    <p>
                      Date: {element.date.weekday}&nbsp;{element.date.day}
                      &nbsp;{element.date.monthname}&nbsp;{element.date.year}
                    </p>
                    <p>Contidion: {element.conditions} </p>

                    <p>tempetature max: {element.high.celsius}&nbsp; celsius</p>
                    <p>tempetature min: {element.low.celsius}&nbsp; celsius.</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sentence">
          <p>lune</p>
          {this.state.ismoon_phase.map((el, i) => {
            return (
              <div key={i}>
                <p>{el.phaseofMoon}</p>
                <p>
                  {el.moonrise.hour}:{el.moonrise.minute}
                </p>
                <p>
                  {el.moonset.hour}:{el.moonset.minute}
                </p>
              </div>
            );
          })}
        </div>
        <div className="sentence">
          <p>lune</p>
          {this.state.issun_phase.map((el, i) => {
            return (
              <div key={i}>
                <p>
                  {el.sunrise.hour}:{el.sunrise.minute}
                </p>
                <p>
                  {el.sunset.hour}:{el.sunset.minute}
                </p>
              </div>
            );
          })}
        </div>

        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">
                  You can use rows and columns here to organize your footer
                  content.
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2014 Copyright Text
              <a className="grey-text text-lighten-4 right" href="#!">
                More Links
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
