import {INIT_URL, COUPON_DETAILS_DATA, COUPON_DATA, COUPON_UPDATE_DATA, FETCH_ERROR , FETCH_ERROR_UPDATE} from "../../constants/ActionTypes";

const INIT_STATE = {
  initURL: '',

};

export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case COUPON_DETAILS_DATA: {
      return {
        ...state,
        couponDetails: action.payload,
      };
    }

    case COUPON_DATA: {
      return {
        ...state,
        couponData: action.payload,
      };
    }

    case COUPON_UPDATE_DATA: {
      return {
        ...state,
        couponResponse: action.payload,
      };
    }

    case FETCH_ERROR: {
      return {
        ...state,
        couponError: action.payload,
      };
    }

    case FETCH_ERROR_UPDATE: {
      return {
        ...state,
        couponUpdateError: action.payload,
      };
    }



    default:
      return state;
  }
}
