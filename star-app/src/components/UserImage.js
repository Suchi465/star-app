import React,{useState} from "react"
// import 'font-awesome/css/font-awesome.min.css';

function UserImage()
{
    const [alphabet,setAlhpabet]=useState('https://robohash.org/d.png');


    function randomAlpha() //get random alphabets to pass as path to robodash
    {
      var alphabets="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      var res="";
      for(var i=0;i<1;i++)
      {
              res=alphabets.charAt(Math.floor(Math.random()*alphabets.length));

      }
      console.log(res);
      
      setAlhpabet("https://robohash.org/"+res+".png");


  }
    return ( 

        <div>
             <div class="image">
             <img src={alphabet} class="profileImg" alt="avatar"></img>
        </div>

        <i className="fa fa-refresh" onClick={randomAlpha}></i>
        </div>
    );
}
export default UserImage;