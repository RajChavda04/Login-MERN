import {useState} from 'react'
import {handleError, handleSuccess} from '../utils'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import config from '../config';

const Login = () => {

    const[loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

     const navigate= useNavigate();

     const handleChange=(e)=>{
        const {name,value}= e.target;
        const copyLoginInfo ={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
     }

     const handleLogin = async (e)=>{
        e.preventDefault();
        const{email, password}=loginInfo;
        if(!email || !password){
            return handleError("email and pasword are required")
        }
        try{
            const url= `${config.apiBaseUrl}/auth/login`;
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-type':"application/json"
                },
                body:JSON.stringify(loginInfo)
            });


            const result= await response.json();
             const { success, message, jwtToken, name, error } = result;
             console.log(success);
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        }catch(error){
            handleError(error);

        }
     }


    return (
        <>
            <div className="container">
                <div className="form">
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className="feilds">


                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"  value={loginInfo.email} onChange={handleChange} placeholder='Enter your eamil'></input>


                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={loginInfo.password} onChange={handleChange} placeholder='Enter your password'></input>
                        </div>


                        <div className="ask">
                     <button type="submit">Login</button>
                     <div className="data">
                        <span>Don't have account?</span>
                        <Link to="/register" >Register</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
             <ToastContainer />
        </>
    )
}

export default Login
