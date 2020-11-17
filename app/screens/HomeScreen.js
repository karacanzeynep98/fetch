import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'
import Cards from '../components/Cards.js'
import NoCards from '../components/NoCards.js'
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

function HomeScreen (props) {

  useEffect(() => {
    console.log("These are my props", JSON.stringify(props));
    props.dispatch(getCards())
  }, [])

  const handleYup = (card) => {
    console.log(`Yup for ${card.name}`)
    console.log('DOES THIS WORK', props.user.id);
    firebase.database().ref('cards/' + props.user.id + '/swipes').update({ [card.id]: true });
  }
  const handleNope = (card) => {
    console.log(`Nope for ${card.name}`)
    firebase.database().ref('cards/' + props.user.id + '/swipes').update({ [card.id]: false });
  }
  const handleMaybe = (card) => {
    console.log(`Maybe for ${card.name}`)
  }

    return (
      <SwipeCards
        cards={props.cards}
        stack={false}
        renderCard={(cardData) => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={handleYup}
        handleNope={handleNope}
        handleMaybe={handleMaybe}
        hasMaybeAction={false}/>
    );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    cards: state.cards,
    user: state.user
  };
}

export default connect(mapStateToProps)(HomeScreen);


