const db = [
  {
    name: 'Richard Hendricks',
    breed: 'dog',
    age: '2',
    location: 'nearby',
    description: 'bio',
    url: 'https://picsum.photos/200/301',
  },
  {
    name: 'Erlich Bachman',
    breed: 'dog',
    age: '2',
    location: 'nearby',
    description: 'bio',
    url: 'https://picsum.photos/200/303',
  },
  {
    name: 'Jared Dunn',
    breed: 'dog',
    age: '2',
    location: 'nearby',
    description: 'bio',
    url: 'https://picsum.photos/200/300',
  },
  {
    name: 'Dinesh Chugtai',
    breed: 'dog',
    age: '2',
    location: 'nearby',
    description: 'bio',
    url: 'https://picsum.photos/200/302',
  },
  {
    name: 'Bertram Gilfoyle',
    breed: 'dog',
    age: '2',
    location: 'nearby',
    description: 'bio',
    url: 'https://picsum.photos/200/304',
  },
];

  const postSwipe = (req, res) => {
    try {
        console.log(req.body);
        if(req.body.dir === 'left'){
            console.log('swiped left')
        }
        if(req.body.dir === 'right'){
            console.log('swiped right')
            //add logic for match

        }
      // Send a success response
      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getCard = (req, res) => {
  res.json(db)
}

module.exports = { getCard, postSwipe }
