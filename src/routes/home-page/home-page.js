import React from 'react';
import { Redirect } from 'react-router';

const HomePage = () => {
  return (
    <Redirect to="/conferences/" />
    // <div>
    //   <h1>HOME PAGE</h1>
    // </div>
  );
};

export default HomePage;
