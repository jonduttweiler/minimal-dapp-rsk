import styled from 'styled-components';


export const Flex = styled.div`
  display:flex;
  ${props => props.column && "flex-direction: column;"}
  ${props => props.row && "flex-direction: row;"}
  ${props => props.m && `margin: ${props.m};`}
  ${props => props.j && `justify-content: ${props.j};`}
  ${props => props.justify && `justify-content: ${props.justify};`}
  ${props => props.a && `align-content: ${props.a};`}
  ${props => props.align && `align-content: ${props.align};`}
  ${props => props.center && `align-content: center; justify-content:center;`}
`