import styled from "styled-components";

export const Title = styled.div`
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.4px;
`;

export const Value = styled.span`
  font-family: "Montserrat";
  font-size: 20px;
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
  ${(props) => props.mt && `margin-top: ${props.mt};`}
  ${(props) => props.mx && `margin-left: ${props.mx};margin-right: ${props.mx};`}
  ${(props) => props.my && `margin-top: ${props.my};margin-bottom: ${props.my};`}
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

const font = `
font-family: "Montserrat";
`

export const Button = styled.button`
  cursor:pointer;
  color:white;
  ${props => props.disabled? "background-color:#CFCFCF;": "background-color:#173F5F;"}
  border:0px;
  padding: 8px 20px;
  border-radius:8px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  font-weight: bold;
  transition: all .1s ease-in-out;

  ${props =>  !props.disabled && `
  :hover {
    background-color:#0f2a40;
    transform: scale(1.1);
  }
  `}
  
  
`;

export const ConnectButton = styled.button`
  background-color: #53a653;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 24px;
  border: 0px;
  color: white;
  ${font}
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

export const H3 = styled.h3`
  border:2px solid red;
`