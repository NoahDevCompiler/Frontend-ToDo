import React, { Component } from 'react';
import { ReactComponent as ExclamationTriangleFill } from 'bootstrap-icons/icons/exclamation-triangle-fill.svg';
import "../styles/Navigation/CreateNew.css";
import { Alert, FormCheck } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router';
import { intervalToDuration } from 'date-fns';




class CreateNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      type: '',
      authenticated: false,
      setauthenticated: false,
      selectedstartDate: new Date(),
      selectedendDate: new Date(),
      errormsg: '',
      showAlert: false,
      succes: '',
      redirectToToDo: false,
      succes: '',
      
    }

  }

  handleChangeend = (dateend) => {
    this.setState({ selectedendDate: dateend });
  };

  handleChangestart = (datestart) => {
    this.setState({ selectedstartDate: datestart });
  };

  SendData = async () => {
    const { name, description, type, selectedstartDate, selectedendDate } = this.state

    if (name && description && type && selectedstartDate && selectedendDate) {

      this.setState({showAlert: false});

      try {
        const response = await fetch("https://localhost:7008/api/ToDo/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: description,
            type: type,
            startdate: selectedstartDate,
            enddate: selectedendDate,
          }),
        });
        if (response.ok) {
          this.setState({ succes: 'ToDo erfolgreich erstellt', redirectToToDo: true })
          
        
        }
      }
      catch (error) {
        console.log(error)
      }
    } else {
      console.log(this.state.name, this.state.description, this.state.type, this.state.selectedstartDate, this.state.selectedendDate)
      console.log("felder bitte ausfüllen")
      this.handleError("Alle Felder ausfüllen");
    }
  }

  handleError = (errormsg) => {
    this.setState({ showAlert: true });
    this.setState({ errormsg });
  }
  render() {
    const { redirectToToDo} = this.state;
    const { showAlert } = this.state;
    const { errormsg } = this.state;

    return <div className='Parentclass'>
      {showAlert && (
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
        
      )}
      <div className="title">
        <h1>Create New Todo</h1>
      </div>



      <div className="formgroup" style={{ marginTop: '50px' }}>
        <label htmlFor="formGroupExampleInput" id='text'>Name of the ToDo</label>
        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="New ToDo" onChange={(evt) => { this.setState({ name: evt.target.value }) }} />
      </div>
      <form style={{ marginTop: '50px' }}>
        <div className="formgroup">
          <label id='text' htmlFor="exampleFormControlTextarea1">Describe your ToDo</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(evt) => {
            this.setState({ description: evt.target.value });
          }}></textarea>
        </div>
      </form>

      <select
        className="formgroup"
        onChange={(evt) => {
          this.setState({ type: evt.target.value }, () => {
          });
        }}

      >
        <option value="Select Type">Select Type</option>
        <option value="School">School</option>
        <option value="Freetime">Freetime</option>
        <option value="Work">Work</option>
      </select>

      <div className="formgroup" style={{ marginRight: '50px' }}>
        <label id='text'>Select Startdate:</label>
        <DatePicker
          selected={this.state.selectedstartDate}
          onChange={this.handleChangestart}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d yyyy HH:mm"
          timeCaption="Time"
        />
      </div>

      <div className="formgroup" style={{ marginRight: '50px' }}>
        <label id='text'>Select Enddate:</label>
        <DatePicker
          selected={this.state.selectedendDate}
          onChange={this.handleChangeend}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="Time"
        />
      </div>

      <motion.button id="button" onClick={() => this.SendData()}>
        <img
          src=".\Pics\check.png" 
          alt="Button Image"
        />
      </motion.button>
      <span style={{ color: 'green', marginTop: '50px' }}>{this.state.succes}</span>

      {redirectToToDo && <Navigate to="/to-dos" />}
    <span style={{ color: 'green', marginTop: '50px'}}>{this.state.succes}</span>

    </div>
  }
}
export default CreateNew;