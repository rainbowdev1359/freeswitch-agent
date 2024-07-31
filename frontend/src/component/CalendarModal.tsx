import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
}

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover, &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onDateSelect(date);
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </ModalContent>
    </Modal>
  );
};

export default CalendarModal;
