import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CAMPAIGN_DATA,
} from "../../constants/ActionTypes";
import axios from '../../util/Api';





export const getCampaigns = () => {
  return (dispatch,getState) => {
    dispatch({type: FETCH_START});
    axios.get('/api/v1/campaign/',
    ).then(({data}) => {
      console.log("getCampaigns: ", data);
      if (data) {
        dispatch({type: FETCH_SUCCESS });
        dispatch({type: CAMPAIGN_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};



