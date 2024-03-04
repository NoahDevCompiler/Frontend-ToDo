import React, { Component } from 'react';
import "../styles/Auth/Register.css";
import { Navigate } from 'react-router-dom';
import { Alert, FormCheck } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ReactComponent as ExclamationTriangleFill } from 'bootstrap-icons/icons/exclamation-triangle-fill.svg';

class Register extends Component {
  
     constructor(props){
      super(props);
      this.state = { 
        email: '',
        password: '',
        username: '',
        errormsg:'',
        succes:'',
        redirectToLogin: false,
        showAlert: false
       }  
     }

     setRedirect(){
      this.setState({succes: 'Konto erfolgreich erstellt'})
      setTimeout(() => {
        
        this.setState({ redirectToLogin: true });
      }, 1000);  
     }
    
     SendData = async ()=>{
      
      console.log("SendData wird aufgerufen");
      const{email, password, username, showAlert, errormsg} = this.state
      if (email.includes("@bene-edu") && email.endsWith(".ch")) {
        try {
          const response = await fetch("https://localhost:7008/api/User/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              
              email: email,
              password: password,
              username: username,
            
            }),     
          });

        if(response.ok){        
          console.log("Konto erfolgreich erstellt")
          this.setRedirect();        

        } else{
          console.error("Fehler von der API (User bereits vergeben)");
          this.setState({showAlert: true, errormsg: "Email oder Username bereits verwendet"});
        }
      }
      catch(error){
        console.error("Fehler bei der Anfrage", error.message);
      }
    }
        else {
         this.setState({errormsg: "Die Email muss die Domain '@bene-edu.ch' haben", showAlert: true})
        }
      }
      
    render() { 
      const { redirectToLogin, showAlert, errormsg } = this.state;

        return <div className='ParentRegister'>
          
          {showAlert &&(
          <div className="Alertclass">
            <motion.div
            initial={{ opacity: 0, scale: 2, x: -100, y: -100, position: 'fixed', top: 100, right: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, position: 'fixed', top: 90, right: 0 }}
            transition={{ duration: 1 }}
            className='alert'
            >
            <Alert key="danger" role="alert" variant='danger'>
            <ExclamationTriangleFill color='red' height="24" width="24" />
            {errormsg}
            </Alert>
            </motion.div>
          </div>
          )}

        <form>
        <div class="form-row" id="form">
        <div class="form-group col-md-6" style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlForfor="inputEmail4" style={{marginRight: '52px'}}>Email</label>     
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" onChange={(evt) => {this.setState({email: evt.target.value }); 
          console.log("Email geändert:", evt.target.value);
        }} />
  
        </div>
        
      <div class="form-group col-md-6" id="form" style={{ display: 'flex', alignItems:'center'}}>   
        <label htmlForfor="inputPassword4" style={{ marginRight: '23px'}}>Password</label>
        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" onChange={(evt) => {this.setState({password: evt.target.value})}}/>
      </div>
    </div>
      <div class="form-group" id="form" style={{ display: 'flex', alignItems:'center'}}>
        <label htmlForfor="inputAddress" style={{ marginRight: '10px'}}>User Name</label>
        <input type="text"  class="form-control" id="inputAddress" onChange={(evt) => {this.setState({username: evt.target.value})}}/>
      </div>
  
      <button type="button" class="btn btn-primary" id="registerbtn" onClick={() => this.SendData()}>Register</button>     
    </form>
    {redirectToLogin && <Navigate to="/login" />}
    <span style={{ color: 'green', marginTop: '50px'}}>{this.state.succes}</span>
  </div>
}
}

 
export default Register;

 
