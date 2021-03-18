import styled from 'styled-components';


export const Flex = styled.div`
  display:flex;
  ${props => props.column && "flex-direction: column;"}
  ${props => props.row && "flex-direction: row;"}
  ${props => props.m && `margin: ${props.m};`}
`