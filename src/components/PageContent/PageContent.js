import React from "react";
import "./PageContent.css";

const PageContent = props => {
  const jobs = props.jobs;
  const jobList = jobs.map(job => (
    <div key={job.id} className="card col-5 flex-row row p-0 m-2 mt-3 card-css">
      <div className="col-3 pt-3 p-3">
        <img src={job.company_logo} className="company-logo" alt=""></img>
      </div>
      <div className="col-9 p-3">
        <h4>
          <strong>{job.title}</strong>
        </h4>
        <a href={job.company_url}>
          <h5>{job.company}</h5>
        </a>
        <p className="m-0">{job.type}</p>
        <p className="m-0">Location : {job.location}</p>
      </div>
      <div className="card-footer footer text-muted flex-row row justify-content-between p-2 m-0">
        <p className="m-0 ml-3">{job.created_at}</p>
        <a href={job.url}>
          <p className="m-0 mr-3">Details</p>
        </a>
      </div>
    </div>
  ));
  return <div className="p-3 row justify-content-around">{jobList}</div>;
};

export default PageContent;
