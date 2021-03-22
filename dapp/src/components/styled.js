import styled from "styled-components";
import { Button, withStyles } from "@material-ui/core";

export const Title = styled.div`
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.4px;
`;

export const Value = styled.span`
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: bold;
`;

export const TransactionStatus = styled.div`
  padding: 5px 25px;
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: bold;
`;

export const NetworkIndicator = styled.div`
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: bold;
`;

export const Div = styled.div`
  ${(props) => props.absolute && `position: absolute;`}
  ${(props) => props.relative && `position: relative;`}
  ${(props) => props.m && `margin: ${props.m};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.p && `padding: ${props.p};`}
  ${(props) => props.padding && `padding: ${props.padding};`}
`;

export const Flex = styled(Div)`
  display: flex;
  ${(props) => props.j && `justify-content: ${props.j};`}
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  ${(props) => props.a && `align-content: ${props.a};`}
  ${(props) => props.align && `align-content: ${props.align};`}
  ${(props) => props.center && `align-content: center; justify-content:center;`}
  ${(props) => props.column && "flex-direction: column;"}
  ${(props) => props.row && "flex-direction: row;"}
`;

export const CustomButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

export const ConnectButton = styled.button`
  background-color: #53a653;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 24px;
  border: 0px;
  color: white;
  font-family: "Montserrat";
  text-transform: capitalize;
  font-weight: bold;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  ${(props) => {
    if (props.outlined) {
      return `
      background-color:transparent;
      color:#53a653;
      `;
    } else {
      return `
      :hover{
        background-color:#376e37 ;
      }
    `;
    }
  }}
`;
