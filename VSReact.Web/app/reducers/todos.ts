import { ADD_TODO, DELETE_TODO, EDIT_TODO, MARK_TODO, MARK_ALL, CLEAR_MARKED } from '../constants/ActionTypes';

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

export default function todos(state = initialState, action) {
  switch (action.type) {
  case ADD_TODO:
    return [{
      id: (state.length === 0) ? 0 : state[0].id + 1,
      completed: false,
      text: action.text
    }, ...state];

  case DELETE_TODO:
    return state.filter(todo =>
      todo.id !== action.id
    );

  case EDIT_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        { ...todo, text: action.text } :
        todo
    );

  case MARK_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        { ...todo, completed: !todo.completed } :
        todo
    );

  case MARK_ALL:
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => ({
      ...todo,
      completed: !areAllMarked
    }));

  case CLEAR_MARKED:
    return state.filter(todo => todo.completed === false);

  default:
    return state;
  }
}
