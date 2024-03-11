const express = require('express')
const router = express.Router();
const Toy = require('../toy.js');



router.get('/', async (req, res) => {
  try {
    const toys = await Toy.find();
    res.status(200).json(toys)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.post('/', async (req, res) => {

  const data = req.body;

  const toy = new Toy({
    title: data.title,
    price: data.price,
    image: data.image
  });

  try {
    const newToy = await toy.save();
    res.status(201).json(newToy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const toy = await Toy.findById(id);
    console.log(toy);

    if (!toy) {
      return res.status(404).json({ message: 'Toy not found' });
    }

    toy.title = req.body.title
    toy.price = req.body.price
    const updatedToy = await toy.save()
    res.status(200).json(updatedToy)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const toy = await Toy.findById(id)

    if (!toy) {
      return res.status(404).json({ message: 'Toy not found' });
    }
    await toy.deleteOne();

    res.status(200).json({ message: 'Toy deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router