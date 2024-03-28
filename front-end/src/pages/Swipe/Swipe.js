import React, { useState, useEffect, useRef, useMemo} from 'react';
import axios from 'axios';
import Card from './Card';
import './Swipe.css';
import TinderCard from 'react-tinder-card';



const Swipe = () => {
  const[cards, setCards] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  const [childRefs, setChildRefs] = useState([]);



  useEffect(() => {
    async function fetchData() {
    const req = await axios.get('http://localhost:3001/swipe')
    .then((response) => {
      setCards(response.data)
      setCurrentIndex(response.data.length - 1);

      const refs = Array(response.data.length).fill(0).map(() => React.createRef());
      setChildRefs(refs);

        //print out what is in the cards array
    })
    .catch((error) => {
      console.error('Error fetching posts:', error)
    })}
    fetchData()
    console.log(cards)
  },[])

  useEffect(() => {
    currentIndexRef.current = currentIndex; // Update currentIndexRef
  }, [currentIndex]);




  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < cards.length - 1

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
    if (canSwipe && currentIndex < cards.length) {
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
        {cards.map(
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
