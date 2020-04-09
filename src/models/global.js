

export default {
  namespace: 'global',

  state: {
    menuVisibleList: {},
  },
  getters: {
    getMenuVisibleList(state) {
      return state.menuVisibleList
    },
  },
  reducers: {
    setMenuVisibleList(state, { payload }) {
      return {
        ...state,
        menuVisibleList: payload,
      };
    },
  },
};
