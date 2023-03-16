
import Welcome from './components/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Add from './components/Add';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/admin/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
