import styled from 'styled-components';
import SimpleStorage from "./components/SimpleStorage";

const AppWrapper = styled.div`
  width:100%;
  height:100vh;
  box-sizing:border-box;
  position:relative;
  border:2px solid palevioletred;
`

function App() {
  return (
    <AppWrapper>
      <SimpleStorage />
    </AppWrapper>
  );
}

export default App;
