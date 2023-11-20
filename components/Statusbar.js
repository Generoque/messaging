import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

const StatusBar = () => {
  return (
    <View style={styles.container}>
      <Text>Status Bar Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Constants.statusBarHeight,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatusBar;
