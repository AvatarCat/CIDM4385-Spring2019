//react imports
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

//my imports
import Button from './Components/Button';
import Heading from './Components/Heading';
import Input from './Components/Input';
import TabBar from './Components/TabBar';
import TodoList from './Components/TodoList';
import Todo from './Components/Todo';

//global variable
let todoIndex = 0;

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      inputValue: '',
      todos: [],
      type: 'All',
    };

    //bind the event handler for submitting
    this.deleteTodo = this.deleteTodo.bind(this);    
    this.setType = this.setType.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    
  }

  deleteTodo(todoIndex) {

    let todos = this.state.todos;
    todos = todos.filter( (todo) => todo.todoIndex !== todoIndex);
    this.setState( {todos} );

  }

  //Here the inputChange method is created, which takes inputValue as an argument.
  inputChange(inputValue) {
    //Log out the inputValue value to make sure the method is working
    console.log(' Input value: ', inputValue);
    //Set the state with the new value ( same as this.setState({inputValue: inputValue}) )
    this.setState( {inputValue});
  }

  setType( type ){
    this.setState({type});
  }

  //submitting the TODO
  submitTodo () {

    if (this.state.inputValue.match(/^\s*$/)) {
      return
    }  // If nothing had been typed into the input, ignore
    const todo = {
      title: this.state.inputValue,
      todoIndex,
      complete: false
    } // if Input value is not empty then create a todo object
    todoIndex++ // increment the number of todos

    // push a new array into the local todos variable based on
    // the new todo plus all of the existing todos
    // the ... operator is called the 'spread' operator
    // as it takes all elements in an array/list and 
    // spreads them out individually.
    const todos = [...this.state.todos, todo];
    
    //update state with this new array
    this.setState({ todos, inputValue: '' }, () => {
      //the log is a quick check
      console.log('State: ', this.state)
    })
  }

  toggleComplete(todoIndex) {
    let todos = this.state.todos
    todos.forEach((todo) => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete
      }
    })
    this.setState({ todos })
  }

  render() {

    //destructure the state object
    const { inputValue, todos, type } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always'
                    style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)} />
          <TodoList toggleComplete={this.toggleComplete}
                    type={type}
                    deleteTodo={this.deleteTodo}
                    todos={todos} />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
        <TabBar type={type} setType={this.setType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});
