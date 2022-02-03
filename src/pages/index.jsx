import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.ico";
import Loadable from 'react-loadable';

const loader = () => <div>Loading...</div>;

const HomeLazy = Loadable({
  loader: () => import("../containers/Home"),
  loading: loader
});

const IndexPage = () => {
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title>Jimmie Studio</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <HomeLazy />
    </>
  );
}

export default IndexPage
