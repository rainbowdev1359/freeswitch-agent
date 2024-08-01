import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from "../store";

const SliderContainer = styled.div<{ isFull: boolean }>`
  width: ${(props) => (props.isFull ? '100%' : '235px')};
  flex-grow: 1;
`;

const StyledSlider = styled.input<{ theme: string, color?: string[] }>`
  -webkit-appearance: none;
  width: 300px;
  height: 8px;
  border-radius: 5px;
  background: ${(props) => props.theme === 'light' ? props.color ? props.color[0] : "#C9D5D8" : props.color ? props.color[1] : "#27798b"};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${(props) => props.theme === 'light' ? "#27798b" : "#d3dcdf"};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${(props) => props.theme === 'light' ? "#27798b" : "#d3dcdf"};
    cursor: pointer;
  }
`;

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  color?: string[];
  isFull?: boolean;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange, color, isFull = false }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <SliderContainer isFull={isFull}>
      <StyledSlider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        theme={theme}
        color={color}
      />
    </SliderContainer>
  );
};

export default Slider;