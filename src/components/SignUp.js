import React, { useState } from 'react'
import { useHistory } from 'react-router';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let history=useHistory();

    const handleChange=(e)=>{
        
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
      }
      const handleSubmit=async (e)=>{
        e.preventDefault();
        let payload={
            "email":credentials.email,
            "password":credentials.password,
            "name":credentials.name
          }
        const response=await fetch('http://localhost:5000/api/auth/createUser',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify(payload)
          })

        const responseJson=await response.json();
        console.log("responsejson",responseJson);
        if (responseJson.success) {
            console.log("saved token",localStorage.getItem('token'));
            history.push("/login")
            props.showAlert("Account created Successfully","success");

            
        } else {
            props.showAlert("Invalid Credentials","danger");
        }
    }
    return (
        <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={credentials.email}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
  
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={handleChange}
            value={credentials.name}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={handleChange}
            value={credentials.password}
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            onChange={handleChange}
            value={credentials.cpassword}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary"  >
          Submit
        </button>
      </form>
    </div>
    )
}

export default SignUp
