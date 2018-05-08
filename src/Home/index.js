
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
   handleHome() {
     const { handleHome } = this.props;
     AsyncStorage.multiSet([
       ["fname", ""],
       ["lname", ""],
       ["address", ""],
       ["city", ""],
       ["state", ""],
       ["country", ""],
       ["email", ""],
       ["avatarSource", ""],
       ["password", ""]
     ]);
     alert("signup success");
     setTimeout(() => {
       handleHome();
     }, 1500);
   }


 render() {

   const {
     fname,
     lname,
     address,
     city,
     state,
     country,
     avatarSource,
     email,
     password
   } = this.state;

   return (
     <Container>
       <Header>
         <Body>
           <Title>Signup Wizard Step4</Title>
         </Body>
       </Header>
       <Content>
         <View style={styles.container}>
           <View style={styles.pictureContainer}>
             <Image
               source={avatarSource ? { uri: avatarSource } : null}
               style={styles.picture}
             />
           </View>
           <Text style={styles.inputText}>First name: {fname} </Text>
           <Text style={styles.inputText}>Last name: {lname}</Text>
           <Text style={styles.inputText}>Address: {address}</Text>
           <Text style={styles.inputText}>City: {city}</Text>
           <Text style={styles.inputText}>State: {state}</Text>
           <Text style={styles.inputText}>country: {country}</Text>
           <Text style={styles.inputText}>Email: {email}</Text>
           <Text style={styles.inputText}>Password: {password}</Text>
         </View>
       </Content>

       <Button
         block
         onPress={() => this.handleHome()}
         style={styles.SubmitButton}
       >
         <Text style={styles.previewText}>Submit</Text>
       </Button>
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
