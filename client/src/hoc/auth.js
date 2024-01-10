import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

const Auth = (SpecificComponent, option, adminRoute = null) => {

    function AuthenticationCheck(props) {
      const dispatch = useDispatch();
      const navigate = useNavigate();
  
      useEffect(() => {
        dispatch(auth()).then((res) => {
            if(!res.payload.isAuth){ //로그인하지 않은 상태
                if(option){ //로그인한 사람만 들어갈 수 있음 => 못 감!!
                    navigate('/login')
                }
            } else { //로그인한 상태
                if(adminRoute && !res.payload.isAdmin){ //admin만 들어갈 수 있는데 admin이 아닌 경우
                    navigate('/')
                } else if(!option){ //로그인한 유저가 출입 불가능한 페이지
                    navigate('/')
                }
            }
        });
      }, []);
  
      return <SpecificComponent />;
    }
  
    return AuthenticationCheck;
  };
  export default Auth;