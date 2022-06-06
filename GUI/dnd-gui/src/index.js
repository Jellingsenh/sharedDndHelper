import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route
} from "react-router-dom";
import { amber, blue, blueGrey, brown, deepPurple, green, lightBlue, red} from '@mui/material/colors';
import {ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[400],
    },
    secondary: {
      main: green[800],
    },
    third: {
      main: red[400],
    },
    fourth: {
      main: blue[400],
    },
    fifth: {
      main: lightBlue[400],
    },
    sixth: {
      main: blueGrey[300],
    },
    seventh: {
      main: brown[400],
    },
    eighth: {
      main: red[200],
    },
    ninth: {
      main: lightBlue[200],
    },
    tenth: {
      main: amber[400],
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
