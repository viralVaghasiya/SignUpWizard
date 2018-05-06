import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore'
import Home from './Home'
import SignupScreen from './SignupScreen'
import ChooseImage from './ChooseImage'

const ConnectedRouter = connect()(Router)
const store = configureStore()

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene key='signup' component={SignupScreen} title='Home Title' />
    <Scene key='chooseimage' component={ChooseImage} />
    <Scene key='home' component={Home} />
  </Scene>
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={Scenes}/>
      </Provider>
    )
  }
}
