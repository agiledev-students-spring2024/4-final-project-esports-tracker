import React, { useState, useEffect, useRef, useMemo} from 'react';
import axios from 'axios';
import Card from './Card';
import './Swipe.css';
import TinderCard from 'react-tinder-card';
import { IoHeartOutline, IoEllipsisHorizontalOutline, IoReturnUpBack} from "react-icons/io5";
import { FaR, FaRegThumbsDown } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth';



const Swipe = () => {
  const[cards, setCards] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  const [childRefs, setChildRefs] = useState([]);
  const {user} = useAuth();  // 



  useEffect(() => {
    async function fetchData() {
    console.log(user)
    const req = await axios.get('http://localhost:3001/swipe/card', 
    {headers:{
      "Authorization": `Bearer ${user.data.token}`,
    }})
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
    if(user){
      fetchData()
    }
  },[])

  useEffect(() => {
    currentIndexRef.current = currentIndex; // Update currentIndexRef
  }, []);




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

  const outOfFrame = (name, dir, idx, ev) => {
    console.log(`${name} (${idx}) left the screen! swiped ${dir}`, currentIndexRef.current, cards[idx])
    // insert logic for swipes here
    const ret = {
      dir: dir,
      cardData: cards[idx], 
      idx: idx,
    }
    console.log(ret)
    axios.post('http://localhost:3001/swipe/postSwipe', ret, 
    {headers:{
      "Authorization": `Bearer ${user.data.token}`,
    }})
    .then((response) => {
      console.log(response.data)
      if (response.data.message === "It's a match!") {
        alert("It's a match!")
        // Send another request to handle the match
        axios.post('http://localhost:3001/swipe/handleMatch', { matchedUser: ret.cardData }, 
        {
          headers: {
            "Authorization": `Bearer ${user.data.token}`,
          }
        })
        .then((matchResponse) => {
          console.log(matchResponse.data)
        })
        .catch((error) => {
          console.error('Error handling match:', error)
        })
      }
    })
    .catch((error) => {
      console.error('Error handling out of frame data:', error)
    })
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cards.length) {
      try {
        await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      } catch (error) {
        console.error('Error swiping card:', error);
      }}
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


      <div className='cardContainer'>



        {cards.map(
          (item, index) => (
            
            <div>


          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={item.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, item.username, index)}
            onCardLeftScreen={(dir) => outOfFrame(item.username, dir ,index)}
          >
            <Card
              key={index}
              name= {item.username}
              breed={item.breed}
              age={item.age}
              location={item.location}
              description={item.bio}
              url={item.pfp}
              swipe={swipe}
            
            /> 

          </TinderCard>

          </div>
        ))}
              <IoReturnUpBack className='undoButton' onClick={goBack} />

              <div className='buttons'>
              <IoHeartOutline className='cardIcon' onClick={() => swipe('right')}/>
              <FaRegThumbsDown className='cardIcon' onClick={() => swipe('left')}/>
              </div>
      </div>



    </div>
  )
}


export default Swipe;
