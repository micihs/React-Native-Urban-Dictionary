import { registerRootComponent } from 'expo';
import React ,{ Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import AppStack from "./src/Navigation/AppStack";
import NoConnection from './src/components/NoConnection';
export default class UrbanDictionary extends Component {
  state = {
    isNetworkConnected: false,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    NetInfo.isConnected.fetch().then(isConnected => {
      {this.setState({ status: isConnected });}
    });
    console.log('component did mount')
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  };

  handleConnectionChange = (isConnected) => {
    this.setState({isNetworkConnected: isConnected});
    console.log(`is Connected: ${isConnected}`);
  }; 

  render() {
    if (this.state.isNetworkConnected === false) {
      return (<NoConnection/>)
    } else {
      <AppStack/>
    };
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

registerRootComponent(UrbanDictionary);