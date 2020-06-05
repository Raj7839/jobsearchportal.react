import React, { Component } from "react";
import Header from "./components/Header/Header";
import InputForm from "./components/InputForm/InputForm";
import PageContent from "./components/PageContent/PageContent";
import Particles from "react-particles-js";
import axios from "axios";
import "./style.css";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 150
    },
    size: {
      value: 3
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      tech: "",
      location: "",
      spinnerDisc: "",
      page: 0
    };
  }
  //get the technology user is looking form input
  getTechType = event => {
    this.setState({
      tech: event.target.value
    });
  };
  //get the location user in looking from the input
  getLocation = event => {
    this.setState({
      location: event.target.value
    });
  };
  //this function will perform the magic calling the api adding the endpoints from the form inputs
  searchData = () => {
    if (this.state.tech === "" && this.state.location === "") {
      alert("Please Fill the required fields.");
    } else {
      this.setState({
        spinnerDisc: <div className="loader"></div>,
        page: 1
      });
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${this.state.tech}&location=${this.state.location}&full_time=true&page=${this.state.page}`
        )
        .then(res => {
          this.setState({
            spinnerDisc: ""
          });
          if (res.data.length === 0) {
            alert("No Jobs Found !!");
          } else {
            this.setState({
              jobs: res.data
            });
          }
        });
    }
  };
  // to display the contents on the next page repeat the above steps setstate jobsto empty array
  nextPage = () => {
    this.setState({
      jobs: [],
      spinnerDisc: <div className="loader"></div>,
      page: this.state.page + 1
    });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${this.state.tech}&location=${this.state.location}&full_time=true&page=${this.state.page}`
      )
      .then(res => {
        this.setState({
          spinnerDisc: ""
        });
        if (res.data.length === 0) {
          alert("No Jobs Found !!");
          this.setState({
            page: 0
          });
        } else {
          this.setState({
            jobs: res.data
          });
        }
      });
  };
  //if user wants to go back to previous page this function will handle that functionality
  prevPage = () => {
    this.setState({
      jobs: [],
      spinnerDisc: <div className="loader"></div>,
      page: this.state.page - 1
    });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${this.state.tech}&location=${this.state.location}&full_time=true&page=${this.state.page}`
      )
      .then(res => {
        this.setState({
          spinnerDisc: ""
        });
        if (res.data.length === 0) {
          alert("No Jobs Found !!");
          this.setState({
            page: 0
          });
        } else {
          this.setState({
            jobs: res.data
          });
        }
      });
  };

  render() {
    let page =
      this.state.page === 0 ? (
        ""
      ) : (
        <div className="center">
          <button
            className="f6 bw1 dim ba ph2 pv1 mb3 pa3 dib dark-gray pointer br3"
            onClick={this.prevPage}
          >
            Prev
          </button>
          <h5 className="ma2 f6">{this.state.page}</h5>
          <button
            className="f6 bw1 dim ba ph2 pv1 pa3 mb3 dib dark-gray br3 pointer"
            onClick={this.nextPage}
          >
            Next
          </button>
        </div>
      );
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Header />
        <InputForm
          searchData={this.searchData}
          getTechType={this.getTechType}
          getLocation={this.getLocation}
        />
        <div className="center">{this.state.spinnerDisc}</div>
        <PageContent className="center" jobs={this.state.jobs} />
        {page}
      </div>
    );
  }
}

export default App;
