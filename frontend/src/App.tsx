import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import debugStore from './store/debug';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='flex justify-center'>
          <button onClick={() => debugStore()} className='btn btn-sm btn-warning'>
            Debug
          </button>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
