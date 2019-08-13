import React, { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTodo: "",
      todos: [],
      placeholder: "Enter todo..."
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const todos = await response.json();

      this.setState({
        todos
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleTextChange = e => {
    const {
      target: { value }
    } = e;
    this.setState(
      {
        activeTodo: value
      },
      () => {
        console.log(this.state.activeTodo);
      }
    );
  };
  addTodo = e => {
    if (this.state.activeTodo) {
      fetch("http://localhost:8000/todos", {
        method: "POST",
        body: JSON.stringify({
          // json server apparently solves the id itself, unique
          title: this.state.activeTodo
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(d => d.json())
        .then(todo => {
          this.setState({
            todos: [...this.state.todos, todo],
            activeTodo: ""
          });
        });
    } else {
      this.setState({
        placeholder: "No empty todos"
      });
    }
  };

  delTodo = e => {
    fetch(`http://localhost:8000/todos/${e}`, {
      method: "DELETE"
    });
  };

  render() {
    const { todos, activeTodo, placeholder } = this.state;
    return (
      <React.Fragment>
        <ul>
          {todos.map((todo, index) => (
            <li key={`${todo.id}_${index}`}>
              <div className="todoDiv">
                <span className="title">{todo.title}</span>
              </div>
              <div
                className="delBtn"
                onClick={e => {
                  this.delTodo(todo.id);
                  e.target.closest("li").remove();
                }}
              >
                ␡
              </div>
            </li>
          ))}
        </ul>
        <div className="addDiv">
          <input
            className="addInput"
            type="text"
            onChange={this.handleTextChange}
            value={activeTodo}
            placeholder={placeholder}
            onKeyUp={e => {
              console.log(e.keyCode);
              if (e.keyCode === 13) {
                document.querySelector("addBtn").click();
              }
            }}
          />
          <a href="#butty" id="butty" className="addBtn" onClick={this.addTodo}>
            Add a Todo
          </a>
        </div>
      </React.Fragment>
    );
  }
}
