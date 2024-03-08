import ReactDOM from 'react-dom/client'
import { StrictMode } from "react";
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider, createTheme  } from '@mui/material/styles'; 
import { CssBaseline } from '@mui/material'
import { AuthContextProvider } from './Contexts/AuthContext.jsx'

const theme = createTheme();



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>
)
