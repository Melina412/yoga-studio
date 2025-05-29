import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { useLoginStore } from '../store/store';

const NavBar = () => {
  const login = useLoginStore((state) => state.login);
  return (
    <>
      {/* <nav>
        <div className='flex justify-center'>
          <NavLink to='/login'>Login</NavLink>
        </div>
        <div className='flex justify-center'>
          <NavLink to='/register'>Register</NavLink>
        </div>
        <div className='flex justify-center'>
          <Logout />
        </div>
        <div className='flex justify-center'>
       
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </div>
      </nav> */}

      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          {/* Navbar */}
          <div className='navbar bg-base-300 w-full'>
            <div className='flex-none lg:hidden'>
              <label htmlFor='my-drawer-3' aria-label='open sidebar' className='btn btn-square btn-ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block h-6 w-6 stroke-current'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                </svg>
              </label>
            </div>
            <div className='mx-2 flex-1 px-2'>
              <NavLink to='/'>Yoga Studio</NavLink>
            </div>
            <div className='hidden flex-none lg:block'>
              <ul className='menu menu-horizontal'>
                {/* Navbar menu content here */}

                <li>
                  <div className='flex justify-center'>
                    <NavLink to='/about'>About</NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex justify-center'>
                    {login ? <NavLink to='/dashboard'>Dashboard</NavLink> : <NavLink to='/register'>Register</NavLink>}
                  </div>
                </li>

                <li>
                  <div className='flex justify-center'>{login ? <Logout /> : <NavLink to='/login'>Login</NavLink>}</div>
                </li>
                <li>
                  <div className='flex justify-center'>
                    <NavLink to='/admin'>Admin</NavLink>
                  </div>
                </li>
                <li>
                  <div className='flex justify-center'>
                    <NavLink to='/timetable'>Timetable</NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          {/* es ist egal ob der content hier steht oder nicht, beim öffnen der nav bleibt der content immer im hinbtergrund */}
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-3' aria-label='close sidebar' className='drawer-overlay'></label>
          <ul className='menu bg-base-200 min-h-full w-80 p-4'>
            {/* Sidebar content here */}

            <li>
              <div className='flex justify-center'>
                <NavLink to='/about'>About</NavLink>
              </div>
            </li>

            <li>
              <div className='flex justify-center'>
                {login ? <NavLink to='/dashboard'>Dashboard</NavLink> : <NavLink to='/register'>Register</NavLink>}
              </div>
            </li>

            <li>
              <div className='flex justify-center'>{login ? <Logout /> : <NavLink to='/login'>Login</NavLink>}</div>
            </li>

            <li>
              <div className='flex justify-center'>
                <NavLink to='/admin'>Admin</NavLink>
              </div>
            </li>
            <li>
              <div className='flex justify-center'>
                <NavLink to='/timetable'>Timetable</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
