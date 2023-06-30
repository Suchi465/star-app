import React from 'react';
import HomeSidebar from './HomePageComponent/HomeSidebar';
import './WelcomePage.css';
import {Link} from 'react-scroll';
import { FormatAlignCenter } from '@mui/icons-material';
import { EmailOutlined,Call,LocationOn,Login} from '@mui/icons-material';

import CookieConsent from "react-cookie-consent";
class Homepage extends React.Component{
    render(){
        var path1=require('../src/Image/com.jpg');
        
        return (
        <div className='home-body'>
            <CookieConsent 
   
   location="top"
   buttonStyle={{fontSize:"15px"}}
   
  > 
  This website uses cookies to enchance the user experience.</CookieConsent>

              <div className='homebar'>
                  <h3 className="head">
                 <a href = "#" className='home-link'>Home |</a>  
                 <a href = "#about" className='about-link'>About |</a> 
                 <a href = "#contact" className='contact-link'>Contact</a> 
                 <a href="/login" className='a1'><Login></Login>Login</a> 
                 </h3>
                </div>


       <marquee direction="left" height="20" bgcolor="gray"><h5>Welcome to STAR APP</h5></marquee>
<div >
    
{/* <br/><br/> */}
<div className='welcome-page'>
    {/* <div className='main-heading'>
<center><h1 >SHIFT ALLOWANCE APP</h1></center>
</div> */}
{/* <img src={path1} height="400" width="50%" align="right" className='desk-image'  />*/}
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> 
</div>
<div className='main-heading'>
    <br/><br/>
<center><h1 >SHIFT ALLOWANCE APP</h1>
<br/><br/>
<h5><i><center>Excellent hardwork never goes unrewarded....</center></i></h5><br/><br/></center>
</div>
{/* <div id="about" >
<br/><br/><br/><br/><br/><br/><br/><br/>
<center><i><h1>About</h1></i></center>
    <hr/>
        <h5>
            <div className='about-margin'>
        Teams are occasionally expected to work beyond their regular duty hours to fulfil the needs of their customers and deliver a smooth working product with in time. In order to respect the hard efforts of such employees, our company provides allowances based on their duty hours. This app is used to generate the report that provides the allowance amount that employees can avail. It takes the attendance sheet records that are given as input through MS Dynamics. The aggregated data is sent to their Respective Lead who holds the authority to approve or reject the request. Once approved, the app generates a report which can be used to avail shift allowance from the Accounts Department.
        </div>
        </h5>
</div> */}

{/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
{/* <div id="contact">
<center><i><h1>Contact</h1><hr/>

        <h6>
             muppala.suchitha@incedoinc.com</h6>
        <h6>9182842519</h6>
        <h6>Location:TamilNadu,Chennai</h6>
        </i></center>
        <br/><br/><br/><br/><br/>
</div> */}
{/* <br/><br/><br/><br/> */}


</div>




<div className="main-footer">
      <div className="container">
        <div className="row">

        <div className="col" id="about">
            <h4>About</h4>
            <div className='about-margin'>
        {/* Teams are occasionally expected to work beyond their regular duty hours to fulfil the needs of their customers and deliver a smooth working product with in time. In order to respect the hard efforts of such employees. */}
        STAR APP is a helping hand for project leads to generate Shift Allowances for team members who worked beyond their regular duty hours to fulfil the needs of their customers.
        </div>
          </div>
          {/* Column1 */}
          <div className="col">
            <h4>Incedo Technology Solutions LTD.</h4>
            <p className="list-unstyled">
              <li>Bascon Maeru</li>
              <li>Third floor,B-block</li>
              <li>Nungambakam</li>
              <li> Chennai-600034</li>
              <li>Tamil Nadu, India</li>
            </p>
          </div>
          {/* Column2 */}
          <div className="col" id="contact">
            <h4>Contact Us</h4><br/>
            <ui className="list-unstyled">
            <li><Call></Call> +91 9182842519</li>
            
              <li><EmailOutlined></EmailOutlined> <a href='mailto:muppala.suchitha@incedoinc.com'>muppala.suchitha@incedoinc.com</a></li>
              
              
            </ui>
          </div>
          {/* Column3 */}
          
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Incedo Technologies | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
            
</div>
        )        
    }
}
export default Homepage;