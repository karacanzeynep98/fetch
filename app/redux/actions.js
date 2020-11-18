import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import aws from '../config/aws';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications'
import Geohash from 'latlon-geohash';

import { RNS3 } from 'react-native-aws3';
import { Alert } from 'react-native';

export function login(user){
  return function(dispatch){
		let params = {
		  id: user.uid,
		  photoUrl: user.photoURL,
		  name: user.displayName,
		  aboutMe: ' ',
		  chats: ' ',
		  geocode: ' ',
		  images: [user.photoURL],
		  notification: false,
		  show: false,
		  report: false,
		  swipes: {
		    [user.uid]: false
		  },
		  token: ' ',
		}

		firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
		  if(snapshot.val() !== null){
			dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
			dispatch(allowNotifications())
		  } else {
		    firebase.database().ref('cards/' + user.uid ).update(params);
		    dispatch({ type: 'LOGIN', user: params, loggedIn: true });
		  }
		  dispatch(getLocation())
		})
  }
}

export function logout(){
	return function(dispatch){
    firebase.auth().signOut()
    dispatch({ type: 'LOGOUT', loggedIn: false });
    console.log("Successfully signed out");
   }
}

export function uploadImages(images){
	return function(dispatch){
		ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(function(result){

		  var array = images
		  if(result.uri != undefined){
		    const file = {
		      uri: result.uri,
		      name: result.uri,
		      type: "image/png"
		    }

		    const options = {
		      keyPrefix: "uploads/",
		      bucket: "dresscodebucket",
		      region: "us-east-1",
		      accessKey: aws.accessKey,
		      secretKey: aws.secretKey,
		      successActionStatus: 201
		    }

		    RNS3.put(file, options).then(function(response){
		      if (response.status === 201){
		        array.push(response.body.postResponse.location)
		        firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
		        dispatch({ type: 'UPLOAD_IMAGES', payload: array });
		      }
		    })
		  }

		})
	}
}

export function deleteImage(images, key){
	return function(dispatch){
    Alert.alert(
      'Are you sure you want to Delete',
      '',
      [
        {text: 'Ok', onPress: () => {
		  let array = images
			array.splice(key, 1)
			// delete array[key]
			dispatch({ type: 'UPLOAD_IMAGES', payload: array });
          firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
      { cancelable: true }
    )
	}
}

export function updateAbout(value){
	return function(dispatch){
		dispatch({ type: 'UPDATE_ABOUT', payload: value });
    setTimeout(function(){  
			firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({ aboutMe: value });
    }, 3000);
  }
}

export function getCards(geocode){
	return function(dispatch){
		firebase.database().ref('cards').orderByChild("geocode").equalTo(geocode).once('value', (snap) => {
		  var items = [];
		  snap.forEach((child) => {
		    item = child.val();
		    item.id = child.key;
		    items.push(item); 
		  });
		  dispatch({ type: 'GET_CARDS', payload: items });
		});
	}
}

export function getLocation(){
	return function(dispatch){
		Permissions.askAsync(Permissions.LOCATION).then(function(result){
		  if(result){
		    Location.getCurrentPositionAsync({}).then(function(location){
		      var geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 4)
		      firebase.database().ref('cards/' + firebase.auth().currentUser.uid).update({geocode: geocode});
		      dispatch({ type: 'GET_LOCATION', payload: geocode });
		    })
		  }
		})
	}
}

export function allowNotifications(){
	console.log("CALLED ALLOW NOTIFICATIONS");

	return function(dispatch){

	Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(status) {
		if (status !== 'granted') {
			Permissions.askAsync(Permissions.NOTIFICATIONS).then(function(result){

			if (result.status !== 'granted') {
				console.log('not granted');
				alert('Failed to get push token for push notification!');
				return;
			  }

			  if (result.status === 'granted') {
				console.log("IS IT GRANTED?");
				Notifications.getExpoPushTokenAsync().then(function(token){
				  firebase.database().ref('cards/' + firebase.auth().currentUser.uid ).update({ token: token });
				  dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
				})
			  }
			})
			finalStatus = status;
		}
	})

	}
}




		// Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result){
		// 	console.log("NOT GRANTED?");
		//   if (result.status === 'granted') {
		// 	console.log("IS IT GRANTED?");
		//     Notifications.getExpoPushTokenAsync().then(function(token){
		//       firebase.database().ref('cards/' + firebase.auth().currentUser.uid ).update({ token: token });
		//       dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
		//     })
		//   }
		// })
// 	}
// }



	// return function(dispatch){
	// 	if (Constants.isDevice) {
	// 	//   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
	// 	Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(status) {
	// 		let finalStatus = status;
	// 	  	if (status !== 'granted') {
	// 		// const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
	// 		Permissions.askAsync(Permissions.NOTIFICATIONS).then(function(status) {
	// 			finalStatus = status;
	// 			console.log("SET FINAL STATUS TO STATUS")
	// 			// dispatch({ type: 'LET_NOTIFICATIONS', payload: token });

	// 			if (finalStatus !== 'granted') {
	// 				alert('Failed to get push token for push notification!');
	// 				return;
	// 			  }
	// 			  Notifications.getExpoPushTokenAsync().then(function(token){
	// 				firebase.database().ref('cards/' + firebase.auth().currentUser.uid ).update({ token: token });
	// 				dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
	// 			})
	// 		})
	// 	  }
		
	// return function(dispatch){
	// 	Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result){
	// 		console.log("NOT GRANTED?");
	// 	  if (result.status === 'granted') {
	// 		console.log("IS IT GRANTED?");


	// 	    Notifications.getExpoPushTokenAsync().then(function(token){
	// 	      firebase.database().ref('cards/' + firebase.auth().currentUser.uid ).update({ token: token });
	// 	      dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
	// 	    })
	// 	  }
	// 	})
	// }
// }

export function sendNotification(id, name, text){
  return function(dispatch){
    firebase.database().ref('cards/' + id).once('value', (snap) => {
      if(snap.val().token != null){
        return fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: snap.val().token,
            title: name,
            body: text,
          }),
        });

      }
    });
  }
}
