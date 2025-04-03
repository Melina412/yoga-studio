import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './routes/Login';

function App() {
  const [login, setLogin] = useState(false);
  console.log({ login });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Landingpage Yoga Studio</h1>} />
          <Route path='/login' element={<Login setLogin={setLogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
