import React, { Component } from 'react';
import Start from './../Carousel';
import { Link } from 'react-router-dom';
import './../styles/Carousel.css'
 
class Index extends Component {
    state = {  } 
    render() { 
        return (

        <div>
            <div className='GetStarted'>
                
                <Link className='btn' to="/register"> Get Started</Link>
                
            </div>
            <Start />
        </div>
        
        );
    }
}
 
export default Index;