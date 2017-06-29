import * as types from '../constants/ActionTypes';
import * as fetch from 'isomorphic-fetch'

declare const __API_URL__: string;

const apiUrl = __API_URL__;
const todoApiUrl = apiUrl + '/todo';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function handleApiError(error) {
  console.log('request failed', error)
}

function getTodosRequest() {
  return {
    type: types.GET_TODOS_REQUEST
  };
}

function getTodosSuccess(todos) {
  return {
    type: types.GET_TODOS_SUCCESS,
    todos: todos
  };
}

export function getTodos() {
  return (dispatch, getState) => {
    dispatch(getTodosRequest());
    fetch(todoApiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      dispatch(getTodosSuccess(data));
    })
    .catch(handleApiError);
  };
}

function addTodoRequest(text) {
  return {
    type: types.ADD_TODO_REQUEST,
    text: text
  }
}

function addTodoSuccess(id, text) {
  return {
    type: types.ADD_TODO_SUCCESS,
    id: id,
    text: text
  }
}

export function addTodo(text) {
  return (dispatch, getState) => {
    dispatch(addTodoRequest(text));
    fetch(todoApiUrl, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: text
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      dispatch(addTodoSuccess(data.id, data.title));
    })
    .catch(handleApiError);
  };
}

function deleteTodoRequest(id) {
  return {
    type: types.DELETE_TODO_REQUEST,
    id: id
  }
}

function deleteTodoSuccess(id) {
  return {
    type: types.DELETE_TODO_SUCCESS,
    id: id
  }
}

export function deleteTodo(id) {
  return (dispatch, getState) => {
    dispatch(deleteTodoRequest(id));
    fetch(`${todoApiUrl}/${id}`, {
      method: 'delete'
    })
    .then(checkStatus)
    .then(response => {
      dispatch(deleteTodoSuccess(id));
    })
    .catch(handleApiError);
  };
}

function editTodoRequest(id) {
  return {
    type: types.EDIT_TODO_REQUEST,
    id: id
  };
}

function editTodoSuccess(id, text) {
  return {
    type: types.EDIT_TODO_SUCCESS,
    id,
    text
  };
}

export function editTodo(id, text) {
  return (dispatch, getState) => {
    dispatch(editTodoRequest(id));
    fetch(`${todoApiUrl}/${id}`, {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: text
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      dispatch(editTodoSuccess(id, data.title));
    })
    .catch(handleApiError);
  };
}

function markTodoRequest(id)  {
  return {
    type: types.MARK_TODO_REQUEST,
    id: id
  }
}

function markTodoSuccess(id, completed)  {
  return {
    type: types.MARK_TODO_SUCCESS,
    id,
    completed
  }
}

export function markTodo(id) {
  return (dispatch, getState) => {
    dispatch(markTodoRequest(id));

    const todo = getState().todos.find(todo => { return todo.id === id });
    const completed = todo && ! todo.completed;

    fetch(`${todoApiUrl}/${id}`, {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: completed
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      dispatch(markTodoSuccess(id, completed));
    })
    .catch(handleApiError);
  };
}

function markAllRequest() {
  return {
    type: types.MARK_ALL_REQUEST
  }
}

function markAllSuccess(completed) {
  return {
    type: types.MARK_ALL_SUCCESS,
    areAllMarked: completed
  }
}

export function markAll() {
  return (dispatch, getState) => {
    const todos = getState().todos;
    const shouldMarkAll = todos.some(todo => !todo.completed);
    const markRequests = [];
    dispatch(markAllRequest());
    todos.forEach(todo => {
      markRequests.push(
        fetch(`${todoApiUrl}/${todo.id}`, {
          method: 'patch',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            completed: shouldMarkAll
          })
        })
        .then(checkStatus)
        .catch(handleApiError)
      );
    });
    Promise.all(markRequests)
    .then(() => dispatch(markAllSuccess(shouldMarkAll)));
  };
}

function clearMarkedRequest() {
  return {
    type: types.CLEAR_MARKED_REQUEST
  }
}

function clearMarkedSuccess(idsCleared) {
  return {
    type: types.CLEAR_MARKED_SUCCESS,
    idsCleared
  }
}

export function clearMarked() {
  return (dispatch, getState) => {
    const markedTodos = getState().todos.filter(todo => todo.completed);
    let clearRequests = [];
    let idsCleared = [];
    dispatch(clearMarkedRequest());
    markedTodos.forEach(todo => {
      clearRequests.push(
        fetch(`${todoApiUrl}/${todo.id}`, {
          method: 'delete'
        })
        .then(checkStatus)
        .then(() => idsCleared.push(todo.id))
        .catch(handleApiError)
      );
    });
    Promise.all(clearRequests)
    .then(() => {
      dispatch(clearMarkedSuccess(idsCleared));
    });
  };
}