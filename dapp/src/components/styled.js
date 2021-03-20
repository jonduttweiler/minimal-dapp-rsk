import styled from 'styled-components';
import {
  Button,
  withStyles,
} from "@material-ui/core";

export const Title = styled.div`
  font-family: "Montserrat";
  font-size:20px;
  font-weight:bold;
  letter-spacing:0.4px;
`


export const TransactionStatus = styled.div`
  padding:5px 25px;
  font-family: "Montserrat";
  font-size:18px;
  font-weight:bold;
`

export const NetworkIndicator = styled.div`
  font-family: "Montserrat";
  font-size:16px;
  font-weight:bold;
`

export const Div = styled.div`
  ${props => props.absolute && `position: absolute;`}
  ${props => props.relative && `position: relative;`}
  ${props => props.m && `margin: ${props.m};`}
  ${props => props.p && `padding: ${props.padding};`}
  
`

export const Flex = styled(Div)`
  display:flex;
  ${props => props.j && `justify-content: ${props.j};`}
  ${props => props.justify && `justify-content: ${props.justify};`}
  ${props => props.a && `align-content: ${props.a};`}
  ${props => props.align && `align-content: ${props.align};`}
  ${props => props.center && `align-content: center; justify-content:center;`}
  ${props => props.column && "flex-direction: column;"}
  ${props => props.row && "flex-direction: row;"}
`

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
