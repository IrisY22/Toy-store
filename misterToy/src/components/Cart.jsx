import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/userServices';

export default function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cart, setCart] = useState(user?.cart);

  function totalPrice() {
    let total = 0
    cart.forEach(item => {
      total += item.toy.price * item.quantity
    })
    return total
  }


  async function removeItem(item) {
    let updatedCart = []
    cart.forEach((cartItem) => {
      if (cartItem.toy._id === item.toy._id) {
        if (cartItem.quantity > 1) {
          updatedCart.push({ ...cartItem, quantity: cartItem.quantity - 1 })
        }
      }
      else {
        updatedCart.push(cartItem)
      }

    })

    setCart(updatedCart);
    const updatedUser = { ...user, cart: updatedCart };
    await updateUser(user?._id, updatedUser);
    setUser(updatedUser);
  };

  function backToHomePage() {
    navigate('/');
  }

  if (!cart) return <div>Loading...</div>;

  return (
    <>
      <button onClick={backToHomePage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Back
      </button>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {cart.map(cartItem => (
          <div key={cartItem.toy._id} className="grid grid-cols-1 gap-2 border p-4">
            <button onClick={() => removeItem(cartItem)} className="flex justify-end">Remove</button>
            <div className="flex items-center">
              <img src={cartItem.toy.image} alt={cartItem.toy.title} className="w-40 h-30 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{cartItem.toy.title}</h3>
                <p className="text-lg">${cartItem.toy.price} x {cartItem.quantity}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="text-xl mt-4">Total Price: <span className="font-semibold">${totalPrice()}</span></div>
      </div>
    </>
  );
}
