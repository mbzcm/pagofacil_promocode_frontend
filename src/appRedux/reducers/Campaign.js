import {INIT_URL, CAMPAIGN_DATA} from "../../constants/ActionTypes";

const INIT_STATE = {
  initURL: '',

};

export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case CAMPAIGN_DATA: {
      return {
        ...state,
        campaigns: action.payload,
      };
    }



    default:
      return state;
  }
}
