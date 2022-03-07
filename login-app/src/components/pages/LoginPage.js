import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function SignInPage() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitAction(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/login', { email, password })
        .then(function (resp) {
          window.localStorage.setItem("token", JSON.stringify(resp.data.message));
          history.push('/home');
        }).catch(function (error) {
          alert(error.response.data.message)
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container text-center m-5-auto">
      <h2>Log in to your account</h2>
      <form className="mt-3 offset-2 col-8" onSubmit={submitAction}>
        <div class="form-group">
          <label for="EmailInput">Email address</label>
          <input type="email" class="form-control" id="EmailInput" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="PasswordInput">Password</label>
          <input type="password" class="form-control" id="PasswordInput" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
       
      </form>
    </div>
  )
}
