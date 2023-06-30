import logo from './logo.svg';
import './App.css';
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import Signup from './components/Signup/signup';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import ForgotPwd from './components/ForgotPwd';
import Homepage from './WelcomePage';
import Contact from './HomePageComponent/Contact'
import About from './HomePageComponent/About';
import UserPage from './components/UserPage'
import EditProfile from './components/EditProfile';
import ViewStatus from './components/ViewStatus';
import UserManagement from './components/UserManagement';
import DeleteUser from './components/DeleteUser';
import Usersrequest from './components/Usersrequest';
import Profile from './components/Profile';
import ChangePwd from './components/ChangePwd';
import UserDeveloper from './components/UserDeveloper';
import UploadAttendance from './components/UploadAttend';
import ViewReport from './components/ViewReport';
import VerifyEmail from './components/VerifyEmail';
import OtpPwd from './components/OtpPwd';
function App() {
  return (
    // <div className="App">
    <Router>
    
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path="/signup" element={<Signup />}></Route>
     
        <Route path='/login' element={<Login/>}/>   
        <Route path='/forgotPassword' element={<ForgotPwd/>}/> 
        <Route path='/userpage' element={<UserPage/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/>
        <Route path='/usermanagement' element={<UserManagement/>}/>
        <Route path='/deleteUser' element={<DeleteUser/>}/>
        <Route path='/newusersrequest' element={<Usersrequest/>}/>
        <Route path='/viewstatus' element={<ViewStatus/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/changePwd' element={<ChangePwd/>}/>
        <Route path='/changePwd' element={<ChangePwd/>}/>
        <Route path='/developer' element={<UserDeveloper/>}/>
        <Route path='/Leadupload' element={<UploadAttendance/>}/>
        <Route path='/view' element={<ViewReport/>}/>
        <Route path='/verifyemail' element={<VerifyEmail/>}/>
        <Route path='/pwdforgot' element={<OtpPwd/>}/>
      </Routes>
    </Router>
    // </div>
  );
}
export default App;
