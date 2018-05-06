
import * as actions from './actions'
import {connect} from 'react-redux'
import {getNav} from '../reducers'
import React, {Component} from 'react'
import { View, Text, Platform, StyleSheet, Dimensions, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { Container, Content } from 'native-base'
const { HEIGHT, WIDTH } = Dimensions.get('window');


class Home extends Component {

 constructor(props) {
   super(props);
   this.state = {
     fname: '',
     lname: '',
     address: '',
     city: '',
     state: '',
     country: '',
     avatarSource: null,
   };
 }


 	componentWillMount() {
 		AsyncStorage.multiGet(['fname','lname','address','city','state','country','profile']).then((data) => {
       this.setState({
         fname: data[0][1],
         lname: data[1][1],
         address: data[2][1],
         city: data[3][1],
         state: data[4][1],
         country: data[5][1],
         avatarSource: data[6][1],
       });
     });
   }



 render() {
   const { handleHome } = this.props;
   const { fname, lname, address, city, state, country, avatarSource } = this.state;

   return (
     <Container>
       <Content>
         <View style={styles.pictureContainer}>
           <Image source={(avatarSource) ? {uri: avatarSource} : null} style={styles.picture}/>
         </View>
         <Text style={styles.inputText}>First name: {fname}</Text>
         <Text style={styles.inputText}>Last name: {lname}</Text>
         <Text style={styles.inputText}>Address: {Address}</Text>
         <Text style={styles.inputText}>City: {city}</Text>
         <Text style={styles.inputText}>State: {state}</Text>
         <Text style={styles.inputText}>country: {country}</Text>
       </Content>

       <TouchableOpacity onPress={() => this.handleHome()} style={styles.SubmitButton}>
         <Text style={styles.previewText}>Go To Sign Up</Text>
       </TouchableOpacity>

     </Container>
   );
 }
}



const styles = StyleSheet.create({

  	pictureContainer: {
  		height: HEIGHT * 0.19,
  		marginTop: HEIGHT * 0.015,
  		marginBottom: HEIGHT * 0.05,
  		alignItems: 'center',
  		justifyContent: 'center'
  	},

  	picture: {
  		height: HEIGHT * 0.19,
  		width: HEIGHT * 0.19,
  		borderRadius: HEIGHT * 0.095,
  		resizeMode: 'cover',
  		borderWidth: 2,
  		borderColor:'white',
  	},

    inputText: {
      color: 'rgb(55, 55, 58)',
  		fontSize: 16,
    },

  	SubmitButton: {
  		height: HEIGHT * 0.08,
      backgroundColor: 'rgb(90, 90, 221)',
  		alignItems:'center',
      justifyContent: 'center'
  	},

  	previewText: {
  		color:'white',
  		fontSize: 20,
  		letterSpacing: 0.8,
  	},

});



const mapStateToProps = (state, props)=> {
  return {
    ...getNav(state),
  }
}

const mapDispatchToProps = {
  ...actions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
