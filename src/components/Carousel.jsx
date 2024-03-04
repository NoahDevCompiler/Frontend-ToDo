import React, { Component, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import './styles/Carousel.css'
import { Carousel } from 'react-bootstrap';




class Start extends Component {
    state = {  } 
    render() { 
        return  <Carousel interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Pics/title1.jpg"          
          />
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./Pics/title2.jpg"
          />
          </Carousel.Item>
        
      </Carousel>
    }
}
 
export default Start;