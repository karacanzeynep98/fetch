import React, {useEffect} from 'react';
import styles from '../../styles'
import { StyleSheet, Text, View, Image} from 'react-native';
import { connect } from 'react-redux';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'

class Card extends React.Component {
  render() {
    return (
      <View>
        <Image style={styles.card} source={{uri: this.props.image}} />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  render() {
    return (
      <View>
        <Text>No more cards</Text>
      </View>
    )
  }
}

function HomeScreen (props) {

  state = {
    cards: [
      {name: 'fran', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
      {name: 'jackie', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
      {name: 'phil', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
      {name: 'jacks', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
      {name: 'mellow', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
      {name: 'frank', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
      {name: 'timmmay', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
    ]
  };

  useEffect(() => {
    console.log("These are my props", JSON.stringify(props));
  }, [])

  const handleYup = (card) => {
    console.log(`Yup for ${card.name}`)
  }
  const handleNope = (card) => {
    console.log(`Nope for ${card.name}`)
  }
  const handleMaybe = (card) => {
    console.log(`Maybe for ${card.name}`)
  }

    return (
      <SwipeCards
        cards={state.cards}
        stack={false}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        handleYup={() => {handleYup}}
        handleNope={() => {handleNope}}
        handleMaybe={() => {handleMaybe}}
        hasMaybeAction={false}/>
    );



      // return(
      //   <View style={styles.container}>
      //     <Text>Home</Text>
      //   </View>
      // );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(HomeScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center'
//   }
// });

