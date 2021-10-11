import React from "react";
import {Button, Card, Table} from "antd";
import { getCouponDetails } from '../../appRedux/actions/CouponDetails'
import {connect} from "react-redux";


class CouponDetails extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  constructor(props) {
    super(props);
    this.props.getCouponDetails('8031B2F8-932B-422E-A00D-C505BC03029A');
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  clearFilters = () => {
    this.setState({filteredInfo: null});
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  setNameSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'name',
      },
    });
  };

  render() {
    let {sortedInfo, filteredInfo} = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const { couponDetails } = this.props;
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {text: 'Joe', value: 'Joe'},
        {text: 'Jim', value: 'Jim'},
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    }, {
      title: 'CouponCode',
      dataIndex: 'couponCode',
      key: 'couponCode',
      filteredValue: filteredInfo.couponCode || null,
      sorter: (a, b) => a.couponCode.length - b.couponCode.length,
      sortOrder: sortedInfo.columnKey === 'couponCode' && sortedInfo.order,
    }];
    return (
      <Card title="Reset Filter">
        <div className="table-operations">
          <Button onClick={this.setNameSort}>Sort Name</Button>
        </div>
        <Table className="gx-table-responsive" columns={columns} dataSource={couponDetails} onChange={this.handleChange}/>
      </Card>
    );
  }
}




const mapStateToProps = ({coupon}) => {
 const { couponDetails } = coupon;
  return { couponDetails }
};

export default connect(mapStateToProps, {getCouponDetails})(CouponDetails);
