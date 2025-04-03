import type { LoginProps, ResponseType } from '../frontend.types';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLogin }: LoginProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [loginResponse, setLoginResponse] = useState<ResponseType>(null);

  async function userLogin() {
    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log({ user });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      if (res.ok) {
        if (emailRef.current?.value !== undefined && passwordRef.current?.value !== undefined) {
          emailRef.current.value = '';
          passwordRef.current.value = '';
        }
        setLogin(true);
        navigate('/');
      }

      const response = await res.json();
      setLoginResponse(response);
    } catch (error) {
      console.error(error);
    }
  }

  console.log({ loginResponse });

  return (
    <>
      <div>
        <input type='text' ref={emailRef} placeholder='email' />
        <input type='text' ref={passwordRef} placeholder='password' />
        <button onClick={userLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
