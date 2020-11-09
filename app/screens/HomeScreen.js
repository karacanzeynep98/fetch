import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../redux/actions'

function HomeScreen (props) {

  useEffect(() => {
    console.log("These are my props", JSON.stringify(props));
  }, [])

      return(
        <View style={styles.container}>
          <Text>Home</Text>
        </View>
      );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

