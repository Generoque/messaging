import React from 'react';
import PropTypes from 'prop-types';
import { FlatList,Image,StyleSheet,Text,View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { MessageShape } from '../utils/MessageUtils';


const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
    };

    static defaultProps = {
        onPressMessage: () => {},
    };

    renderMessageContent = (item) => {
        const { onPressMessage} = this.props;

        switch (item.type){
            case 'text':
                return (
                    <View style={styles.messageRow}>
                        <View style={styles.messageBubble}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>

                    </View>
                );
            case 'image':
                return (
                    <View style={styles.messageRow}>
                        <Image style={styles.image} source={{uri: item.uri}}/>
                    </View>
                );
            case 'location':
                if( item.coordinate) {
                    return (
                        <View style={styles.messageRow}>
                            <View style={styles.mapContainer}>
                                <MapView
                                style ={styles.map}
                                initialRegion={{
                                    ...item.coordinate,
                                    latitudeDelta:0.08,
                                    longitudeDelta: 0.04,
                                }}>
                                    <Marker coordinate={item.coordinate} />
                                </MapView>
                            </View>
                        </View>
                    );
                } else {
                    return <Text style={styles.locationText}>Location Data is missing</Text>;
                }
                default:
                    return null;
        }
    };

    render() {
        const {messages} = this.props;

        return (
            <FlatList
            style = {styles.container}
            inverted
            data={messages}
            renderItem={({item})=> this.renderMessageContent(item)}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            />
        );
    }

}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        overflow: 'visible',
        backgroundColor: "RED",
        marginTop:40,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom:16,
    },
    messageRow:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:30,
        marginBottom:10,
    },
    messageBubble: {
        backgroundColor:'#0084ff',
        padding: 10,
        borderRadius: 20,
    },
    text: {
        color:'#000',
        fontSize:16,
    },
    image: {
        height:200,
        width:200,
        borderRadius:8,
    },
    mapContainer: {
        height:200,
        width:200,
        borderRadius:8,
        overflow:'hidden',
    },
    map:{
        flex:1,
        borderRadius:8,
    },
    locationText:{
        color:'red',
        fontStyle:'italic',
    },
});