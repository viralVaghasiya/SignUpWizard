
import {Actions} from 'react-native-router-flux'

export const handleHome = ()=>{
  Actions.signup({title: 'Home Title'})
  // Redux require you to return an object with type.
  return {type: 'CardPush'}
}
