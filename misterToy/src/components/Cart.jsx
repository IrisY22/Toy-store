import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();

  const user = localStorage.getItem('user')
  const userConnected = JSON.parse(user);
  const usersCart = userConnected.cart

  function backToHomePage() {
    navigate('/')
  }

  return (
    <>
      <button onClick={backToHomePage}>Back</button>
      <table className="table-fixed w-full">
        {/* <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2" colSpan="1">Image</th>
          <th className="px-4 py-2" colSpan="1">Title</th>
          <th className="px-4 py-2" colSpan="1">Price</th>
        </tr>
      </thead> */}
        <tbody>
          {usersCart.map(cartItems => (
            <tr key={cartItems.id}>
              <td className="px-4 py-2"><img src={cartItems.image} alt={cartItems.title} className="w-40 h-30" /></td>
              <td className="px-4 py-2">{cartItems.title}</td>
              <td className="px-4 py-2">${cartItems.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}