const initState = {
  ustate:{
    uid: 'zhesong2',
    iflog: false
  }
}

const rootReducer = (state = initState, action) =>{
  if (action.type === 'LOG_IN'){
    let newustate = {
      uid: action.id,
      iflog: true
    };
    return{
      ...state,
      ustate: newustate
    }
  }
  return state;
}

export default rootReducer;
