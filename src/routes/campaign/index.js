import React, {Component, useState } from "react";
import FlipMove from 'react-flip-move';
import shuffle from 'lodash/shuffle';
import CampaignItem from "../../components/eCommerce/CampaignItem";
import { Button,  Col, Form, Input, Modal, Row} from "antd";
import copy from 'copy-to-clipboard';
import Auxiliary from "../../util/Auxiliary";
import {connect} from "react-redux";
import {getCampaigns, AddCoupon, ResetStates} from "../../appRedux/actions";
import { Alert,Space  } from 'antd';

const customEnterAnimation = {
  from: {transform: 'scale(0.5, 1)'},
  to: {transform: 'scale(1, 1)'}
};

class Campaign extends Component {

  state = {
    loading: false,
    visible: false,
    currentCampaignIdExternal: '',
    name: '',
    email: ''
  };
  showModal = (campaignIdExternal) => {
    this.setState({
      visible: true,
      currentCampaignIdExternal: campaignIdExternal
    });

    this.props.ResetStates();
  };
  handleOk = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false, visible: false});
    }, 3000);
  };
  handleCancel = () => {
    this.setState({visible: false});
  };

  handleAddCoupon = () => {
     const {currentCampaignIdExternal, name , email} = this.state;
     this.props.AddCoupon(currentCampaignIdExternal, name, email);
  };

  constructor(props) {
    super(props);
    this.props.getCampaigns()
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      products: shuffle(this.state.products)
    });
  }

  sortRotate() {
    const products = this.state.products.slice();
    products.unshift(products.pop());
    this.setState({
      products
    });
  }


  render() {
    const { campaigns, couponData, couponError } = this.props;
    const {visible, loading } = this.state;
    const campaignsData = campaigns || [];
    const coupon = couponData || {}
    const error = couponError || {}
    const { detail } = error;
    const showPromoCode = coupon.couponCode === undefined ? false : true;
    return (
      <Auxiliary>
        <div>
          <Button onClick={this.sortShuffle}>Gastronomía</Button>
          <Button onClick={this.sortRotate}>Entretenimiento </Button>
        </div>
        <FlipMove
          staggerDurationBy="30"
          duration={500}
          enterAnimation={customEnterAnimation}>
          <Row>
            { campaignsData.map((campaign, index) => (
              <Col key={index} xl={6} md={8} sm={12} xs={24}>
                <CampaignItem key={index} grid product={campaign} onClick={() =>this.showModal(campaign.campaignIdExternal)}/>
              </Col>
            ))}
          </Row>
        </FlipMove>

        <Modal visible={visible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               footer={[
                 <Button key="Regresar" onClick={this.handleCancel}>Regresar</Button>,
                 <Button key="Generar Codigo" type="primary" loading={loading} onClick={() =>this.handleAddCoupon()}>
                   Generar Código
                 </Button>,
               ]}

               title={<h4 className="gx-text-primary gx-text-capitalize gx-mb-0">
          <i className="icon icon-mail-open gx-mr-3"

          />
          Pago-Facil Códigos Promocionales</h4>
        }>

            <h2 className="gx-mb-3 gx-mb-xxl-4 gx-font-weight-light">Ingresa tu nombre y correo y obten tu código promocional</h2>
            <Form className="gx-signup-form gx-form-row0 gx-mb-0">
              <div className="gx-mb-3">
                <Input type="Text" placeholder="Nombre" onChange={(e) => this.setState({name: e.target.value})}/>
              </div>
              <div className="gx-mb-3">
                <Input type="Email" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
              </div>
              { showPromoCode ?      <Alert
                description="Código Promocional solo es validó hasta el 23/12/2022."
                message={coupon.couponCode}
                type="success"
                action={
                  <Space>
                    <Button size="small" type="ghost" onClick={()=> copy(coupon.couponCode)}>
                      Copiar
                    </Button>
                  </Space>
                }
                closable
              /> : null }

              { detail?  <Alert message={detail} type="warning" />  : null }

            </Form>
        </Modal>
      </Auxiliary>
    );
  }
}


const mapStateToProps = ({campaign, coupon}) => {
  const { campaigns } = campaign;
  const { couponData, couponError } = coupon;
  return { campaigns, couponData,couponError }
};

export default connect(mapStateToProps, {getCampaigns, AddCoupon, ResetStates})(Campaign);



