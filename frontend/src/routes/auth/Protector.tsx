import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore, useLoginStore, useResponseStore } from '../../store/store';

const Protector = ({ role }: { role: string }) => {
  const protectorRole = role;

  const location = useLocation();
  const setAuthorized = useAuthStore((state) => state.setAuthorized);
  const authorized = useAuthStore.getState().authorized;

  const setLogin = useLoginStore((state) => state.setLogin);
  const login = useLoginStore.getState().login;

  const setCheckTokenResponse = useResponseStore((state) => state.setCheckTokenResponse);
  const setCheckRefreshTokenResponse = useResponseStore((state) => state.setCheckRefreshTokenResponse);
  const setRequestedLocation = useLoginStore((state) => state.setRequestedLocation);

  const requestedRole = useLoginStore((state) => state.requestedRole);

  const [loading, setLoading] = useState(true);
  console.log({ loading });

  //$ refreshToken() ---------------------------------------------------

  async function refreshToken() {
    console.log('attempting to refresh token...');

    const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/auth/refresh`, {
      credentials: 'include',
    });
    if (response.ok) {
      const res = await response.json();
      setCheckRefreshTokenResponse(res);
      console.log('✅ token refreshed successfully!');
      setAuthorized(true);
    } else {
      console.log('❌ refresh failed:', response.statusText);
      setAuthorized(false);
    }
    setLoading(false);
  }

  //$ checkToken() ----------------------------------------------------

  useEffect(() => {
    async function checkToken() {
      setRequestedLocation(location.pathname);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/auth/check`, {
          credentials: 'include',
        });

        if (!response.ok) {
          // falls check einen neg res bekommt, wird refresh direkt versucht
          // console.log('access token check failed, trying to refresh...');
          await refreshToken();
        } else {
          // wenn es einen pos res gibt, wird das das expDate verglichen.
          // wenn es abgelaufen ist wird auch refresh versucht, wenn nicht ist der access token noch gültig und es geht weiter
          const res = await response.json();
          setCheckTokenResponse(res);

          const now = Date.now();
          const expDate = res.data.payload.exp * 1000;

          if (res.data.payload.exp && expDate < now) {
            console.log('access token expired, refreshing...');
            setLoading(true);
            await refreshToken();
          }
          //! ####################################################################################################################################
          //! ist das sicher genug hier einfach die role zu prüfen oder muss ich für den admin einen anderen access token erstellen und prüfen????
          //! ####################################################################################################################################
          console.log({ requestedRole });
          console.log({ protectorRole });

          if (res.data.payload.role !== protectorRole) {
            console.log(`user is not ${protectorRole}, redirecting...`);
            setAuthorized(false);
          } else {
            console.log('access token is valid');
            setAuthorized(true);
            !login && setLogin(true);
          }
        }
      } catch (error) {
        console.log('error in checkToken', error);
        setAuthorized(false);
      }
      setLoading(false);
    }
    checkToken();
  }, []);

  // -----------------------------------------------------------------------

  if (!authorized && !loading) {
    return <Navigate to={'/login'} />;
  }

  if (loading) {
    return (
      <main>
        <div>
          <span>loading...</span>
        </div>
      </main>
    );
  }

  return <Outlet />;
};

export default Protector;
