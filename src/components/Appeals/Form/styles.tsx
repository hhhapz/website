import styled from "styled-components"

export const Form = styled.form`
  margin-top: 24px;

  & select,
  & input[type="text"],
  & textarea {
    display: block;
    height: 48px;
    font-size: 14px;
    background: ${(props) => props.theme.sidebar.background};
    color: ${(props) => props.theme.sidebar.foreground};
    border: none;
    border-radius: 1px;
    margin-bottom: 32px;
    width: 80%;
    padding-left: 8px;
  }

  & label {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    max-width: 80%;

    p {
      margin: 0;
    }

    small {
      font-weight: normal;
      font-size: 0.9rem;
    }
  }

  .required::after {
    content: "*";
    color: #f65c5c;
    margin-left: 4px;
  }

  & select {
    border-right: 8px solid ${(props) => props.theme.sidebar.background};
    font-weight: 700;
  }

  & textarea {
    resize: vertical;
    height: 96px;
    padding-top: 8px;
  }

  & input[type="submit"] {
    display: inline-block;

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
  }
`
