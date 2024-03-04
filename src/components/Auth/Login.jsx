import React, { Component } from 'react';
import "../styles/Auth/Login.css"
import { Navigate } from 'react-router-dom';
import { Alert, FormCheck } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ReactComponent as ExclamationTriangleFill } from 'bootstrap-icons/icons/exclamation-triangle-fill.svg';

class Login extends Component {
    state = {
        redirectToToDo: false,
        userInputEmail: '',
        userInputPassword: '',
        msg: '',
        showAlert: false,
        showSuccess: false,
    }
    GetUserName = async (id) => {
        console.log(id)
        const response = await fetch(`https://localhost:7008/api/FetchUserData/UserName?id=${id}`)

        if (!response.ok) {
            throw new Error('API Request Fehlgeschlagen');
        }
        const username = await response.text();
        localStorage.setItem('username', username);

    }

    CheckLogin = async (userInputEmail, userInputPassword) => {

        this.setState({ showAlert: false });
        const data = {
            email: this.state.userInputEmail,
            password: this.state.userInputPassword
        }

        console.log(data)

        try {
           
            const response = await fetch('https://localhost:7008/api/UserLogin/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const clonedResponse = response.clone();
                const text = await clonedResponse.text();
                this.GetUserName(text)
                this.setState({ showAlert: true, showSuccess: true, msg: `Erfolgreiches Login`, redirectToToDo: true })

            }
            else this.setState({showAlert: true, showSuccess: false, msg: 'Falsche Email'})
            
        }
        catch (error) {
            this.setState({msg: 'Fehlgeschlagen Server Antwort: '})
            
        }
    }

    handleChangeEmail = (event) => {   

        this.setState({ userInputEmail: event.target.value })
    }
    handleChangePassword = (event) => {      

        this.setState({ userInputPassword: event.target.value })
    }


    render() {

        const { userInputEmail, userInputPassword, msg, showAlert, showSuccess, redirectToToDo } = this.state;

        return <div className="Mother">
        {showAlert &&(
          <div className="Alertclass">
            <motion.div
            initial={{ opacity: 0, scale: 2, x: -100, y: -100, position: 'fixed', top: 100, right: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, position: 'fixed', top: 90, right: 0 }}
            transition={{ duration: 1 }}
            className='alert'
            >
            {showSuccess ? (
                <Alert key="success" role="alert" variant='success'>
                    {msg}
                </Alert>
                ) : (
                <Alert key="danger" role="alert" variant='danger'>
                    <ExclamationTriangleFill color='red' height="24" width="24" />
                    {msg}
                </Alert>
            )}
            </motion.div>
          </div>
          )}
            <div className="title">
                <section className="bg-dark text-light p-4 text-cente" id="title">
                    <div className="container"> <h1>Login</h1>
                    </div>
                </section>
            </div>
            <div className="ParentLogin">
                <div class="mb-3 row">
                    <label for="inputEmail" class="col-sm-2 col-form-label" id="text">Email</label>
                    <div class="col-sm-10">
                        <input type="text" value={this.state.userInputEmail} onChange={this.handleChangeEmail} class="form-control" id="inputEmail" />
                    </div>

                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" id="text">Password</label>
                    <div class="col-sm-10">
                        <input type="password" value={this.state.userInputPassword} onChange={this.handleChangePassword} class="form-control" id="inputPassword" />
                    </div>
                </div>
                <a className="btn btn-lg" id="btn1" onClick={() => this.CheckLogin()}>Login</a>
                {showSuccess && <Navigate to="/to-dos" />}
            </div>
        </div>
    }
}


export default Login