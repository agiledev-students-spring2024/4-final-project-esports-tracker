const assert = require('assert');
const Pet = require('./back-end/models/pet'); 


  const postSwipe = async (req, res) => {
    try {
        console.log(req.body);
        assert(typeof req.body.dir === 'string', 'Invalid or missing "dir" value in the request body');

        const { dir, petId } = req.body;
        const userId = req.user._id;

        const pet = await Pet.findById(petId);
        if (!pet) {
          return res.status(404).json({ error: 'Pet not found' });
        }

        if(req.body.dir === 'left'){
            console.log('swiped left')
            Pet.updateOne({ petId: petId }, { $addToSet: { disliked: userId } }) 
            .then(result => {
              console.log("Updated pet's disliked successfully", result);
            })
            .catch(error => {
              console.error("Error updating pet's disliked", error);
             });
        }
        else if(req.body.dir === 'right'){
            console.log('swiped right')
            //add logic for match
            Pet.updateOne(
                { _id: petId },
                { $addToSet: { liked: userId } }
            )
            .then(result => {
                console.log("Updated pet's likes successfully", result);
                res.status(200).json({ message: 'Swipe right recorded successfully' });
            })
            .catch(error => {
                console.error("Error updating pet's likes", error);
                res.status(500).json({ error: 'Internal server error' });
            });
        }
      // Send a success response
      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getCard = async (req, res) => {
  try {
    const count = await Pet.countDocuments();
    const random = Math.floor(Math.random() * count);
    const pet = await Pet.findOne().skip(random); // Get a random document

    if (!pet) {
      return res.status(404).json({ error: 'No pets found' });
    }
    res.json(pet);
  } catch (error) {
    console.error('Error fetching a random pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getCard, postSwipe }
