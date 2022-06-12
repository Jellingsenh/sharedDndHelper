import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { amber, blue, blueGrey, cyan, deepOrange, deepPurple, green, indigo, orange, red} from '@mui/material/colors';
import {ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { // roll init color
      main: red[900],
    },
    secondary: { // create character color
      main: green[800],
    },
    third: { // health color
      main: red[400],
    },
    deeppurp: { // submit edits buttons
      main: deepPurple[400],
    },
    editblue: {
      main: blue[500],
    },
    enterblue: {
      main: '#2979FF',
    },
    dmblue: {
      main: indigo[800],
    },
    deletered: {
      main: '#FF1744',
    },
    currentturn: {
      main: '#FFC107'
    },
    nextturn: {
      main: '#AB47BC',
    },
    eighth: { // soft delete red
      main: red[200],
    },
    sixth: { // other colors / misc
      main: blueGrey[300],
    },
    seventh: { // armor class color
      main: deepOrange[900],
    },
    ninth: { // init speed color
      main: cyan[200],
    },

  },
});
ReactDOM.render( 
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
