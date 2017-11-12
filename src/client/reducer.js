const initialState = {
  counter: 0,
};

export const increase = () => ({ type: 'INC' });

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};
