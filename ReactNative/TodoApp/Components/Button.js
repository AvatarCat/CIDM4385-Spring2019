import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

//Destructure the submitTodo function, which was passed as a prop to the component.
const Button = ({ submitTodo }) => (
  <View style={styles.buttonContainer}>
    {/* notice that JSX has a comment type as well */}
    {/* Attach submitTodo to the onPress function available to the TouchableHighlight component. This function will get called when the TouchableHighlight is touched or pressed */}
    <TouchableHighlight
      underlayColor='#efefef'
      style={styles.button}
      onPress={submitTodo}>
      <Text style={styles.submit}>
        Submit
      </Text>
    </TouchableHighlight>
  </View>
)
 
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end'
  },
  button: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
    width: 200,
    marginRight: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    color: '#666666',
    fontWeight: '600'
  }
});
export default Button;