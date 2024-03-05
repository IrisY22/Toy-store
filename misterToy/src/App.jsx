import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import defaultImg from './assets/default-img.jpg'
import ToysList from "./components/ToysList";
import AddNewToy from './components/AddNewToy';
import { create, update } from './services/httpServices';




function App() {
  const [openModal, setOpenModal] = useState(false)
  const [selectedToy, setSelectedToy] = useState(null)

  useEffect(() => {
    if (!openModal) {
      setSelectedToy(null)
    }
  }, [openModal])

  // const [newToy, setNewToy] = useState({
  //   toyTitle: '',
  //   toyPrice: 0,
  //   img: defaultImg
  // })

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
      <div className='flex justify-end m-8'>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Toy
        </button>
      </div>
      <main>
        {openModal ? <AddNewToy onAddNewToy={handleAddNewToy} toy={selectedToy} /> : <ToysList selectedToy={selectedToy} setSelectedToy={setSelectedToy} openModal={openModal} setOpenModal={setOpenModal} handleOpenModal={handleOpenModal} />}
      </main>
    </>
  );
}

export default App;
