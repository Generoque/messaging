import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';
import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = item => item.id.toString();

export default class MessageList extends React.Component {

  static PropTypes = {
    message: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  //...

  renderMessageItem = ({ item }) => { const { onPressMessage } = this.props;
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={ () => onPressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
    //...
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case 'text': return (
        <View style={styles.messageBubble}>
          <Text style={styles.text}>{text}</Text>
        </View>
      );

      case 'imaged':
        return <Image style={styles.image} source ={{uri}}/>;

      case 'location': return (
        <MapView
          style={styles.map}
          initialRegion={{
            ...coordinate,
            latitudeDelta: 0.08,
            longitudeDelta: 0.04,
          }}
          >
            <MapView.Marker coordinate={coordinate}/>
          </MapView>
      );
      default:
        return null;
    }
  };
  //...

  render() {
    const { message } = this.props;
    return ( <FlatList
              style={StyleSheet.container}
              inverted
              data={message}
              renderItem={this.renderMessageItem} keyExtractor={keyExtractor}
              keyboardShouldPersistTaps={'handled'}
              />
      );
  }
}


//...
const styles = StyleSheet.create({
  container:{
    flex: 1,
    overflow: 'visible', // Prevents clipping on resize!
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 60,
    //bubbles: 'blue'
  },
});