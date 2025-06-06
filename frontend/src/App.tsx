import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import debugStore from './store/debug';
import Fallback from './components/error/RenderFallback';
// import DummyErrorComponent from './components/error/DummyErrorComponent';

import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import About from './routes/About';
import Notice from './routes/Notice';
import Contact from './routes/Contact';
import Timetable from './routes/Timetable';
import NotFound from './routes/NotFound';
import Admin from './routes/auth/Admin';
import Protector from './routes/auth/Protector';
import Staff from './routes/auth/Staff';
import CustomerDashboard from './routes/auth/CustomerDashboard';

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        {/* <DummyErrorComponent /> */}
        <div className='flex justify-center p-2 bg-zinc-600'>
          <button onClick={() => debugStore()} className='btn btn-sm btn-warning'>
            Debug states
          </button>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/notice' element={<Notice />} />
            <Route path='/timetable' element={<Timetable />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/*' element={<NotFound />} />

            <Route element={<Protector role='admin' />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
            <Route element={<Protector role='staff' />}>
              <Route path='/staff' element={<Staff />} />
            </Route>
            <Route element={<Protector role='customer' />}>
              <Route path='/dashboard' element={<CustomerDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
