import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <h1>Science for All!</h1>
      </Link>
      <div className="right menu">        
        <Link to="/" className="item">
          Menu TBD
        </Link>
      </div>
    </div>
  );
}

export default Header;