import styled from 'styled-components'

const ButtonStyles = styled.button`
  background: linear-gradient(90deg, #6149CD 0%, #A654AC 47%, #EA5F8B 100%);
  filter: drop-shadow(3.994px 22.651px 57px rgba(97, 73, 205, 0.259));
  padding: 16px;
  width: 100%;
  font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;
    border-radius: 20px;
    transition: all .10s ease-in-out;
    outline: none;

    &:active{
        transform: scale(0.95);
    }
`


const Button = ({children, type}) => {
    return (
      <ButtonStyles type={type}>{children}</ButtonStyles>
  )
}

export default Button