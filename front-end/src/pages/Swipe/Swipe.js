import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';


const Swipe = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=2&limit=10`);
      const cardData = response.data.map((item, index) => ({
        image: item.download_url,
        name: `Pet Name ${index}`,
        breed: `Breed ${index}`,
        ageWeight: `${index + 1} years, ${10 + index}kg`,
        location: `Location ${index}`,
        description: `Description ${index}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
      }));
      setCards(cardData);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const swipeLeft = () => {
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const swipeRight = () => {
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  return (
    <div>
      {cards.length > 0 && (
        <>
          <Card {...cards[currentIndex]} />
          <div className='swipeButtons'>
            <button onClick={swipeLeft}>Dislike</button>
            <button onClick={swipeRight}>Like</button>
          </div>
        </>
      )}
    </div>
  );
};


export default Swipe;
