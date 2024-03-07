
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

import { create, update } from '../services/toyServices';
import ToysList from "./ToysList";
import AddNewToy from './AddNewToy';
import Login from './Login';

export default function ToyIndex() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [selectedToy, setSelectedToy] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogin, setIsLogin] = useState('Login')
  const [user, setUser] = useState(localStorage.getItem('user'))

  useEffect(() => {
    if (user) {
      const userConnected = JSON.parse(user);
      setIsAdmin(userConnected.isAdmin)
      setIsLogin('Logout')
    }
  }, [user])

  useEffect(() => {
    if (!openModal) {
      setSelectedToy(null)
    }
  }, [openModal])

  function handleOpenModal() {
    setOpenModal((isOpen) => !isOpen)
  }


  async function handleAddNewToy(title, price, image) {
    try {
      const toyData = {
        title,
        price,
        image
      }
      if (!selectedToy) {
        await create(toyData)
      } else {
        await update(selectedToy._id, toyData)
      }
      setOpenModal(false)
    } catch (err) {
      console.log(err);
    }
  }

  // function handleOpenLoginModal() {
  //   setOpenLogin(true)
  // }

  function handleOpenLoginModal() {
    if (user) {
      setIsLogin('Login')
      localStorage.clear();
    } else {
      setOpenLogin(true)
    }
  }

  function handleCloseModal() {
    setOpenLogin(false)
  }

  function handleNavigateToCart() {
    navigate('/cart');
  }
  return (
    <>
      <div className='flex justify-end m-8'>
        <button onClick={() => handleOpenLoginModal()}>{isLogin}</button>
        {openLogin && <Login onClose={handleCloseModal} />}
        <div>
        </div>
        <div className='flex justify-end m-8'>
          {!isAdmin && <button
            onClick={handleNavigateToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          }
          {user && isAdmin && <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Toy
          </button>
          }
        </div>

      </div>
      <main>
        {openModal
          ?
          <AddNewToy onAddNewToy={handleAddNewToy} toy={selectedToy} />
          :
          <ToysList
            setSelectedToy={setSelectedToy}
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleOpenModal={handleOpenModal}
            isAdmin={isAdmin}
            user={user}
            setUser={setUser}
          />}
      </main>
    </>
  );
}
