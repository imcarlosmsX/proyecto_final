import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Register} from './pages/register';
import {Login} from './pages/login';
import {Navigation} from './components/navigation';
import {Toaster} from 'react-hot-toast';
import {Pedido} from './pages/pedido';
import {Compra} from './pages/compra';

function App() {
  return (

    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to='/login'/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/compra" element={<Compra/>} />
        <Route path="/pedido" element={<Pedido/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}
export default App