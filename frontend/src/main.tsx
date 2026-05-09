import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

export const authService="http://localhost:5000"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <GoogleOAuthProvider clientId="924092140247-ovouct59dckfds2rjlrs3dkecb81sbs8.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
