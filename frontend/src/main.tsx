import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';
import 'leaflet/dist/leaflet.css';
import { SocketProvider } from './context/SocketContext.tsx';

export const authService="https://zwigato-auth.onrender.com"
export const restService="https://restaurant-service-hqee.onrender.com"
export const utilsService="https://utils-service-um03.onrender.com"
export const realtimeService="https://realtime-service-1ccn.onrender.com"
export const riderService="https://rider-service-lsmu.onrender.com"
export const adminService="https://admin-service-mptn.onrender.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <GoogleOAuthProvider clientId="924092140247-ovouct59dckfds2rjlrs3dkecb81sbs8.apps.googleusercontent.com">
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </GoogleOAuthProvider>;
  </StrictMode>,
)
