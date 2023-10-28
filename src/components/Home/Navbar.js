import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return(
  <div className=' flex flex-row items-center gap-10'>
  <div>Navbar</div>
  <Link to={"/login"}><button>Login</button></Link>
  <Link to={"/signup"}><button>Signup</button></Link>
  </div>
  );
}

export default Navbar

// yaha ek acchi si navbar bana jisme ek logo ho aur login , signup, verification wale 3 buttons ho
