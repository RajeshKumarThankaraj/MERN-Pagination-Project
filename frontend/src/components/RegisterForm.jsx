import axios from 'axios'
import React,{useState} from 'react'
import { toast } from 'react-toastify'

 const RegisterForm = () => {

    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        confirmPassword: ""
    })

    const {
        userName, password, confirmPassword
    } = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        if(password === confirmPassword && password && userName){
            const response = await axios.post("http://localhost:5000/register", {
            userName, password
        })
        if (response.status===200){
            setFormData({
                userName: "",
                password: "",
                confirmPassword: ""
            })
            toast.success("User Registered sucessfully!")
        }
        } else {
            toast.error("Please enter all fields!")
        }
    }

  return (
    <div>
        <form onSubmit={handleRegistration}>
            <div className="form-group d-flex flex-column align-items-center">
              <label htmlFor="exampleInputEmail1" className='p-2'>Username</label>
              <input type="text" className="form-control w-100 mb-5" id="exampleInputEmail1" autoComplete='off' name="userName" aria-describedby="emailHelp" placeholder="Enter your Username" value={userName} onChange={handleChange}/>
            </div>
            <div className="form-group d-flex flex-column align-items-center">
              <label htmlFor="exampleInputPassword1" className='p-2'>Password</label>
              <input type="password" className="form-control w-100  mb-5" id="exampleInputPassword1" autoComplete='off' name="password" placeholder="Enter your Password" value={password} onChange={handleChange}/>
            </div>
            <div className="form-group d-flex flex-column align-items-center">
              <label htmlFor="exampleInputPassword1" className='p-2'>Confirm Password</label>
              <input type="password" className="form-control w-100  mb-5" id="exampleInputPassword2" name="confirmPassword" autoComplete='off' placeholder="Enter your Password" value={confirmPassword} onChange={handleChange}/>
            </div>
            <div className="d-flex justify-content-center w-100">
            <button type="submit" className="btn btn-primary w-50">Submit</button>
            </div>
          </form>
    </div>
  )
}

export default RegisterForm;