
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  );
}

export default App;
