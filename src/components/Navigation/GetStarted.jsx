import React, { Component } from 'react';
import "../styles/Navigation/GetStarted.css";
import { Link } from 'react-router-dom';


class GetStarted extends Component {
    state = {  } 
    render() { 
        return <div className="Parentcard">
            <div class="card" style={{width: "18rem"}}>
            <img src=".\Pics\register.jpg" class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">No Account? No Problem!</h5>
                <p class="card-text"></p>
                <Link href="/" class="btn btn-primary" to="/register">Register</Link>
            </div>
      </div>

      <div class="card" style={{width: "18rem"}}>
            <img src=".\Pics\login.png" class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">If you have already an Account you can Log In here.</h5>
                <p class="card-text"></p>
                <Link href="/" class="btn btn-primary" to="/login">Log In</Link>
            </div>
        </div>
    </div>

    }
}
 
export default GetStarted;
