import styled from "styled-components"

export const ButtonWrapper = styled.button`
  background: #ff70a5;
  display: inline-flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  padding: 12px 18px;
  border-radius: 5px;
  border: none;
  transition: background 0.3s, color 0.3s;
  cursor: pointer;
  box-shadow: 0 3px 18px rgba(0, 0, 0, 0.3);
  margin-right: 16px;

  &:hover {
    color: black;
    background: #feaf6d;
  }
`
