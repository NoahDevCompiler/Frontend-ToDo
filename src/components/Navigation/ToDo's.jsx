import { useIsomorphicLayoutEffect } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, createFactory } from 'react';
import "../styles/Navigation/ToDo's.css"
import { json } from 'react-router-dom';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


class Todos extends Component {
    constructor(props){
        super(props)
        this.state ={
            data: [],
            datafiltered: [],
            filter: false,
            selectedButton: 1
        }
    }
    
    componentDidMount = () => {
        this.fetchdata();
    }

    handleComplete = index => {
      console.log({index})
    }

    DeleteToDo = async (todoid) => {
        try{
          await fetch(`https://localhost:7008/api/ToDo/deleteTodo?id=${todoid}`,{
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              "1"
            ),
          }
          )
          .then(response =>{
            if(!response){
              throw new Error(`Fehler Staatus: ${response.status} `);
            }
            return response.json();
          })
          .then(data => {
            console.log({todoid});
            console.log('ToDoStatus erfolgreich aktualisiert:');
            if(this.filter = false){
              this.setState({filter: true});
              this.fetchdata();
            }
            this.fetchdata();           
          })
        }
        catch(error){
            console.log(`Fetching Error: ${error}`)
        }
    }

    updateToDoStaus = async (itemtodo) => {
      try{
        await fetch(`https://localhost:7008/api/ToDo/updateStatus?id=${itemtodo}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            "1"
          ),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Fehler Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log({itemtodo});
          console.log('ToDoStatus erfolgreich aktualisiert:');
        })
      }
      catch(error){
          console.log("Fetching Error", error )
      }
      this.fetchdata();
    
    }

    handleClick = (button) => {
      this.setState({ selectedButton: button });
    };

    fetchdata = async () => {
        try{
            
            var response = await fetch("https://localhost:7008/api/ToDo/gettodos?completedOnly=false");
            var response2 = await fetch("https://localhost:7008/api/ToDo/gettodos?completedOnly=true");

            var jsondatafilterd = await response2.json();
            var jsondata = await response.json();
            
            jsondata.sort((a, b) => a.id - b.id);
            jsondatafilterd.sort((a, b) => a.id - b.id);

            console.log(jsondata);
            console.log(jsondatafilterd);
            this.setState({ data: jsondata });  
            this.setState({ datafiltered: jsondatafilterd });  
        }
        catch(error){
            console.log(error);
        }
   
    }
    render() { 
        const { data, datafiltered, filter, selectedButton } = this.state;
        
        return <div className="App">
        <h1>My Todos</h1>
  
        <div className="todo-wrapper">
  
          
          <div className="btn-area">
           
            <button type="button" 
            className={`btn`}
            style={{ backgroundColor: selectedButton === 1 ? '#3F72AF' : '' }}
            onClick={() => {this.handleClick(1); this.setState({filter: false})}}
            >
            To Do
            </button>
            <button type="button" 
            className={`btn`}
            style={{ backgroundColor: selectedButton === 2 ? '#3F72AF' : '' }}
            onClick={() => {this.handleClick(2); this.setState({filter: true})}}
            >
            Completed
            </button>  
          </div>
          <div className="todo-list">
            {filter === false && 
            data.map((item) => (
                <div className="todo-list-item" key={item.ID}>
                  <div>
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>
                    <p>{item.Type}</p>
                    <p>Startdatum: {item.Startdate}</p>
                    <p>Enddatum: {item.Enddate}</p> 
                    
                  </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="delete-icon" 

                    onClick={() => this.DeleteToDo(item.ID)}
                                        
                    
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    
                    onClick={() => {
                      console.log(item.ID)
                      this.updateToDoStaus (item.ID)}}
                    
                  />
                </div>
                </div>
            ))}
            {filter === true &&
            datafiltered.map((item) => (

                <div className="todo-list-item" key={item.ID}>
                <div>
                  <h3>{item.Name}</h3>
                  <p>{item.description}</p>
                  <p> <i>{item.Type}</i></p>
                  <p>Startdatum: {item.Startdate}</p>
                  <p>Enddatum: {item.Enddate}</p> 
                </div>
                <div>
                  <AiOutlineDelete
                  title="Delete?"
                    className="delete-icon"       
                    onClick={() => this.DeleteToDo(item.ID)}
                  />
                </div>
              </div>
            ))}        
            </div> 
        </div>
    </div>
        
           
                      
        
    }
}

export default Todos;


