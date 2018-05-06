
import * as actions from './actions'
import {connect} from 'react-redux'
import {getNav} from '../reducers'
import React, {Component} from 'react'
import { View, Text, Platform, StyleSheet, Dimensions, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { Container, Content } from 'native-base'
import ImagePicker from 'react-native-image-picker';
const { HEIGHT, WIDTH } = Dimensions.get('window');


class ChooseImage extends Component {

 constructor(props) {
   super(props);
   this.state = {
     avatarSource: null,
   };
 }



 _handleSaveProfile = () => {
   const { handleSaveProfile } = this.props;

   AsyncStorage.multiSet([
     ["profile", this.state.avatarSource],
   ]);

   handleSaveProfile();
 }



 //For profile image
 selectPhotoTapped() {
   const options = {
     quality: 1.0,
     maxWidth: 500,
     maxHeight: 500,
     storageOptions: {
       skipBackup: true
     }
   };

   ImagePicker.showImagePicker(options, (response) => {

     if (response.didCancel) {
       console.log('User cancelled photo picker');
     }
     else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     }
     else {
       this.setState({ avatarSource: response.uri });
     }
   });
 }



 render() {
   const { avatarSource } = this.state;

   return (
     <Container>
       <Content>
         <View style={styles.pictureContainer}>
           <Image source={(avatarSource) ? {uri: avatarSource} : null} style={styles.picture}/>
           <TouchableOpacity style={styles.selectImage} onPress={this.selectPhotoTapped.bind(this)}>
             <Icon name="ios-camera" size={30} color="rgba(255,255,255,0.8)" />
           </TouchableOpacity>
         </View>
       </Content>

       <TouchableOpacity onPress={() => this._handleSaveProfile()} style={styles.SubmitButton}>
         <Text style={styles.previewText}>SAVE PROFILE</Text>
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

  	selectImage: {
  		height: HEIGHT * 0.19,
  		width: HEIGHT * 0.19,
  		borderRadius: HEIGHT * 0.095,
  		borderWidth: 2,
  		borderColor:'white',
  		backgroundColor: '#0005',
  		alignItems: 'center',
  		justifyContent: 'center',
  		position: 'absolute'
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseImage)
