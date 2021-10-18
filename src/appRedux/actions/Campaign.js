import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  CAMPAIGN_DATA,
  CAMPAIGN_DATA_FILTER,
  CAMPAIGN_CATEGORY_DATA,
} from "../../constants/ActionTypes";
import axios from '../../util/Api';





export const getCampaigns = () => {
  return (dispatch,getState) => {
    dispatch({type: FETCH_START});
    axios.get('/api/v1/campaign/',
    ).then(({data}) => {
      console.log("getCampaigns: ", data);
      if (data) {
        const distinctCategory =  [...new Set(data.map(item => item.categoryIdExternal))];
        dispatch({type: FETCH_SUCCESS });
        dispatch({type: CAMPAIGN_DATA, payload: data});
        dispatch({type: CAMPAIGN_CATEGORY_DATA, payload: distinctCategory});
      } else {
        dispatch({type: FETCH_ERROR, payload: data});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};


export const filterCampaign = (categoryIdExternal) => {
  return (dispatch,getState) => {
    const { campaign } = getState();
    const { campaigns } = campaign;
    const campaignsFilter = campaigns.filter((x) => x.categoryIdExternal === categoryIdExternal);
    dispatch({type: CAMPAIGN_DATA_FILTER, payload: campaignsFilter});
  }
};



