import React, { useState } from 'react'
import './Join.css'
import logo from '../../images/images.jpg'
import { Link } from 'react-router-dom'

let user;

const Join = () => {

   const [name, setname] = useState("");

    const sendUser = () => {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = '';
    }

  return (
    <div className='JoinPage'>
     <div className='JoinContainer'>
        <h1>Live Chat</h1>
        <img src={logo} alt='logo'/>
        <input onChange={(e)=>setname(e.target.value)} type='text' placeholder='Enter Your Name' id='joinInput'/>
       <Link onClick={(e)=> !name ? e.preventDefault() : null} to="/chat"> <button onClick={sendUser} className='joinbtn'>Login</button></Link>
     </div>
    </div>
  )
}

export default Join
export {user}
