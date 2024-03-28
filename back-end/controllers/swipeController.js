


const db = [
    {
      name: 'Richard Hendricks',
      breed:'dog',
      age:'2',
      location:'nearby',
      description:'bio',
      url: 'https://picsum.photos/200/301',
    },
    {
      name: 'Erlich Bachman',
      breed:'dog',
      age:'2',
      location:'nearby',
      description:'bio',
      url: 'https://picsum.photos/200/303',
    },
    {
      name: 'Jared Dunn',
      breed:'dog',
      age:'2',
      location:'nearby',
      description:'bio',
      url: 'https://picsum.photos/200/300',
    },
    {
      name: 'Dinesh Chugtai',
      breed:'dog',
      age:'2',
      location:'nearby',
      description:'bio',
      url: 'https://picsum.photos/200/302',
    },
    {
      name: 'Bertram Gilfoyle',
      breed:'dog',
      age:'2',
      location:'nearby',
      description:'bio',
      url: 'https://picsum.photos/200/304',
    },
  ];
  

const postSwipe = (req, res) => {
    res.send("This is the swipe route")
}

const getCard = (req, res) => {
    res.json(db) 
}


module.exports = { getCard, postSwipe }