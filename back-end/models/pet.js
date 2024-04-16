
const mongoose = require('mongoose');



//example schema for a user profile for other pets
const Schema = mongoose.Schema;

//pet extends users
const User = require('./user');

const petSchema = new Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  liked: [{ type: Schema.Types.ObjectId, ref: 'User'}], 
  disliked : [{ type: Schema.Types.ObjectId, ref: 'User'}],
  liked_by : [{ type: Schema.Types.ObjectId, ref: 'User'}],
  

});

const pet = mongoose.model('pet', petSchema);

module.exports = pet;


``` 
to create new pet:

const Pet = require('./models/pet'); 
const newPet = new Pet({
    name: 'Richard Hendricks',
    breed: 'dog',
    age: 2,
    location: 'nearby',
    description: 'bio',
    url: 'https://picsum.photos/200/301',
  });
  
  async function createPet() {
    try {
      const savedPet = await newPet.save();
      console.log('Pet saved successfully:', savedPet);
    } catch (error) {
      console.error('Error saving pet:', error);
    }
  }
  
  createPet();

  newPet.save()
  .then(savedPet => console.log('Pet saved successfully:', savedPet))
  .catch(error => console.error('Error saving pet:', error));

app.post('/pets', async (req, res) => {
  const newPet = new Pet(req.body); 

  try {
    const savedPet = await newPet.save();
    res.status(201).send(savedPet);
  } catch (error) {
    res.status(400).send(error);
  }
});
```