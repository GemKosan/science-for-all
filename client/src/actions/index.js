import streams from '../apis/streams';
import search from '../apis/search';
import history from '../history';
import * as types from './types';

export const signIn = (userId) => {
  return {
    type: types.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: types.CREATE_STREAM, payload: response.data});
  history.push('/');
};

export const searchPubMed = () => async dispatch => {
  const response = await search.get('esearch.fcgi?db=pubmed&term=science%5bjournal%5d+AND+breast+cancer+AND+2008%5bpdat%5d');

  dispatch({type: types.SEARCH_PUBMED, payload: response.data});
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({type: types.FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({type: types.FETCH_STREAM, payload: response.data});
}

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({type: types.EDIT_STREAM, payload: response.data});
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  
  dispatch({type: types.DELETE_STREAM, payload: id});
  history.push('/');
}