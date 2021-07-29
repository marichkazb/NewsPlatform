import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../globalStyles';


export const Nav  = styled.div `
   background: #75DDDD; 
   height: 80px; 
   display: flex; 
   align-items: center;
   justify-content: center; 
   font-size: 1.2rem;
   position: sticky;
   top: 0;
   z-index: 999;
   padding-left: 30px;
   color: #fff;

`


export const NavbarContainer = styled(Container) ` 
   display: flex; 
   justify-content: space-between;
   height: 80px;

   ${Container}
`


export const NavLogo = styled(Link) ` 
color: #fff; 
justify-self: flex-start; 
align-items: center; 
cursor: pointer;
margin: 20px; 
text-decoration: none; 
font-size: 2rem; 
display: flex; 
font-weight:bold;
font-family: 'Montserrat', sans-serif;
` 
export const MobileIcon = styled.div ` 
display: none;
margin: 20px;

@media screen and (max-width: 960px) { 
   display: block; 
   position: absolute; 
   top: 0; 
   right: 0;
   transform: translated(-100%, 60%); 
   font-size: 1.8rem; 
   cursor: pointer;
}
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: #101522;
    font-family: 'Montserrat', sans-serif;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    border-bottom: 2px solid #4b59f7;
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding-left: 2rem;
    width: 100%;


    &:hover {
      color: #004346;
      transition: all 0.3s ease;
    }
  }
`;