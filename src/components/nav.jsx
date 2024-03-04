import React, { Component } from 'react';
import './styles/navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {  
      isloggedin: false,
    } 
    render() { 
        return <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            From To-Do to Ta-Da
            </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/getstarted">Get Started</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="createnew">Create New</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/to-dos">To Do's</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" to="/pricing">Pricing</a>
              </li>
            </ul>
            {this.state.isloggedin && 
              <div className="userlog">User:</div>
            }
            {!this.state.isloggedin && 
              <div className="userlog">Nicht Eingeloggt</div>
            }
          </div>
        </div>
      </nav>;
    }
}
 
export default Navbar;