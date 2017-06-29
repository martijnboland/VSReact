import * as React from 'react';
import TodoItemComponent from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/TodoFilters';
import { TodoItem } from "../model/TodoItem";

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_UNMARKED]: todo => !todo.completed,
  [SHOW_MARKED]: todo => todo.completed
};

interface IMainSectionProps {
  todos: TodoItem[],
  actions: any
}

interface IMainSectionState {
  filter: string
}

export default class MainSection extends React.Component<IMainSectionProps, IMainSectionState> {

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearMarked = () => {
    const atLeastOneMarked = this.props.todos.some(todo => todo.completed);
    if (atLeastOneMarked) {
      this.props.actions.clearMarked();
    }
  }

  handleShow = (filter: string) => {
    this.setState({ filter });
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const markedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className='main'>
        {this.renderToggleAll(markedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItemComponent key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(markedCount)}
      </section>
    );
  }

  renderToggleAll(markedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input className='toggle-all'
               type='checkbox'
               checked={markedCount === todos.length}
               onChange={actions.markAll} />
      );
    }
  }

  renderFooter(markedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const unmarkedCount = todos.length - markedCount;

    if (todos.length) {
      return (
        <Footer markedCount={markedCount}
                unmarkedCount={unmarkedCount}
                filter={filter}
                onClearMarked={this.handleClearMarked}
                onShow={this.handleShow} />
      );
    }
  }
}
