import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // React Hooks
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function userRegister() {
    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      displayName: displayNameRef.current?.value,
    };
    // console.log({ user });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      if (res.ok) {
        const response = await res.json();
        console.log(response);
        clearInput();
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function clearInput() {
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
    if (displayNameRef.current) displayNameRef.current.value = '';
  }

  return (
    <>
      <div>
        <input type='text' ref={emailRef} placeholder='email' />
        <input type='password' ref={passwordRef} placeholder='password' />
        <input type='text' ref={displayNameRef} placeholder='username' />

        <button onClick={userRegister}>Register</button>
      </div>
    </>
  );
};

export default Register;
