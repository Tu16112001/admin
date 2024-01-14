import styled from 'styled-components'

export const HeaderPage = styled.div`
position: absolute;
top: 101px;
left: 0;
width:18%;
height:100%;
display:flex;
flex-direction: column;
border-right: 2px solid rgb(207, 206, 206);
`
export const ButtonComponent = styled.button`
    width: 100%;
   height: 45px;
   border: none;
   margin: 0 0 2px 0;
   background: white;
   font-size: 15px;
   &:hover  {
    opacity: 0.7; 
    border-right: 3px solid blue;
    background: rgb(146, 204, 241);
  }
  &:focus {
    outline: none;
  }
`

export const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  cursor: pointer;
  &.reverse {
    flex-direction: column-reverse;
  }

  a {
    cursor: pointer;
    width: 100%;
    height: 35px;
   
    text-align:center;
    &:hover  {
      opacity: 0.6; 
      border-right: 3px solid blue;
      background: rgb(146, 204, 241);
    }
  }
`;