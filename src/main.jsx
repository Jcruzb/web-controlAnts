import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CssBaseline, createTheme } from '@mui/material'
import { AuthContextProvider } from './Contexts/AuthContext.jsx'

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
  <HashRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </HashRouter>
  </ThemeProvider>
)
