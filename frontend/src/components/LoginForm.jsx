import React, { useState } from 'react' 
import axios from 'axios'
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


export default function LoginForm({setIsLoggedIn}) {
const [isLogin, setIsLogin] = useState(true);
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

 
const handleLogin = async (e) => {
    e.preventDefault();
    if(userName && password){
      const userData = {
        userName, password
      }
      console.log(userData);
      try {
        const response = await axios.post("http://localhost:5000/login", userData)
        console.log(response.data);
        if(response.status===200){
            console.log("Login Sucessful")
            setUserName("")
            setPassword("")
            toast.success("Login Sucessful");
            localStorage.setItem("username", userName)
            setIsLoggedIn(true)
            navigate("/home")
        }
      }
      catch(err){
        toast.error("Invalid Username and Password!");
      }
    } else {
      toast.error("Enter the Username and Password!");
    }
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="box w-25 m-5 p-2 border border-2 border-light ">
      <div className="btn-group d-flex justify-content-center align-items-center mb-5" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
        <label className="btn btn-outline-primary" htmlFor="btnradio1" onClick={()=> {setIsLogin(true)}}>Login</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="btnradio2" onClick={()=> {setIsLogin(false)}}>Register</label>
      </div>
          {isLogin && (<form onSubmit={handleLogin}>
            <div className="form-group d-flex flex-column align-items-center">
              <label htmlFor="exampleInputEmail1" className='p-2'>Username</label>
              <input type="text" className="form-control w-100 mb-5" id="exampleInputEmail1" autoComplete='off' aria-describedby="emailHelp" placeholder="Enter your Username" value={userName} 
              onChange={(e) => {
                setUserName(e.target.value)
              }}/>
            </div>
            <div className="form-group d-flex flex-column align-items-center">
              <label htmlFor="exampleInputPassword1" className='p-2'>Password</label>
              <input type="password" className="form-control w-100  mb-5" id="exampleInputPassword1" autoComplete='off' placeholder="Enter your Password" value={password} 
              onChange={(e) => {
                setPassword(e.target.value)
              }} />
            </div>
            <div className="d-flex justify-content-center w-100">
            <button type="submit" className="btn btn-primary w-50">Submit</button>
            </div>
          </form>)}
          {!isLogin && <RegisterForm/>}
      </div>
    </div>
  )
}
