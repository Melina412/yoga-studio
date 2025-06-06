import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore, useResponseStore } from '../../store/store';

const Login = () => {
  // Zustand States
  const setLogin = useLoginStore((state) => state.setLogin);
  const setLoginResponse = useResponseStore((state) => state.setLoginResponse);
  const desiredRole = useLoginStore((state) => state.desiredRole);

  // React Hooks
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function userLogin() {
    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    // console.log({ user });

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
        clearInput();
        const response = await res.json();

        setLoginResponse(response);
        setLogin(true);

        if (response.data.role === desiredRole) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function clearInput() {
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  }

  return (
    <>
      <div>
        <input type='text' ref={emailRef} placeholder='email' />
        <input type='password' ref={passwordRef} placeholder='password' />
        <button onClick={userLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
