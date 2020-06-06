import React from "react";
import "./PageContent.css";

const PageContent = props => {
  const jobs = props.jobs;
  const jobList = jobs.map(job => (
    <div key={job.id} className="outline w-25 pa3 mr3 center br2 mb3">
      <div className="db w-100 br2 br--top">
        <img
          src={job.company_logo}
          className="company-logo w-100 db center"
          alt=""
        ></img>
        <div className="gray db pv2">
          <p className="gray db pv2">{job.created_at}</p>
          <a href={job.url}>
            <p className="f6 link dim ba ph2 pv1 mb2 dib dark-blue br3">
              Details
            </p>
          </a>
        </div>
      </div>
      <div className="tc">
        <h4>
          <strong>{job.title}</strong>
        </h4>
        <a href={job.company_url}>
          <h5>{job.company}</h5>
        </a>
        <p className="f6 ttu tracked tc ">{job.type}</p>
        <p className="f6 ttu tracked tc">Location : {job.location}</p>
      </div>
    </div>
  ));
  return <div className="flex flex-wrap ma4">{jobList}</div>;
};

export default PageContent;
