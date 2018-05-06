
import * as actions from './actions'
import {connect} from 'react-redux'
import {getNav, getHome} from '../reducers'
import React, {Component} from 'react'
import { View, Text, Platform, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import { Container, Content, Button, Input, Picker } from 'native-base'
const { HEIGHT, WIDTH } = Dimensions.get('window');

class SignupScreen extends Component {

 constructor(props) {
   super(props);
   this.state = {
     fname: '',
     lname: '',
     address: '',
     city: '',
     state: '',
     country: 'select_image',
     height: (HEIGHT * 0.08),
   };
 }

  onValueChange(value: string) {
    this.setState({
      country: value
    });
  }


 updateSize = (height) => {
   this.setState({
     height
   });
 }


 _handleLogin() {

   const { handleLogin } = this.props;
   const { fname, lname, address, city, state, country } = this.state;

   if( fname == '' ){
     return alert("Please enter first name!");
   }

   if( address == '' ){
     return alert("Please enter address!");
   }

   if( city == '' ){
     return alert("Please enter city!");
   }

   if( state == '' ){
     return alert("Please enter state!");
   }

   if( country == 'select_image' ){
     return alert("Please select country!");
   }

    AsyncStorage.multiSet([
      ["fname", this.state.fname],
      ["lname", this.state.lname],
      ["address", this.state.address],
      ["city", this.state.city],
      ["state", this.state.state],
      ["country", this.state.country],
    ]);
   handleLogin();
 }


 render(){
   let newStyle = {
     this.state.height
   }
   return (
     <Container>
       <Content>
         <Input
           value={this.state.fname}
           style={styles.inputText}
           placeholder='First Name'
           keyboardType='default'
           returnKeyType='next'
           autoCapitalize='none'
           autoCorrect={false}
           editable={true}
           placeholderTextColor='#9a9a9a'
           onChangeText={(fname)=>this.setState({fname})}/>
         <Input
           value={this.state.lname}
           style={styles.inputText}
           placeholder='Last Name'
           keyboardType='default'
           returnKeyType='next'
           autoCapitalize='none'
           autoCorrect={false}
           editable={true}
           placeholderTextColor='#9a9a9a'
           onChangeText={(lname)=>this.setState({lname})}/>
         <Input
           value={this.state.address}
           style={[styles.inputText, newStyle]}
           placeholder='Address'
           keyboardType='default'
           returnKeyType='next'
           autoCapitalize='none'
           autoCorrect={false}
           placeholderTextColor='#9a9a9a'
           editable={true}
           multiline={true}
           onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
           onChangeText={(address)=>this.setState({address})}/>
         <Input
           value={this.state.city}
           style={styles.inputText}
           placeholder='City'
           keyboardType='default'
           returnKeyType='next'
           autoCapitalize='none'
           autoCorrect={false}
           editable={true}
           placeholderTextColor='#9a9a9a'
           onChangeText={(city)=>this.setState({city})}/>
         <Input
           value={this.state.state}
           style={styles.inputText}
           placeholder='State'
           keyboardType='default'
           returnKeyType='next'
           autoCapitalize='none'
           autoCorrect={false}
           editable={true}
           placeholderTextColor='#9a9a9a'
           onChangeText={(state)=>this.setState({state})}/>
         <View style={styles.countryContainer}>
           <Text style={styles.inputText}>Select Country:</Text>
           <Picker
              iosHeader="Select Country"
              mode="dropdown"
              selectedValue={this.state.country}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Select Country" value="select_image" />
              <Picker.Item label="India" value="India" />
              <Picker.Item label="Japan" value="Japan" />
              <Picker.Item label="Australia" value="Australia" />
              <Picker.Item label="Paris" value="Paris" />
              <Picker.Item label="London" value="London" />
            </Picker>
         </View>
         <TouchableOpacity onPress={() => this._handleLogin()} style={styles.buttonStyle}>
           <Text style={styles.buttonText}>Next</Text>
         </TouchableOpacity>
       </Content>
     </Container>
   );
 }
}



const styles = StyleSheet.create({

	buttonStyle: {
    marginTop: HEIGHT * 0.1,
		height: HEIGHT * 0.08,
    width: WIDTH * 0.45,
    borderRadius: HEIGHT * 0.04,
    backgroundColor: 'rgb(90, 90, 221)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: (theme.HEIGHT * 0.007),
    elevation: 6,
	},

  buttonText: {
    color: 'white',
		fontSize: 20,
		letterSpacing: 0.8,
  },

  inputText: {
    color: 'rgb(55, 55, 58)',
		fontSize: 18,
		letterSpacing: 0.8,
  },

  countryContainer: {
    flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
  }

});



const mapStateToProps = (state, props) => {
  return {
    ...getNav(state),
    ...getHome(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
