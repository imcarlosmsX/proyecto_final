import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Register} from './pages/register';
import {Login} from './pages/login';
import {Navigation} from './components/navigation';
import {Toaster} from 'react-hot-toast';
import {Pedido} from './pages/pedido';
import {Compra} from './pages/compra';
import {InfoPedido} from './pages/info_pedido';
import {Cocina} from './pages/cocina';
import {LoginDomiciliario} from './pages/login_domiciliario';
import {PedidoDomiciliario} from './pages/pedido_domiciliario';
import {Tendencia} from './pages/tendencia';


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
        <Route path="/info_pedido" element={<InfoPedido/>} />
        <Route path="/cocina" element={<Cocina/>} />
        <Route path="/login-domiciliario" element={<LoginDomiciliario/>} />
        <Route path="/pedido-domiciliario" element={<PedidoDomiciliario/>} />
        <Route path="/tendencia" element={<Tendencia/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}
export default App