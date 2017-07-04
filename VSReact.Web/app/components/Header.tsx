import * as React from 'react';
import TodoTextInput from './TodoTextInput';
import { TodoStore } from '../store/TodoStore';

interface IHeaderProps {
  todoStore: TodoStore
}

export default class Header extends React.Component<IHeaderProps, any> {
  
  handleSave = (text: string) => {
    if (text.length !== 0) {
      this.props.todoStore.addTodo(text);
    }
  }

  render() {
    return (
      <header className='header'>
          <h1>todos</h1>
          <TodoTextInput newTodo={true}
                         onSave={this.handleSave}
                         placeholder='What needs to be done?' />
      </header>
    );
  }
}
