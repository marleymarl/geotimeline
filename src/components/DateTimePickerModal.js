import React from 'react';
import { DatePicker, TimePicker, Modal } from 'antd';

const DateTimePickerModal = (props) => {

  const {
    visible, onOk, onCancel, okText, date,
    onDateChange, time, onTimeChange,
  } = props;

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
      />
      <TimePicker
        value={time}
        onChange={onTimeChange}
      />
    </Modal>
  );
};

export default DateTimePickerModal;