// import React from 'react';
// import { StyleSheet } from 'react-native';

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center,'
//   },
// })

// module.exports = styles

import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  color: {
  	color: '#EBCBBE'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  img: {
  	width: 90,
  	height: 90,
  	margin: 10,
    backgroundColor: '#fff',
  },
  imgRow: {
		flexWrap: 'wrap',
		flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
  },
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#FFEFE8',
    height: 100
  },
  bold: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#917467'
  },
  button: {
	  borderRadius: 15,
	  borderWidth: 1,
	  borderColor: '#917467',
	  textAlign: 'center',
	  color: '#EBCBBE',
	  padding: 15,
	  margin: 15,
	  fontSize: 18,
	  fontWeight: 'bold',
  },
  card: {
    width: deviceWidth*.9,
    height: deviceHeight*.7,
  }
})

module.exports = styles