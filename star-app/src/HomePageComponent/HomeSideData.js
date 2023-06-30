import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import {BiLogInCircle} from 'react-icons/bi';
import {FcAbout} from 'react-icons/fc';
import {MdContactSupport} from 'react-icons/md';
export const HomeSidebardata=[
    {
        title:"Home",
        path:'/',
        icon:<AiFillHome/>,
        className:'nav-text'

    },
    {
        title:"Login",
        path:'/login',
        icon:<BiLogInCircle/>,
        className:'nav-text'

    }
,
{
    title:"About",
    path:'/about',
    icon:<FcAbout/>,
    className:'nav-text'

},
{
    title:"Contact",
    path:'/contact',
    icon:<MdContactSupport/>,
    className:'nav-text'

}



];