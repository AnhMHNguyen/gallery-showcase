import React from 'react';
import ImageLink from '../components/ImageLink';
import jsonData from '../data/page.json';
import "../styles/home.scss";

const Home = () => {
  const components = jsonData.map((element, index) => (
    <ImageLink key={ element.slug} element={element } index={ index } />
  ))

  return (
    <div className="content">
      <div className="home-grid">{components}</div>
    </div>
  );
};

export default Home;
