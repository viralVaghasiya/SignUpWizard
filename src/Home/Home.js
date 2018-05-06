import React from 'react'
import {
  View,
  Text,
} from 'react-native'

export default (props) => {
  const {scene, handleHome} = props
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>You are currently on {scene && scene.sceneKey}</Text>
      <Text onPress={()=>handleHome()}>Jump To SignUp Scene</Text>
    </View>
  )
}
