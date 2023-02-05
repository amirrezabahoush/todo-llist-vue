import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  todos: [],
  completedFilter: 'pending'
};

const getters = {
  todoList: state => state.completedFilter === 'all' ? state.todos.slice(0, 12) : state.todos.filter(item => item.completed === (state.completedFilter === 'completed')).slice(0, 12),
  completedList: state => state.todos.filter(item => !item.completed)
};

const mutations = {
  GET_TODOS(state, todos) {
    state.todos = todos
  },
  ADD_TODO(state, { title, date }) {
    state.todos.unshift({
      title,
      id: Math.floor(1000 * Math.random()),
      userId: Math.floor(1000 * Math.random()),
      expirationDate: date,
      completed: false
    })
  },
  EDIT_TODO(state, todo) {
    const index = state.todos.findIndex(item => item.id === +todo.id);
    const data = [...state.todos];
    data[index].title = todo.title;
    data[index].isCompleted = todo.isCompleted;
    data[index].expirationDate = todo.date;
    state.todos = data;
  },
  REMOVE_TODO(state, todoID) {
    const todos = state.todos
    state.todos = todos.filter(item => item.id !== todoID)
  },
  CHANGE_STATUS(state, todo) {
    state.todos.find(item => item.id === todo.id).completed = true
  },
  CLEAR_TODO(state) {
    state.newTodo = ''
  },
  FILTER_DATA(state, filter) {
    state.completedFilter = filter
  }
};

const actions = {
  getTodo({ commit }, todo) {
    commit('GET_TODOS', todo)
  },
  addTodo({ commit }, todo) {
    commit('ADD_TODO', todo)
  },
  editTodo({ commit }, todo) {
    commit('EDIT_TODO', todo)
  },
  removeTodo({ commit }, todoID) {
    commit('REMOVE_TODO', todoID)
  },
  changeStatus({ commit }, todo) {
    commit('CHANGE_STATUS', todo)
  },
  clearTodo({ commit }) {
    commit('CLEAR_TODO')
  },
  setFilter({ commit }, filter) {
    commit('FILTER_DATA', filter)
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});