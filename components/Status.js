import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';

export default class Status extends Component {
  state = {
    isConnected: true, 
  };

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  render() {
    const { isConnected } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={isConnected ? 'white' : 'red'} barStyle={isConnected ? 'dark-content' : 'light-content'} />

        {!isConnected && (
          <View style={styles.messageContainer}>
            <View style={styles.bubble}>
              <Text style={styles.text}>No connection</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
