import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.SEARCH_PUBMED:
      // TODO: handle results from pubmed
      alert(action.payload);
      return state;
    // case types.FETCH_STREAMS:
    //   return { ...state, ..._.mapKeys(action.payload, 'id') }
    // case types.FETCH_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case types.CREATE_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case types.EDIT_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };
    // case types.DELETE_STREAM:
    //   return _.omit(state, action.payload);
    default:
        return state;
  }
}