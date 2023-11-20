import { StyleSheet, Text, View } from 'react-native';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage} from './utils/MessageUtils';
import React, {Component} from 'react';

class Messenger extends Component {
  state = {
    messages: [
    createImageMessage('https://wallpapers.com/images/high/meme-faces-funny-pictures-suucz4botm3ebwmh.webp'),
    createTextMessage('Gene Roque'),
    createTextMessage('CPE41S4'),
    createLocationMessage ({
      latitude: 37.123123123,
      longitude: -122.4324,
    }),
 
 ],
}
handlePressMessage = (message) => {
  console.log('Message Pressed', message);
};

renderMessageList() {
  const {messages} = this.state;

  return (
    <View style={styles.content}>
      <MessageList messages ={messages} onPressMessage={this.handlePressMessage}/>
    </View>
  );
}
render () {
  return this.renderMessageList();
}

}
const styles = StyleSheet.create({
  content: {
    flex:1,
  },
});

export default Messenger;