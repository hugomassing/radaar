import styled from "styled-components";

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  padding: 0 16px;
  font: inherit;
  ::placeholder {
    color: #aaaaaa;
    font-weight: 100;
  }
  outline: 0;
`;

export default Input;
