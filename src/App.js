import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import TaskAdder from './TaskAdder';

class App extends Component {
  constructor(props) {
    super(props);

    // The Parent holds the following in its state:
    //  taskArray: All the todo list items
    //  editMode: Flag whether we want to edit item text
    //  editId: The data-key index representing the item in the taskArray
    this.state = {
      taskArray: ['Buy food', 'Walk dogs', 'Make React lessons', 'Subvert the dominant paradigm'],
      editMode: false,
      editId: ''
    };

    // Binders required to make sure 'this' stays on this class
    this.addNewTask = this.addNewTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  // Method called by TaskAdder when the Add button is clicked
  // Passed in via props
  addNewTask(taskName) {
    var temp = this.state.taskArray;
    temp.push(taskName);
    // These this.setState calls require those bind() lines above
    this.setState({taskArray: temp});
  }

  // Method called by TaskList when the Done link is clicked
  // Passed in via props
  removeTask(taskId) {
    var temp = this.state.taskArray;
    temp.splice(taskId, 1);
    this.setState({taskArray: temp})
  }

  // Method called by TaskList when the Edit link is clicked
  // Passed in via props
  toggleEditMode(taskId) {
    console.log("App::toggleEditMode");
    this.setState({
      editMode: true,
      editId: taskId
    });
  }

  // Method called by TaskList when the Save Changes link is clicked
  // Passed in via props
  editTask(taskId, value) {
    // console.log("in the editTask");
    var tempArr = this.state.taskArray;
    tempArr[taskId] = value;
    this.setState({
      taskArray: tempArr,
      editMode: false,
      editId: ''
    });
  }

  render() {
    return (
      <div className="App">
        <TaskAdder className="TaskAdder" addNewTask={this.addNewTask}/>
        <TaskList editMode={this.state.editMode}
                  editId={this.state.editId}
                  toggleEditMode={this.toggleEditMode}
                  editTask={this.editTask}
                  removeTask={this.removeTask}
                  tasks={this.state.taskArray} />
      </div>
    );
  }
}

export default App;
