
const express = require('express')
const app = express()
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors')

const mongoose = require('mongoose')

const server = http.createServer(app);

app.use(cors())

const toyRouter = require('./routes/toyRouter');
const userRouter = require('./routes/userRouter');

app.use('/api/toys', toyRouter);
app.use('/api/users', userRouter);

mongoose.connect('mongodb://localhost:27017/toys', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));



const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
});



// const PORT = 3001;
app.listen(3001, () => {
  console.log(`Server is listening on port 3001`)
})

// const Toy = require('./toy.js');
// const User = require('./user.js');
// const user = require('./user.js');

// app.get('/api/toys', async (req, res) => {
//   try {
//     const toys = await Toy.find();
//     res.status(200).json(toys)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// });

// app.post('/api/toys', async (req, res) => {

//   const data = req.body;

//   const toy = new Toy({
//     title: data.title,
//     price: data.price,
//     image: data.image
//   });

//   try {
//     const newToy = await toy.save();
//     res.status(201).json(newToy);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


// app.put('/api/toys/:id', async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   try {
//     const toy = await Toy.findById(id);
//     console.log(toy);

//     if (!toy) {
//       return res.status(404).json({ message: 'Toy not found' });
//     }

//     toy.title = req.body.title
//     toy.price = req.body.price
//     const updatedToy = await toy.save()
//     res.status(200).json(updatedToy)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// app.delete('/api/toys/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const toy = await Toy.findById(id)

//     if (!toy) {
//       return res.status(404).json({ message: 'Toy not found' });
//     }
//     await toy.deleteOne();

//     res.status(200).json({ message: 'Toy deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// })

// app.post('/api/users/login', async (req, res) => {
//   try {
//     const user = await User.findOne({
//       username: req.body.username
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User does not exist' });
//     }
//     if (req.body.password === user.password) {
//       res.status(200).json(user);
//     } else {
//       return res.status(404).json({ message: 'Password does not match' });
//     }
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.post('/api/users', async (req, res) => {
//   console.log(req.body);
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//     isAdmin: req.body.isAdmin
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


// app.put('/api/users/:id', async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     console.log(req.body.cart);
//     user.cart = req.body.cart
//     const updatedUser = await user.save()
//     res.status(200).json(updatedUser)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })





