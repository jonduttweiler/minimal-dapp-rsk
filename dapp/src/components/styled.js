import styled from 'styled-components';

export const TransactionStatus = styled.div`
  padding:5px 25px;
  font-family: "Montserrat";
  font-size:20px;
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