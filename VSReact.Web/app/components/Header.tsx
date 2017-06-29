import * as React from 'react';
import TodoTextInput from './TodoTextInput';

interface IHeaderProps {
  addTodo(todo: string) : void
}

export default class Header extends React.Component<IHeaderProps, any> {
  
  handleSave = (text: string) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
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
