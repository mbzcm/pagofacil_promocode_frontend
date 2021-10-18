import {INIT_URL, CAMPAIGN_DATA, CAMPAIGN_DATA_FILTER,CAMPAIGN_CATEGORY_DATA} from "../../constants/ActionTypes";

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
        campaignsFilter: action.payload,
      };
    }

    case CAMPAIGN_DATA_FILTER: {
      return {
        ...state,
        campaignsFilter: action.payload,
      };
    }

    case CAMPAIGN_CATEGORY_DATA: {
      return {
        ...state,
        categoryCampaign: action.payload,
      };
    }



    default:
      return state;
  }
}
