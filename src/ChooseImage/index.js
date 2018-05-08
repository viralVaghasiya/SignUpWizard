
import * as actions from './actions'
import {connect} from 'react-redux'
import {getNav} from '../reducers'
import React, {Component} from 'react' 
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Image,
  PixelRatio
} from "react-native";
import {
  Container,
  Content,
  Header,
  Title,
  Button,
  Input,
  Picker,
  Right,
  Left,
  Body,
  Item
} from "native-base";
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
       <Header>
         <Body>
           <Title>Signup Wizard Step2</Title>
         </Body>
       </Header>
       <Content>
         <View style={styles.container}>
           <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
             <View
               style={[
                 styles.avatar,
                 styles.avatarContainer,
                 { marginBottom: 20 }
               ]}
             >
               {this.state.avatarSource === null ? (
                 <Text>Select a Photo</Text>
               ) : (
                 <Image
                   style={styles.avatar}
                   source={this.state.avatarSource}
                 />
               )}
             </View>
           </TouchableOpacity>

           <Button
             block
             onPress={() => this._handleSaveProfile()}
             style={styles.SubmitButton}
           >
             <Text style={styles.previewText}>Next</Text>
           </Button>
         </View>
       </Content>
     </Container>
   );
 }
}



const styles = StyleSheet.create({

  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  SubmitButton: {
    height: HEIGHT * 0.08,
    backgroundColor: "rgb(90, 90, 221)",
    alignItems: "center",
    justifyContent: "center"
  },

  previewText: {
    color: "white",
    fontSize: 20,
    letterSpacing: 0.8
  }

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
