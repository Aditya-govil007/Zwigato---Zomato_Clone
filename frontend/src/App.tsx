import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import SelectRole from './pages/SelectRole';
import Navbar from './components/Navbar';
import Account from "./pages/Account";
import { useAppData } from './context/AppContext';
import Restaurant from './pages/Restaurant';
import { Toaster } from 'react-hot-toast';
import RestaurantPage from './pages/RestaurantPage';

const App = () => {
  const {user}=useAppData()

  if(user && user.role==="Seller"){
    return <Restaurant/>
  }
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path="/login" element={<Login/>}/>
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
        <Route path="/select-role" element={<SelectRole/>}/>
        <Route path="/account" element={<Account />} />
        {/* <Route path="/restaurant/:id" elemen t={<RestaurantPage />} /> */}
      </Route>
    </Routes>
    <Toaster/>
    </BrowserRouter>

    </>
  );
};

export default App
