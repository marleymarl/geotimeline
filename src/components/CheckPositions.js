import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import * as global from '../global';
import axios from 'axios';
import { Table } from 'antd';

const MAX_TIME_DIFF = 15 * 60; // in seconds
const MAX_DISTANCE = 100; // in meters

export class CheckPositions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      data: null,
    };
  }

  componentDidMount() {
    if (this.props.positions.length === 0) return;
    this.setState(
      Object.assign({}, this.state, {
        error: null,
      }),
    );
    const boundaries = this.getBoundaries();
    this.loadConfirmedCases(boundaries)
      .then((resp) => {
        if (resp.errorMessage !== undefined) {
          this.setState(
            Object.assign({}, this.state, {
              loading: false,
              error: resp.errorMessage,
            }),
          );
          return;
        }
        const matches = this.findMatches(resp);
        this.setState(
          Object.assign({}, this.state, {
            loading: false,
            data: matches,
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBoundaries() {
    let minLat = 1000.0,
      maxLat = -1000.0;
    let minLng = 1000.0,
      maxLng = -1000.0;
    let minTime = Number.MAX_VALUE,
      maxTime = 0;
    for (let pos of this.props.positions) {
      if (pos.lng < minLng) minLng = pos.lng;
      if (pos.lng > maxLng) maxLng = pos.lng;
      if (pos.lat < minLat) minLat = pos.lat;
      if (pos.lat > maxLat) maxLat = pos.lat;
      const ts = pos.date.getTime();
      if (ts < minTime) minTime = ts;
      if (ts > maxTime) maxTime = ts;
    }
    return {
      lng: [minLng, maxLng],
      lat: [minLat, maxLat],
      timestamp: [new Date(minTime), new Date(maxTime)],
    };
  }

  loadConfirmedCases(boundaries) {
    const url =
      `${global.API_URL}/getfootprints?lng=${boundaries.lng[0]}~${boundaries.lng[1]}` +
      `&lat=${boundaries.lat[0]}~${boundaries.lat[1]}` +
      `&timestamp=${boundaries.timestamp[0].toISOString()}~${boundaries.timestamp[1].toISOString()}`;
    return axios({
      method: 'get',
      url: url,
      headers: global.JSON_TYPE,
    }).then((data) => {
      return data.data;
    });
  }

  findMatches(allCases) {
    const result = [];
    let counter = 0;
    for (let casePos of allCases) {
      //console.log(casePos);
      const caseDate = Date.parse(
        casePos.date.replace(/T\d+.+$/, `T${casePos.time}`),
      );
      if (isNaN(caseDate)) continue;
      for (let userPos of this.props.positions) {
        // time diff, in seconds
        const timeDiff = Math.round(
          Math.abs(userPos.date.getTime() - caseDate) / 1000,
        );
        if (timeDiff > MAX_TIME_DIFF) continue;
        // distance in meters
        const distance = Math.round(
          this.distance(
            casePos.latitude,
            casePos.longitude,
            userPos.lng,
            userPos.lat,
          ),
        );
        if (distance > MAX_DISTANCE) continue;

        result.push({
          key: counter++,
          caseId: casePos.case_id,
          timeDiff: timeDiff,
          distance: distance,
        });
      }
    }
    return result;
  }

  distance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // km
    return (
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1),
      ) * R
    );
  }

  renderMatchResult() {
    if (this.data && this.data.length) {
      return this.renderMatchesTable();
    }
    return (
      <div className="ant-typography">
        You're not contacted the confirmed cases
      </div>
    );
  }

  renderMatchesTable = () => {
    const columns = [
      { title: 'Case Id', dataIndex: 'caseId' },
      { title: 'Distance, m', dataIndex: 'distance' },
      {
        title: 'Time diff',
        render: (_, record) => {
          const minutes = Math.round(record.timeDiff / 60);
          const h = Math.floor(minutes / 60);
          const m = h % 60;
          if (h == 0) return `${m}m`;
          return `${h}h${m}m`;
        },
      },
    ];
    return (
      <Table
        dataSource={this.state.data}
        columns={columns}
        pagination={false} // buttons on bottom of table that show which page number to jump to
        className="table-column"
        size="small"
      ></Table>
    );
  };

  render() {
    return (
      <Modal visible={true} onCancel={this.props.onClose} footer="">
        {this.state.loading ? (
          <div>Loading data...</div>
        ) : this.state.error ? (
          <div className="ant-typography ant-typography-danger">
            <div>{this.state.error}</div>
            <Button type="danger" onClick={() => this.componentDidMount()}>
              Repeat
            </Button>
          </div>
        ) : (
          this.renderMatchResult()
        )}
      </Modal>
    );
  }
}
