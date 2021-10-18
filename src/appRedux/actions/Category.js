import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CATEGORY_DATA,
} from "../../constants/ActionTypes";
import axios from '../../util/Api';





export const getCategories = () => {
  return (dispatch,getState) => {
    dispatch({type: FETCH_START});
    axios.get('/api/v1/category/',
    ).then(({data}) => {
      console.log("getCampaigns: ", data);
      if (data) {
        dispatch({type: FETCH_SUCCESS });
        dispatch({type: CATEGORY_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};






