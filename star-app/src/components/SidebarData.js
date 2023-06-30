import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import {BsPersonFill} from 'react-icons/bs';
import {GoRequestChanges} from 'react-icons/go';
import {HiDocumentReport} from 'react-icons/hi';
import {GrDocumentUpdate} from 'react-icons/gr';
import {RiArrowDownSFill} from 'react-icons/ri';
import {RiArrowUpSFill} from 'react-icons/ri';
import {AiOutlineUserDelete} from 'react-icons/ai';
import {RiLogoutCircleFill} from 'react-icons/ri';
export const SidebarData=[
    {
        title:"Home",
        path:'/profile',
        icon:<AiFillHome/>,
        className:'nav-text'

    },
    {
        title:"Edit Profile",
        path:'/editprofile',
        icon:<BsPersonFill/>,
        className:'nav-text'


    },
    {
        title:"Change Password",
        path:'/changePwd',
        icon:<BsPersonFill/>,
        className:'nav-text'


    },
    {
        title:"Change Access Level/Status",
        path:'#',
        icon:<BsPersonFill/>,
        className:'nav-text',
        iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
        subNav:[{
            title:"update role",
            path:'/usermanagement',
            icon:<GrDocumentUpdate/>
        },
       {
            title:"Delete User",
            path:'/deleteUser',
            icon:<AiOutlineUserDelete/>
        },
        
    ]

    },
    
{
    title:"New Users Request",
    path:'/newusersrequest',
    icon:<GoRequestChanges/>,
    className:'nav-text'

},
{
    title:"View Status",
    path:'/viewstatus',
    icon:<HiDocumentReport/>,
    className:'nav-text'

},
{
    title:"Logout",
    path:'/',
    icon:<RiLogoutCircleFill/>,
    className:'nav-text'

}



];