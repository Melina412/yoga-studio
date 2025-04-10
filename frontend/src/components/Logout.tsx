import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';

function Logout() {
  // Zustand States
  const setLogin = useAuthStore((state) => state.setLogin);

  // React Hooks
  const navigate = useNavigate();

  async function userLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      //   const response = await res.json();
      //   console.log(response.message);

      if (res.ok) {
        setLogin(false);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <button className='btn btn-warning btn-outline' onClick={() => userLogout()}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Logout;
