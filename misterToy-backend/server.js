
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Toy = require('./toy.js');
const User = require('./user.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())



mongoose.connect('mongodb://localhost:27017/toys', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/api/toys', async (req, res) => {
  try {
    const toys = await Toy.find();
    res.status(200).json(toys)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

app.post('/api/toys', async (req, res) => {

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


app.put('/api/toys/:id', async (req, res) => {
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

app.delete('/api/toys/:id', async (req, res) => {
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

// app.post('/api/users', async (req, res) => {
//   console.log(req.body);
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


app.listen(3001, () => {
  console.log('listening on port 3001')
})



