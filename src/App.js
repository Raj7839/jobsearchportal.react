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
      spinnerDisp: "",
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
        spinnerDisp: <div className="loader"></div>,
        page: 1
      });
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${this.state.tech}&location=${this.state.location}&full_time=true&page=${this.state.page}`
        )
        .then(res => {
          this.setState({
            spinnerDisp: ""
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
      spinnerDisp: <div className="loader"></div>,
      page: this.state.page + 1
    });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${this.state.tech}&location=${this.state.location}&page=${this.state.page}`
      )
      .then(res => {
        this.setState({
          spinnerDisp: ""
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
      spinnerDisp: <div className="loader"></div>,
      page: this.state.page - 1
    });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${this.state.tech}&location=${this.state.location}&page=${this.state.page}`
      )
      .then(res => {
        this.setState({
          spinnerDisp: ""
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
        <div className="row flex-row justify-content-center p-3">
          <button
            className="btn btn-outline-dark mx-3 btn-page"
            onClick={this.prevPage}
          >
            Prev
          </button>
          <h5 className="my-2">{this.state.page}</h5>
          <button
            className="btn btn-outline-dark mx-3 btn-page"
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
        <div className="center">{this.state.spinnerDisp}</div>
        <PageContent jobs={this.state.jobs} />
        {page}
      </div>
    );
  }
}

export default App;
