import React, { Component } from 'react';
import Todos from './components/Navigation/ToDo\'s';
import GetStarted from './components/Navigation/GetStarted'
import Index from './components/Navigation/index';
import CreateNew from './components/Navigation/Create New';
import Pricing from './components/Navigation/Pricing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


const AppRoutes = [
    {
       index: true,
       path: '//',
       element: <Index />
    },
    {
        path: '/to-dos/' ,
        element:<Todos />
    },
    {
        path: 'getstarted/' ,
        element: <GetStarted />
    },
    {
        path: 'createnew',
        element: <CreateNew />
    },
    {
        path: 'pricing',
        element: <Pricing/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    }
    
];
 
export default AppRoutes;