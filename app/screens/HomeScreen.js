import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'
import Cards from '../components/Cards.js'
import NoCards from '../components/NoCards.js'
import firebase from "firebase";

function HomeScreen (props) {

  useEffect(() => {
    console.log("These are my props", JSON.stringify(props));
    props.dispatch(getCards(props.user.geocode))
  }, [])

  const checkMatch = (card) => {
    console.log("Check match called");
    firebase.database().ref('cards/' + card.id + '/swipes/' + props.user.id).once('value', (snap) => {
      if(snap.val() == true){
        var me = {
          id: props.user.id,
          photoUrl: props.user.photoUrl,
          name: props.user.name
        }
        var user = {
          id: card.id,
          photoUrl: card.photoUrl,
          name: card.name
        }
        firebase.database().ref('cards/' + props.user.id + '/chats/' + card.id).set({user: user});
        firebase.database().ref('cards/' + card.id + '/chats/' + props.user.id).set({user: me});
      }
    });
  }

  const handleYup = (card) => {
    console.log(`Yup for ${card.name}`)
    console.log('DOES THIS WORK', props.user.id);
    firebase.database().ref('cards/' + props.user.id + '/swipes').update({ [card.id]: true }, 
    function(error) {
      if (error) {
        // The write failed...
        console.log("Write failed", error);
      } else {
        // Data saved successfully!
        checkMatch(card);
      }
    });
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


