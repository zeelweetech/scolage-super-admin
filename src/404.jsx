import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  a{
    color: #60269E;
    margin: 10px;
    text-decoration: underline;
    text-underline-offset: 2px;
    font-size: large;
  }
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2em;
  text-align: center;
`;

const Error404 = () => {
  return (
    <Container>
    <Title>404 - Not Found</Title>
    <Description>Oops! The page you are looking for might be in another castle.</Description>
    <Link to={'/dashboard'}>Go to Dashboard</Link>
  </Container>
  )
}

export default Error404