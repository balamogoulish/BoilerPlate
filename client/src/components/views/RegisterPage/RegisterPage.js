import React, { useState,props } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); //버튼이 눌릴 때마다 페이지가 refresh되는 것을 방지함
        
    if(Password === ConfirmPassword){ //비밀번호가 일치한 경우
      let body = {
        email: Email,
        name: Name,
        password: Password
      }
      dispatch(registerUser(body))
      .then(response=>{
        if(response.payload.success){
          navigate('/login')
          alert('Success to sign up!!')
        }else{
          alert('Failed to sign up...')
        }
      })
    } else{
      alert('비밀번호가 일치하지 않습니다.')
    }
  }
  return(
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
    }}>
        <form style={{display: 'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type='email' value={Email} onChange={onEmailHandler}/>
            <label>Name</label>
            <input type='text' value={Name} onChange={onNameHandler}/>
            <label>Password</label>
            <input type='password' value={Password} onChange={onPasswordHandler}/>
            <label>Password Confirm</label>
            <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button>Sign Up</button>
        </form>
    </div>
)
}

export default RegisterPage