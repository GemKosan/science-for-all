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

export const pubMedSearchWithHistory = (term) => async dispatch => {
  console.log('SEARCHING');
  let result, retstart, retmax;
  try {
    dispatch({type: types.SEARCH_STATUS, payload: types.PUBMED_REQUESTING_SEARCH});
    let response = await search.get(`esearch.fcgi?retmode=json&db=pubmed&usehistory=y&term=${term}`);
    const { count, querykey, webenv } = response.data.esearchresult;
    console.log(response.data);
    if (count > 0) {
      dispatch({type: types.SEARCH_STATUS, payload: types.PUBMED_REQUESTING_SUMMARY});
      retstart = 1;
      retmax = 20;
      response = await search.get(`esummary.fcgi?retmode=json&retstart=${retstart}&retmax=${retmax}&db=pubmed&query_key=${querykey}&WebEnv=${webenv}`);
      result  = response.data.result;
      console.log(result);
    } 
    dispatch({type: types.SEARCH_STATUS, payload: types.PUBMED_REQUEST_COMPLETE});
    dispatch({ type: types.PUBMED_RESPONSE_DATA, payload: {count, querykey, webenv, result, retstart, retmax} });
  } catch (err) {
    console.error(`A network error occurred`);
  }
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: types.CREATE_STREAM, payload: response.data});
  history.push('/');
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