import React from 'react';
import moment from 'moment';
import { DatePicker, TimePicker, Modal, Button } from 'antd';

const DateTimePickerModal = (props) => {
  const {
    visible,
    onOk,
    onCancel,
    onDelete,
    editMode,
    date,
    onDateChange,
    time,
    onTimeChange,
  } = props;

  function disabledFutureDate(current) {
    return !moment().isAfter(current);
  }

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        editMode ? (
          ''
        ) : (
          <Button key="delete" type="danger" onClick={onDelete}>
            Delete
          </Button>
        ),
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          {editMode ? 'Save Footprint' : 'Update Footprint'}
        </Button>,
      ]}
    >
      <DatePicker
        value={date}
        onChange={onDateChange}
        disabledDate={disabledFutureDate}
      />
      <TimePicker value={time} onChange={onTimeChange} />
    </Modal>
  );
};

export default DateTimePickerModal;
