import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import PropTypes from "prop-types";
import React from "react";
const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress= {onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);
ToolbarButton.PropTypes={
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class Toolbar extends React.Component {

  setInputRef= (ref) => {
    this.input = ref;
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused){
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  handleFocus = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(true);
  };

  handleBlur = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(false);
  }

  static PropTypes = {
    isFocused: PropTypes.bool.isRequired,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
  };

  state = {
    text: "",
  };

  handleChangeText = (text) => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: " "});
  };

  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {},
  };

  render() {
    const {onPressCamera, onPressLocation} = this.props;
    const { text } = this.state;
    return (
    <View style={StyleSheet.toolbar}> 
    📷
    <ToolbarButton title={'C'} onPress={onPressCamera} /> 
    <ToolbarButton title={'L'} onPress={onPressLocation} /> 
    <View style = {styles.inputContainer}>
        <TextInput style={styles.input}
        underlineColorAndroid={"Transparent"}
        placeholder={"Type Something!"}
        blurOnSubmit={false}
        value={text}
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing}

        ref={this.setInputRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        />
      </View>
    </View> 
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "10",
    paddingHorizontal: "10",
    paddingLeft: 16,
    backgroundColor: "white",
  },

  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },

  input: {
    flex: 1,
    fontSize: 18,
  }
})