import React from "react";
import {Button} from "antd";
import StarRatingComponent from "react-star-rating-component";

import IntlMessages from "util/IntlMessages";

const CampaignItem = ({product, grid,onClick}) => {
  const {image, campaignName, campaignSubName,campaignIdExternal, description} = product;
  return (

    <div className={`gx-product-item  ${grid ? 'gx-product-vertical' : 'gx-product-horizontal'}`}>
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-link gx-grid-thumb-cover">
            <img alt="Remy Sharp" src={image}/>
          </span>
        </div>
      </div>

      <div className="gx-product-body">
        <h3 className="gx-product-title">{campaignName}
          <small className="gx-text-grey">{", " + campaignSubName}</small>
        </h3>

        <p>{description}</p>
      </div>

      <div className="gx-product-footer">

        <Button type="primary" onClick={onClick}><IntlMessages id="campaign.getCuopon"/></Button>
      </div>
    </div>
  )
};

export default CampaignItem;

