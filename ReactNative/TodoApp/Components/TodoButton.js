import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

//This component takes in onPress, complete, and name as props.
const TodoButton = ({ onPress, complete, name }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor='#efefef'
    style={styles.button}>
    <Text style={[
      styles.text,
      complete ? styles.complete : null, //Here we are checking to see if complete is true and applying a style
      //We are also checking to see if the name property equals 'Delete' and also applying a style if it is the case.
      name === 'Delete' ? styles.deleteButton : null ]}
     >
      {name}
    </Text>
  </TouchableHighlight>
)
 
const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    padding: 7,
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 5
  },
  text: {
    color: '#666666'
  },
  complete: {
    color: 'green',
    fontWeight: 'bold'
  },
  deleteButton: {
    color: 'rgba(175, 47, 47, 1)'
  }
})
export default TodoButton
// A.   This component takes in onPress, complete, and name as props.
// B.   Here we are checking to see if complete is true and applying a style
// C.   We are also checking to see if the name property equals 'Delete' and also applying a style if it is the case.