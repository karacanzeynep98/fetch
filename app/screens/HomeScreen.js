import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../redux/actions'

function HomeScreen (props) {

  useEffect(() => {
    props.dispatch(login("Hello!"))
  }, [])

      return(
        <View style={styles.container}>
          <Text>{props.user}</Text>
        </View>
      );
}

function mapStateToProps(state) {
  return {
    user: state.user
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