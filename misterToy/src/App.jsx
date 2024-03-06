import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import ToysList from "./components/ToysList";
import AddNewToy from './components/AddNewToy';
import Login from './components/Login';
import { create, update } from './services/toyServices';




function App() {
  const [openModal, setOpenModal] = useState(false)
  const [selectedToy, setSelectedToy] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setIsAdmin(user.isAdmin)
    }
  }, [])

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



  return (
    <>
      <  Login />
      <div className='flex justify-end m-8'>

        {isAdmin && <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Toy
        </button>
        }

      </div>
      <main>
        {openModal
          ?
          <AddNewToy onAddNewToy={handleAddNewToy} toy={selectedToy} />
          :
          <ToysList setSelectedToy={setSelectedToy} openModal={openModal} setOpenModal={setOpenModal} handleOpenModal={handleOpenModal} />}
      </main>
    </>
  );
}

export default App;
