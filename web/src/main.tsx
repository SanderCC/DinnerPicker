import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {SnackbarProvider} from "notistack";
import {NotificationProvider} from "./context/NotificationContext.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <SnackbarProvider autoHideDuration={5000} maxSnack={5} preventDuplicate={true}
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
              <NotificationProvider>
                  <AuthProvider>
                      <BrowserRouter>
                          <App/>
                      </BrowserRouter>
                  </AuthProvider>
              </NotificationProvider>
          </SnackbarProvider>
      </ThemeProvider>
  </StrictMode>,
)
