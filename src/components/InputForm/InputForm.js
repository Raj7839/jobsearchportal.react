import React from "react";
import "./InputForm.css";

const InputForm = ({ getTechType, getLocation, searchData }) => {
  return (
    <div>
      <div className="pa4 br3 shadow-2 form">
        <div>
          <p className="f4 b dark-blue">{"Technologies you know?"}</p>
          <div>
            <input
              type="text"
              className="f4 pa2 w-30 br3 center"
              onChange={getTechType}
            />
          </div>
        </div>
        <div>
          <p className="f4 b dark-blue">{"Location you are looking for?"}</p>
          <div>
            <input
              type="text"
              className="f4 pa2 w-30 br3 center"
              onChange={getLocation}
            />
          </div>
        </div>
        <div>
          <button
            className="w-19 grow f3 ph3 pv2 dib pointer white ba br3 ma3 b dark-blue"
            onClick={searchData}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
