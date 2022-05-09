import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import "./Login.css"



function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const handleChangeemail=(e:any)=>{
        setEmail(e.target.value)
       
    }
    const handleChangepassword=(e:any)=>{
        setPassword(e.target.value)

    }
    const handleSubmit=(e:any)=>{
    
        
        const credential={email, password}
        console.log(credential)
        Axios.post('http://localhost:3000/login',credential)
     .then(response =>console.log(response.data))
     e.preventDefault()
    }


return<div>
<form onSubmit={handleSubmit}>
    <label htmlFor="email">Email</label>
    <input type ="email"  id="email" onChange={handleChangeemail}/>
    <label htmlFor="password" >password</label>
    <input type="password" id="password" onChange={handleChangepassword}/>
    {/* <input type="submit" id="submit" onClick={handleSubmit}/> */}
    <button type="submit">Submit</button>
    </form>
</div>
}
export default Login
