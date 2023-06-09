import React from "react";
import { Link } from "react-router-dom";

const NavMenu: React.FC = () => {
  return (
    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
      <li className='nav-item'>
        <Link to='/' className='nav-link active' aria-current='page'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/products' className='nav-link'>
          Products
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/' className='nav-link'>
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default NavMenu;
