import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ToyIndex from './components/ToyIndex';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<ToyIndex />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}


export default App;
