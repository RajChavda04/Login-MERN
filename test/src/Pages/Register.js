import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


const Register = () => {

 const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    })

     const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async(e)=>{
      e.preventDefault();
      const {name,email,phone, address,password} = signupInfo;

      if(!name||!email || !password || !phone || !address){
        return handleError("name, email , passowrd, address, phone are required")
      } try{
        const url=`http://localhost:8080/auth/register`
        const response = await fetch(url,{
          method:"POST",
        headers:{
          "Content-type":'application/json'
        },
          body:JSON.stringify(signupInfo)
      });

      const result= await response.json();
      const {success, message, error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/login")
        },1000)

      }else if(error){
          const details = error?.details[0].message;
          handleError(details);

      }else if(!success){
        handleError(message);
      }
      console.log(result);
      }catch (error){
        handleError(error)
      }

    }



  return (
    <>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSignup}>
            <h1>Register</h1>
            <div className="feilds">
              <label htmlFor="name">User Name</label>
              <input type="text" name="name" value={signupInfo.name}  onChange={handleChange} placeholder='Enter your name'></input>

              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={signupInfo.email}  onChange={handleChange} placeholder='Enter your eamil'></input>

              <label htmlFor="phone">Phone No</label>
              <input type="text" name="phone" value={signupInfo.phone}  onChange={handleChange} placeholder='Enter your phone no'></input>

              <label htmlFor="address">Address</label>
              <input type="text" name="address" value={signupInfo.address}  onChange={handleChange} placeholder='Enter your address'></input>

              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={signupInfo.password}  onChange={handleChange} placeholder='Enter your password'></input>

            </div>
            <div className="ask">
              <button type="submit">Register</button>
              <div className="data">
                <span>You have already account?</span>
                <Link to="/" >Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
       <ToastContainer />
    </>
  )
}

export default Register
