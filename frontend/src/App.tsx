import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './routes/Login';
import Home from './routes/Home';

function App() {
  const [login, setLogin] = useState(false);
  console.log({ login });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setLogin={setLogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
