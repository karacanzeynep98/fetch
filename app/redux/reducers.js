// export default reducers = (state = {
//   loggedIn: null,
// }, action) => {
//   switch (action.type) {
//     case 'LOGIN': {
//       return { ...state, loggedIn: action.payload }
//     }
//   }
//   return state;
// } 

export default reducers = (state = {
    loggedIn: false,
    user: {
      id: '',
      photoUrl: '',
      name: '',
      aboutMe: ' ',
      chats: ' ',
      geocode: ' ',
      images: [],
      notification: false,
      show: false,
      report: false,
      swipes: [],
      token: ' ',
    }
  }, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, user: action.user, loggedIn: action.loggedIn }
      }
      case 'LOGOUT': {
        return { ...state, loggedIn: action.loggedIn }
      }
    }
    return state;
  }