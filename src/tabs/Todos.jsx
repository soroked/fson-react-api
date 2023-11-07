import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
    newVaue: '',
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      this.setState({ todos: todos });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  onSubmit = value => {
    const todo = {
      text: value,
      id: nanoid(),
    };

    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleEditTodo = todo => {
    this.setState({ currentTodo: { ...todo }, isEditing: true });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleInputEditChange = evt => {
    this.setState(prevState => ({
      currentTodo: { text: evt.target.value, id: prevState.currentTodo.id },
    }));
  };

  handleEditFormUpdate = evt => {
    evt.preventDefault();

    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === prevState.currentTodo.id ? prevState.currentTodo : todo
      ),
      currentTodo: { id: '', text: '' },
      isEditing: false,
    }));
  };

  render() {
    const { todos, isEditing, currentTodo } = this.state;
    return (
      <>
        {isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            onCancel={this.handleCancel}
            onChange={this.handleInputEditChange}
            onUpdate={this.handleEditFormUpdate}
          />
        ) : (
          <SearchForm onSubmit={this.onSubmit} />
        )}
        <Grid>
          {todos.map(({ text, id }, idx) => (
            <GridItem key={id}>
              <Todo
                text={text}
                idx={idx}
                deleteTodo={this.deleteTodo}
                id={id}
                onEdit={this.handleEditTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
