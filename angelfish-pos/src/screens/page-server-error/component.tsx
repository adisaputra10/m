import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  NetInfo
} from 'react-native';
import styles from './styles';
import store from '../../store/store';

export class PageServerErrorComponent extends Component<any, any> {
  static navigationOptions = {
    header: null,
    mode: 'modal'
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  tryAgain = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigation.goBack();
    }, 1000);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/im500ErrorGrey128Dp.png')} />
        </View>
        <Text style={styles.titleText}>Oops!</Text>
        <Text style={styles.contentText}>
          Maaf terjadi kesalahan pada sistem kami 😂. Silakan coba lagi!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={this.tryAgain} disabled={this.state.loading}>
            <View style={styles.buttonSectionContainer}>
              {!this.state.loading && <Text style={styles.buttonText}>Coba Lagi</Text>}
              {this.state.loading && <ActivityIndicator color="#fff" />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default PageServerErrorComponent;
