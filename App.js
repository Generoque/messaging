import { StyleSheet, Text, View, Alert, TouchableOpacity, BackHandler, Image, Modal } from 'react-native';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage} from './utils/MessageUtils';
import React, { Component } from 'react';

class Messenger extends Component {
  state = {
    messages: [
      createImageMessage('https://wallpapers.com/images/high/meme-faces-funny-pictures-suucz4botm3ebwmh.webp'),
      createTextMessage('Gene Roque'),
      createTextMessage('CPE41S4'),
      createLocationMessage({
        latitude: 37.123123123,
        longitude: -122.4324,
      }),
    ],
    selectedImage: null,
    fullScreen: false,
  };

  handlePressMessage = (message) => {
    if (message.type === 'image') {
      this.setState({ selectedImage: message.uri, fullScreen: true });
      return true;
    }
    return false;
  };

  deleteMessage = (message) => {
    this.setState((prevState ) => ({
      messages: prevState.messages.filter((msg) => msg !== message),
    }));
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.fullScreen) {
      this.setState({ fullScreen: false });
      return true;
    }
    return false;
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        {messages.map((message, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const handled = this.handlePressMessage(message);
              if (!handled) {
                this.handlePressMessage(message);
              }
            }}
          >
            <View style={styles.messageContainer}>
              <MessageList messages={[message]} />
            </View>
          </TouchableOpacity>
        ))}
        {this.state.fullScreen && (
          <Modal
            visible={this.state.fullScreen}
            onRequestClose={() => this.setState({ fullScreen: false })}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.setState({ fullScreen: false })}
            >
              <Image
                source={{ uri: this.state.selectedImage }}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    );
  }

  render() {
    return this.renderMessageList();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  messageContainer:{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default Messenger;
