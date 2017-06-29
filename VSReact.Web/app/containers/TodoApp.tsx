import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
//import * as TodoActions from '../actions/TodoActions';
import * as TodoActions from '../actions/TodoActionsAsyncBackend';
import { TodoItem } from "../model/TodoItem";

interface TodoAppProps {
  actions: any,
  todos: TodoItem[]
}

class TodoApp extends React.Component<TodoAppProps, void> {

  componentDidMount() {
    if (this.props.actions.getTodos) {
      this.props.actions.getTodos();
    }
  }

  render() {
    const { todos, actions } = this.props;

    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators<any>(TodoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
