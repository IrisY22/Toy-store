import { useEffect, useState } from 'react'
import { getToys, removeToy } from '../services/toyServices'
import { updateUser } from '../services/userServices'



export default function ToysList({
  setSelectedToy,
  handleOpenModal,
  user,
  isAdmin,
  setUser
}) {
  const [toys, setToys] = useState([])
  const [cart, setCart] = useState([])


  useEffect(() => {
    fetchToys();
    if (user) {
      const userConnected = JSON.parse(user);
      setCart(userConnected.cart)
    }

  }, [])

  async function fetchToys() {
    try {
      const toysData = await getToys();
      setToys(toysData);
    } catch (err) {
      console.error('Failed to fetch toys:', error.message);
    }
  }

  async function onRemoveToy(id) {
    try {
      await removeToy(id);
      setToys((currToys) => {
        const updatedToys = currToys.filter((toy) => toy._id !== id)
        return updatedToys
      })

    } catch (err) {
      console.log(err);
    }
  }

  function onEditToy(id) {
    const toy = toys.find((currToy) => currToy._id === id)
    setSelectedToy(toy)
    handleOpenModal()

  }



  const onAddToCart = async (id) => {
    const userConnected = JSON.parse(user);
    const item = userConnected.cart.find((currItem) => currItem.toy._id === id)
    let updatedUser
    if (item) {
      item.quantity = item.quantity + 1;
      const updatedCart = userConnected.cart.map((currItem) => {
        if (currItem.toy._id === id) {
          return item
        }
        return currItem
      })
      setCart(updatedCart)
      updatedUser = {
        ...userConnected,
        cart: updatedCart,
      };
    }
    else {
      const toy = toys.find((currToy) => currToy._id === id);
      const itemToAdd = {
        toy,
        quantity: 1
      }
      const updatedCart = [...userConnected.cart, itemToAdd]
      setCart(updatedCart)
      updatedUser = {
        ...userConnected,
        cart: updatedCart
      }

    }
    await updateUser(userConnected._id, updatedUser);
    setUser(JSON.stringify(updatedUser));
  };


  return (
    <ul className='grid grid-cols-2 gap-y-4 justify-items-center md:grid-cols-3 gap-2 xl:grid-cols-6'>
      {
        toys.map(toy => (
          <li key={toy._id} className='flex flex-col w-52'>
            <img src={toy.image} alt={toy.title} className='h-40 rounded-xl mb-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300' />
            <div className='grid justify-items-center'>
              <h2 className='text-2xl font-bold text-blue-700'>{toy.title}</h2>
              <p className='font-bold text-blue-700'>${toy.price}</p>
              {!isAdmin && <button
                onClick={() => onAddToCart(toy._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              }
              {user && isAdmin && <div className='flex gap-2 mt-2'>
                <button
                  onClick={() => onEditToy(toy._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => onRemoveToy(toy._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              }
            </div>
          </li>
        ))
      }
    </ul>
  )
}