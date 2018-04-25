import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { isOffline } from '../../helpers/check-connection';

const BG_IMAGE = require('../../../assets/images/ilLoginGetAccess.png');

export class SigninComponent extends Component<any, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      securePassword: true,
      buttonLoginDisabled: true
    };
  }
  componentWillMount() {
    isOffline(this.props.navigation);
  }
  toggleShowPassword(value) {
    this.setState({ securePassword: !value });
  }
  render() {
    const iconSecretClassName: string = this.state.securePassword
      ? 'ios-eye-off-outline'
      : 'ios-eye-outline';
    const buttonLoginContainer = this.state.buttonLoginDisabled
      ? styles.buttonLoginContainerDisabled
      : styles.buttonLoginContainer;
    const buttonLoginText = this.state.buttonLoginDisabled
      ? styles.buttonLoginTextDisabled
      : styles.buttonLoginText;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <KeyboardAvoidingView style={styles.loginContainer} behavior="position">
            <View style={styles.formContainer}>
              <View style={styles.loginHeaderContainer}>
                <Text style={styles.loginHeaderText}>Login</Text>
              </View>
              <View style={styles.fieldContainer}>
                <View style={styles.inputEmailContainer}>
                  <TextInput
                    keyboardAppearance="light"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={styles.inputTextStyle}
                    placeholder="Email Bhinneka"
                    onChangeText={email => {
                      const { password } = this.state;
                      const buttonLoginDisabled = email !== '' && password !== '' ? false : true;
                      this.setState({ email, buttonLoginDisabled });
                    }}
                    value={this.state.email}
                  />
                </View>
                <View style={styles.inputPasswordContainer}>
                  <TextInput
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={this.state.securePassword}
                    blurOnSubmit={true}
                    style={styles.inputTextStyle}
                    placeholder="Password"
                    onChangeText={password => {
                      const { email } = this.state;
                      const buttonLoginDisabled = email !== '' && password !== '' ? false : true;
                      this.setState({ password, buttonLoginDisabled });
                    }}
                    value={this.state.password}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => this.toggleShowPassword(this.state.securePassword)}
                  >
                    <View style={styles.buttonSecret}>
                      <Ionicons
                        name={iconSecretClassName}
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={styles.iconSecretStyle}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <TouchableWithoutFeedback
                disabled={this.state.buttonLoginDisabled}
                onPress={this._signinAsync}
              >
                <View style={buttonLoginContainer}>
                  <Text style={buttonLoginText}>LOGIN</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  _signinAsync = async () => {
    if (!this.state.buttonLoginDisabled) {
      const email: string = this.state.email;
      const password: string = this.state.password;
      await this.props.login(email, password);
      AsyncStorage.getItem('@KeyAccessToken').then(accessToken => {
        if (accessToken !== null) {
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert('Gagal', 'Email atau password yang Anda masukan salah', [{ text: 'Tutup' }]);
        }
      });
    }
  };
}

export default { SigninComponent };
