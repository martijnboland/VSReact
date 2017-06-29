import * as React from 'react';
import * as classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { TodoItem as TodoItemModel } from '../model/TodoItem';

interface ITodoItemProps {
  todo: TodoItemModel,
  editTodo(id: number, text: string): void,
  deleteTodo(id: number): void,
  markTodo(id: number)
}

interface ITodoItemState {
  editing: boolean
}

export default class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, markTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.completed}
                 onChange={() => markTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className='destroy'
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}
