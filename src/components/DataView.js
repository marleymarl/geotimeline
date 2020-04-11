import React, { Component } from 'react';
import axios from 'axios';
import {Button, Table} from 'antd';
import * as moment from 'moment';
import * as global from '../global';
import 'antd/dist/antd.css';
import { CSVLink } from "react-csv";

export default class DataView extends Component {
  state = { data: null };

  componentDidMount() {
    this.getFootprintsData();
  }

  getFootprintsData = () => {
    axios({
      method: 'get',
      url: global.API_URL + '/getrealfootprints',
      headers: global.JSON_TYPE,
    }).then((data) => {
      const dataSource = data.data.map(this.footprintToDataItem);
      return this.setState({
        data: dataSource,
        filteredData: dataSource,
      });
    });
  };

  footprintToDataItem(footprint, idx) {
    return {
      key: idx,
      case_id: footprint.case_id,
      date: moment(footprint.date).format('ddd, ll'),
      time: footprint.time,
      latitude: footprint.latitude,
      longitude: footprint.longitude,
    };
  }

  onChangeTable({currentDataSource}) {
    this.setState(Object.assign({}, this.state, {
      filteredData: currentDataSource,
    }));
  }

  loading() {
    return (<div>
      ...Loading
    </div>)
  }

  render() {
    if(!this.state.data) {
      return this.loading();
    }
    const dataSource = this.state.data;
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
      <div>
        <div className="dataview-heeader">
          <CSVLink data={this.state.filteredData} className="dataview-csv-button" filename="footprints.csv">
            <Button type="primary" >Save to CSV</Button>
          </CSVLink>
        </div>
        <Table
          dataSource={dataSource}
          onChange={(_, __, ___, ex) => this.onChangeTable(ex)}
          columns={columns}
          pagination={true}
          className="table-column"
          size="large"
        />
      </div>
    );
  }
}
