import { StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
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
  Alert.alert(
    "Delete Message",
    'Are you sure you want to delete this message?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: "Delete",
        onPress: () => this.deleteMessage(message),
        style: 'destructive'
      },
    ]
  );
};
  deleteMessage = (message) => {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((msg) => msg !== message),
    }));
  };

renderMessageList() {
  return (
    <View style={styles.content}>
      {this.state.messages.map((message, index) => (
        <TouchableOpacity
        key={index}
        onPress={() => this.handlePressMessage(message)}>
          <View style={styles.messageContainer}>
            <MessageList messages={[message]} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
render () {
  return this.renderMessageList();
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center'
  },
  content: {
    flex:1,
    width: '100%'
  },

  messageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },

});

export default Messenger;