import React from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";
import Logo from "../asserts/images/logo.png";
const Navbar = () => {

    const handleLogout = () =>{
        fire.auth().signOut();
      }

    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <Link to='/dashboard' className="navbar-brand brand-heading"><img className="nav-logo" src={Logo}/>Main Mumbai Bazar</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link to="/users" class="nav-link">Users</Link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Games Management
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link to='/create-game' class="dropdown-item">Create Game</Link>
        <Link to='/game-rate' class="dropdown-item">Game Rates</Link>
        <div class="dropdown-divider"></div>
        {/* <Link to='/gali-game-rate' class="dropdown-item">Gali Desawar Rates</Link> */}
        <Link to='/all-transaction' class="dropdown-item">All Transactions</Link>
        <Link to='/bonus-amount' class="dropdown-item">Update Bonus</Link>
        </div>
      </li>
      <li class="nav-item">
        <Link to='/declare-result' class="nav-link">Declare Result</Link>
      </li>
      <li class="nav-item">
        <Link to="/request-list" class="nav-link">Request List</Link>
      </li>
      <li class="nav-item">
        <Link to="/setting" class="nav-link">Settings</Link>
      </li>
      <li className='nav-item'>
      <div className='btn btn-small logout2'  to='/' onClick={handleLogout}><i class="fas fa-sign-out-alt"></i>{" "}Logout</div>
      </li>
    </ul>
  </div>
  <div className='btn btn-small logout'  to='/' onClick={handleLogout}><i class="fas fa-sign-out-alt"></i>{" "}Logout</div>
</nav>
        </div>
    )
}

export default Navbar;
