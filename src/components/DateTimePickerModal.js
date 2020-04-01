import React from 'react';
import { DatePicker, TimePicker, Modal } from 'antd';
import moment from 'moment';

const DateTimePickerModal = (props) => {

  const {
    visible, onOk, onCancel, okText, date,
    onDateChange, time, onTimeChange,
  } = props;

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  function disabledHours() {
    let currentHour = new Date().getHours();
    return range(0, 24).splice(currentHour+1) 
  }

  function disabledMinutes() {
    let currentMinute = new Date().getMinutes();
    return range(currentMinute+1, 60);
  }

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
    >
      <DatePicker
        value={date}
        onChange={onDateChange}
        disabledDate={disabledDate}
      />
      <TimePicker
        value={time}
        onChange={onTimeChange}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
      />
    </Modal>
  );
};

export default DateTimePickerModal;