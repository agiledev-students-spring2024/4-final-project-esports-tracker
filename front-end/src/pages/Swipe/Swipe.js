import React, { useState, useEffect, useRef, useMemo} from 'react';
import axios from 'axios';
import Card from './Card';
import './Swipe.css';
import TinderCard from 'react-tinder-card';

//sample db
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



const Swipe = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, dir, idx) => {
    console.log(`${name} (${idx}) left the screen! swiped ${dir}`, currentIndexRef.current)
    // insert logic for swipes here


    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>

      <div className='cardContainer'>
        {db.map(
          (item, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={item.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, item.name, index)}
            onCardLeftScreen={(dir) => outOfFrame(item.name, dir ,index)}
          >
            <Card
              key={index}
              name= {item.name}
              breed={item.breed}
              age={item.age}
              location={item.location}
              description={item.description}
              url={item.url}
            /> 
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Pass</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Like</button>
      </div>

    </div>
  )
}


export default Swipe;
