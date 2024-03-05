import { useState } from "react"

export default function AddNewToy({ onAddNewToy, toy }) {




  const [title, setTitle] = useState(toy ? toy.title : '')
  const [price, setPrice] = useState(toy ? toy.price : 0)
  const [image, setImage] = useState(toy ? toy.image : '')


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <p className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-800">Add Toy's Name:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-500" />
      </p>
      <p className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-800">Add Toy's Price:</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-500" />
      </p>
      <p className="mb-4">
        <label className="block mb-2 text-lg font-semibold text-gray-800">Add Toy's Image:</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-500" />
      </p>
      <button
        onClick={() => onAddNewToy(title, price, image)}
        className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
        Add Toy
      </button>
    </div>
  )
}