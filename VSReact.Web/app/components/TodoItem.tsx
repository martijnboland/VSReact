import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { TodoItem as TodoItemModel } from '../model/TodoItem';
import { TodoStore } from '../store/TodoStore';

interface ITodoItemProps {
  todo: TodoItemModel,
  todoStore?: TodoStore
}

interface ITodoItemState {
  editing: boolean
}

@inject('todoStore')
@observer
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
      this.props.todoStore.deleteTodo(id);
    } else {
      this.props.todoStore.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, todoStore} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.title}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.completed}
                 onChange={() => todoStore.toggleCompleted(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.title}
          </label>
          <button className='destroy'
                  onClick={() => todoStore.deleteTodo(todo.id)} />
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
