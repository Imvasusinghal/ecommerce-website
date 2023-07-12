import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>     //CREATING NESTED ROUTES
        <Route path='' element={<Dashboard />}/>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path='/policy' element={<Policy />}/>
      {/* THIS '*' INDICATES THAT IF ABOVE NOT FOUND THEN PRINT PAGE NOT FOUND */}
      <Route path='*' element={<Pagenotfound />}/>    
    </Routes>
    </>
  );
}

export default App;
