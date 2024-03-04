import { RadioButton } from "primereact/radiobutton";
import styled from "styled-components";

const Wrapper = styled.div``;

const RadioButtons = ({
  acdType,
  setAcdType,
  acdTypeOpt,
  name,
  handleRadioChange,
}) => {
  return (
    <>
      {acdTypeOpt.map((item, index) => (
        <Wrapper key={index} className="flex align-items-center">
          <RadioButton
            inputId={item}
            name={name}
            value={item}
            onChange={(e) => {
              handleRadioChange
                ? handleRadioChange(name, e.value)
                : setAcdType(e.value);
            }}
            checked={acdType === item}
          />
          <label htmlFor={item} className="ml-2">
            {item}
          </label>
        </Wrapper>
      ))}
    </>
  );
};

export default RadioButtons;
