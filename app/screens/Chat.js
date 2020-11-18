import React from 'react';
import styles from '../styles'
import * as firebase from 'firebase';
import { sendNotification } from '../redux/actions'
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    firebase.database().ref('cards/' + this.props.user.id + '/chats/' + this.props.navigation.state.params.user.id).on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        if(child.val().key != 'user'){
          item = child.val();
          items.push(item); 
        }
      });
      this.setState({ messages: items.reverse() });
    });
  }

  onSend(messages = []) {
    this.props.dispatch(sendNotification(this.props.navigation.state.params.user.id, messages[0].user.name, messages[0].text))
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    firebase.database().ref('cards/' + this.props.user.id + '/chats/' + this.props.navigation.state.params.user.id).push(messages[0]);
    firebase.database().ref('cards/' + this.props.navigation.state.params.user.id + '/chats/' + this.props.user.id).push(messages[0]);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.user.id,
          name: this.props.user.name,
          avatar: this.props.user.photoUrl
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// export default connect(mapStateToProps)(Chat);


// import React from 'react';
// import * as firebase from 'firebase';
// import { sendNotification } from '../redux/actions'
// import { connect } from 'react-redux';
// import { GiftedChat } from 'react-native-gifted-chat'

// function ChatScreen(props) {
//   // state = {
//   //   messages: [],
//   // }

//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     console.log("Chats are loading with navigation props?", props.route)
//     firebase.database().ref('cards/' + props.user.id + '/chats/' + props.route.params.user.id).on('value', (snap) => {
//       var items = [];
//       snap.forEach((child) => {
//         if(child.val().key != 'user'){
//           item = child.val();
//           items.push(item); 
//         }
//       });
//       setMessages(items.reverse());
//     });
//   }, [])

//   // componentWillMount() {
//   //   console.log("Chats are loading with navigation props?", this.props.route)
//   //   firebase.database().ref('cards/' + this.props.user.id + '/chats/' + this.props.route.params.user.id).on('value', (snap) => {
//   //     var items = [];
//   //     snap.forEach((child) => {
//   //       if(child.val().key != 'user'){
//   //         item = child.val();
//   //         items.push(item); 
//   //       }
//   //     });
//   //     this.setState({ messages: items.reverse() });
//   //   });
//   // }

//   const onSend = (messages) => {
//     // this.props.dispatch(sendNotification(this.props.route.params.user.id, messages[0].user.name, messages[0].text))
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }))
//     firebase.database().ref('cards/' + this.props.user.id + '/chats/' + this.props.route.params.user.id).push(messages[0]);
//     firebase.database().ref('cards/' + this.props.route.params.user.id + '/chats/' + this.props.user.id).push(messages[0]);
//   }

//     return (
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         user={{
//           _id: props.user.id,
//           name: props.user.name,
//           avatar: props.user.photoUrl
//         }}
//       />
//     );
// }

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   };
// }

// export default connect(mapStateToProps)(ChatScreen);