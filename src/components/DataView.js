import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import * as moment from 'moment';
import * as global from '../global';
import 'antd/dist/antd.css';

export default class DataView extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getFootprintsData();
  }

  getFootprintsData = () => {
    axios({
      method: 'get',
      url: global.API_URL + '/getfootprints',
      headers: global.JSON_TYPE,
    }).then((data) => {
      return this.setState({ data: data.data });
    });
  };

  render() {
    const dataSource = this.state.data.map((footprint, idx) => {
      return {
        key: idx,
        case_id: footprint.case_id,
        date: moment(footprint.date).format('ddd, ll'),
        time: footprint.time,
        latitude: footprint.latitude,
        longitude: footprint.longitude,
      };
    });
    const columns = [
      {
        title: 'case_id',
        dataIndex: 'case_id',
        sorter: (a, b) => a.case_id - b.case_id,
      },
      {
        title: 'date',
        dataIndex: 'date',
        filters: [
          {
            text: 'Last 15 days',
            value: '15',
          },
          {
            text: 'Last 5 days',
            value: '5',
          },
        ],
        onFilter: (value, record) => moment(record.date) > moment().subtract(value, 'days'),
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'time',
        dataIndex: 'time',
        sorter: (a, b) => a.time - b.time,
      },
      {
        title: 'latitude',
        dataIndex: 'latitude',
        sorter: (a, b) => a.latitude - b.latitude,
      },
      {
        title: 'longitude',
        dataIndex: 'longitude',
        sorter: (a, b) => a.longitude - b.longitude,
      },
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={true}
        className="table-column"
        size="large"
      />
    );
  }
}
