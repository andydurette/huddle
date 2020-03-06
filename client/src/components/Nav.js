import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <p>Huddle</p>
      <ul className="nav-links">
        <NavLink to='/' exact>
        <li>Home</li>
        </NavLink>
        <NavLink to='/login'>
        <li>Login</li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default Nav