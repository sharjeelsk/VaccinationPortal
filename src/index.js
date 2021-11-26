import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {Provider} from 'react-redux'
import {store,Persister} from './components/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff8400",
    },
    secondary: {
      main: "#fff",
    },
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
         '&:focus':{
           outline:'none'
         }
        }
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
         '&:focus':{
           outline:'none'
         }
        }
      }
    }
  }
});


ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={Persister}>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </PersistGate>
    </Provider>
,
  document.getElementById('root')
);

