
import {Actions} from 'react-native-router-flux'

export const handleSaveProfile = ()=>{
  Actions.home({title: 'Custom Final Card Title'})
  // Redux require you to return an object with type.
  return {type: 'CardPush'}
}
