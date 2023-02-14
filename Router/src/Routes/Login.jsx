

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Login() {
  const [email,setEmail]=useState("eve.holt@reqres.in")
  const [password,setPassword]=useState("")
  const {loginUser}=useContext(AppContext)
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
     const payload={
      email,
      password
    }

    fetch('https://reqres.in/api/login',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(payload)
    }).then((res)=>{ return res.json()
    }).then((res)=>{
      loginUser(res.token)
      navigate("/dashboard")
    })
  }

 
  
  return (
    <div className="login-page" >
      <form className="form" data-testid="login-form" onSubmit={handleSubmit}>
        <div>
          <label>
            <input data-testid="email-input" type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <input
              data-testid="password-input"
              type="password"
              placeholder="password"
              value={password} onChange={(e)=>setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button data-testid="form-submit" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
      <div>
        <Link className="message" to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}
export default Login;
