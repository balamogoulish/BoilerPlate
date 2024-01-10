import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); //버튼이 눌릴 때마다 페이지가 refresh되는 것을 방지함
        
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
      .then(response=>{
        if(response.payload.loginSuccess){
          navigate('/')
          alert('Success to login!!')
        }else{
          alert('Failed to login...')
        }
      })
    }

    return(
        <div style={{
            display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>로그인 페이지</h2>
            <form style={{display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage