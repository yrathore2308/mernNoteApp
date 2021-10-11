import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let history=useHistory();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let payload={
            "email":credentials.email,
            "password":credentials.password
          }
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            //   'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NmI3M2QyMmI1NDg2NDQ2NDFlOTYzIn0sImlhdCI6MTYzMzA4ODYyMX0.gba3-VDyNcwKLH6anL3zLcgsPWo2HEZVgGRylo_iuA8'
            },
            body:JSON.stringify(payload)
          })

        const responseJson=await response.json();
        console.log("responsejson",responseJson);
        if (responseJson.success) {
            localStorage.setItem('token',responseJson.authtoken);
            console.log("saved token",localStorage.getItem('token'));
            history.push("/");
            props.showAlert("Logged In Successfully","success");

            
        } else {
            props.showAlert("Invalid credentials","danger");

        }
    }
    const handleChange=(e)=>{
        
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
      }
  return (
    <div className="container my-5">
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
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
          />
        </div>
        
        <button type="submit" className="btn btn-primary"  >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
