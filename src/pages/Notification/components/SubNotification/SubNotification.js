import React from "react";
import "./SubNotification.css";

const SubNotification = ({ projects }) => {
  return (
    <div>
      <div id="sline">
        <div className="sdline"></div>
        <h1>Thông tin khác</h1>
        <div className="sdline"></div>
      </div>
      <div id="latestp">
        {projects.map((project, index) => (
          <article
            key={index}
            className={index === projects.length - 1 ? "lastarticle" : ""}
          >
            <h1>{project.title}</h1>
            <img src={project.image} alt={project.title} />
            <p>{project.description}</p>
            <a href={project.link} className="rm">
              Đọc thêm
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SubNotification;
