import styled from 'styled-components'
import { Stack } from '@chakra-ui/react'

const Wrapper = styled(Stack)`
  display: flex;
  width: 100%;
  max-width: 48rem;
  flex-direction: column;
  position: relative;
  color: ${p => (p.colormode === 'dark' ? '#F7FAFC' : '#171923')};
  background: ${p => (p.colormode === 'dark' ? '#171923' : '#F7FAFC')};
  background-clip: padding-box;
  border: solid 5px transparent;
  border-radius: 1em;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -4px;
    border-radius: inherit;
    background: linear-gradient(to right, #63b3ed, #2b6cb0);
  }
`

export default Wrapper
