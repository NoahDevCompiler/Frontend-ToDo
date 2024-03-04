import React, { Component } from 'react';
import {
    BrowserRouter,
    Routes, 
    Route,
  } from "react-router-dom";
import Navbar from './components/nav';
import Start from './components/Carousel';
import AppRoutes from './AppRoute';


class App extends Component {
    state = {  } 
    render() { 
        return (
        <BrowserRouter>
            <React.Fragment>
               <Navbar/>
                <Routes>
                {AppRoutes.map((route, index) =>{
                const { element, ...rest } = route;
                return <Route key={index}{...rest} element={element} />
               })}
               </Routes>
                  
           </React.Fragment>   
        </BrowserRouter>    
        )
        
    }
}
 
export default App;