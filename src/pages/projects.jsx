import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.ico";
import Projects from "../containers/Projects";

const ProjectsPage = () => {
  return (
    <main>
      <Helmet>
        <meta charset="utf-8" />
        <title>Jimmie's Projects</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <Projects />
    </main>
  )
}

export default ProjectsPage