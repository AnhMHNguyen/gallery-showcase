import React from 'react';
import Layout from './src/containers/Layout'

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathName", location.pathname);
  console.log("old pathName", prevLocation ? prevLocation.pathname : null);
}

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{ element }</Layout>
}