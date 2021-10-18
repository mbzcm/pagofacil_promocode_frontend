import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR_UPDATE,
  INIT_URL,
  COUPON_DETAILS_DATA,
  COUPON_DATA,
  COUPON_UPDATE_DATA,
} from "../../constants/ActionTypes";
import axios from '../../util/Api';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};




export const getCouponDetails = () => {
  return (dispatch,getState) => {
    dispatch({type: FETCH_START});
    axios.get('/api/v1/coupon',
    ).then(({data}) => {
      console.log("getCouponDetails: ", data);
      if (data) {
        dispatch({type: FETCH_SUCCESS });
        dispatch({type: COUPON_DETAILS_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};


export const AddCoupon = (campaignIdExternal, name, email) => {
  return (dispatch,getState) => {
    dispatch({type: FETCH_START});
    axios.post('/api/v1/coupon',{ campaignIdExternal, name, email }
    ).then(({data}) => {
      console.log("AddCoupon: ", data);
      if (data) {
        dispatch({type: FETCH_SUCCESS });
        dispatch({type: COUPON_DATA, payload: data});
        dispatch({type: FETCH_ERROR, payload: ""});
      } else {
        dispatch({type: FETCH_ERROR, payload: data});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data});
      console.log("Error****:", error.response.data);
    });
  }
};


export const UpdateCoupon = (couponCode) => {
  return (dispatch,getState) => {
    dispatch({type: FETCH_START});
    axios.put('/api/v1/coupon',{ couponCode}
    ).then(({data}) => {
      console.log("UpdateCoupon: ", data);
        dispatch({type: FETCH_SUCCESS });
        dispatch({type: COUPON_UPDATE_DATA, payload: "Success"});
        dispatch({type: FETCH_ERROR_UPDATE, payload: ""});
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR_UPDATE, payload: error.response.data});
      console.log("Error****:", error.message);
    });
  }
};


export const ResetStates = (couponCode) => {
  return (dispatch,getState) => {
    dispatch({type: COUPON_UPDATE_DATA, payload: ""});
    dispatch({type: COUPON_DATA, payload: ""});
    dispatch({type: FETCH_ERROR_UPDATE, payload: ""});
    dispatch({type: FETCH_ERROR, payload: ""});

  }
};



