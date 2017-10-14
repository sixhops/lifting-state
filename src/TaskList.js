import React, { Component } from 'react';
import './App.css';

class TaskList extends Component {
  constructor(props) {
    super(props);
    // The only state this component needs is for the temporary
    // storage of the newTaskName when a user wants to edit a
    // task.
    this.state = {
      newTaskName: ''
    };

    // Binders for 'this'
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  // This is the local function that handles the DONE click event
  // It calls the method passed in from the parent
  handleDoneClick(e) {
    e.preventDefault();
    // console.log(e.target.getAttribute('data-key'));
    var key = e.target.getAttribute('data-key');
    this.props.removeTask(key);
  }
  // This is the local function that handles the EDIT click event
  // It calls the method passed in from the parent
  handleEditClick(e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    this.props.toggleEditMode(key);
  }
  // This is the local function that handles the SAVE CHANGES click event
  // It calls the method passed in from the parent, then updates local state
  handleEditSubmit(e) {
    e.preventDefault();
    var key = e.target.getAttribute('data-key');
    var value = this.state.newTaskName;
    this.props.editTask(key, value);
    this.setState({newTaskName: ''});
  }
  // This is the local function that handles the text box change event
  // It is required for the text input to render correctly
  handleChange(e) {
    e.preventDefault();
    this.setState({newTaskName: e.target.value});
  }

  render() {
    return (
      <div>
        { // Here we start mapping tasks to little boxes
          this.props.tasks.map((item, index) => {
            // We branch on editMode and only make a textbox for the one clicked
            if (this.props.editMode && index == this.props.editId) {
              return (
                <div className="listItem" key={index}>
                  <input type="text" value={this.state.newTaskName} placeholder={item} onChange={this.handleChange} />
                  <a onClick={this.handleEditSubmit} data-key={index} > [Save Changes] </a>
                  <a onClick={this.handleDoneClick} data-key={index} >[Done] </a>
                </div>
              )
            } else {
              // Here we are not in edit mode, so only show the items
              return (
                <div className="listItem" key={index}>
                  {item}
                  <a onClick={this.handleEditClick} data-key={index} > [Edit] </a>
                  <a onClick={this.handleDoneClick} data-key={index} >[Done] </a>
                </div>
              )
            }
          })
        }
      </div>
    );
  }
}

export default TaskList;
