import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Register} from './pages/register';
import {Login} from './pages/login';
import {Navigation} from './components/navigation';

function App() {
  return (

    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to='/login'/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App