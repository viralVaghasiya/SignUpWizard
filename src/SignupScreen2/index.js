import * as actions from "./actions";
import { connect } from "react-redux";
import { getNav, getHome } from "../reducers";
import React, { Component } from "react";
import React, { Component } from "react";
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
const { HEIGHT, WIDTH } = Dimensions.get("window");

class SignupScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cpassword: ""
    };
  }

  _handleLogin() {
    const { handleLogin } = this.props;
    const { email, password, cpassword } = this.state;

    if (email == "") {
      return alert("Please enter Email!");
    }

    if (password == "") {
      return alert("Please enter Password!");
    }

    if (cpassword == "") {
      return alert("Please enter ConfirmPassword!");
    }

    AsyncStorage.multiSet([["email", email], ["password", password]]);
    handleLogin();
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Signup Wizard Step3</Title>
          </Body>
        </Header>
        <Content>
          <Item regular>
            <Input
              value={this.state.email}
              style={styles.inputText}
              placeholder="Email"
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              editable={true}
              placeholderTextColor="#9a9a9a"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item regular>
            <Input
              secureTextEntry
              value={this.state.password}
              style={styles.inputText}
              placeholder="Password"
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              editable={true}
              placeholderTextColor="#9a9a9a"
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Item regular>
            <Input
              secureTextEntry
              value={this.state.cpassword}
              style={styles.inputText}
              placeholder="ConfirmPassword"
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9a9a9a"
              editable={true}
              onChangeText={cpassword => this.setState({ cpassword })}
            />
          </Item>

          <Button
            block
            style={styles.buttonStyle}
            onPress={() => this._handleLogin()}
          >
            <Text>Next</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btnText: {
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonStyle: {
    marginTop: 20,
    height: HEIGHT * 0.08,
    width: WIDTH,
    backgroundColor: "rgb(90, 90, 221)"
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    letterSpacing: 0.8
  },

  inputText: {
    color: "rgb(55, 55, 58)",
    fontSize: 18,
    letterSpacing: 0.8
  }
});

const mapStateToProps = (state, props) => {
  return {
    ...getNav(state),
    ...getHome(state)
  };
};

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen2);
