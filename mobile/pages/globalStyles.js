import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle `
* { 
   box-sizing: border-box; 
   margin: 0; 
   padding: 0; 
   font-family: 'Noto Sans JP', sans-serif;
}
`; 

export const Container = styled.div ` 
z-index: 1; 
width: 100%; 
max-width: 1300px; 
margin-right: auto; 
margin-left: auto; 
padding-left: 50px; 
padding-right: 50px; 
`


export default GlobalStyles;
