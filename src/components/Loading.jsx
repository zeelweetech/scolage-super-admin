import styled, { keyframes } from "styled-components";

const Loader = keyframes`
      0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoaderStyles = styled.div`
   display: inline-block;
   position: relative;
   width: 80px;
   height: 80px;
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   place-items: center;
   div {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #60269e;
      animation: ${Loader} 1.2s linear infinite;
      &:nth-child(1) {
         animation-delay: 0s;
      }
      &:nth-child(2) {
         animation-delay: -0.4s;
      }
      &:nth-child(3) {
         animation-delay: -0.8s;
      }
      &:nth-child(4) {
         animation-delay: -0.4s;
      }
      &:nth-child(5) {
         animation-delay: -0.8s;
      }
      &:nth-child(6) {
         animation-delay: -1.2s;
      }
      &:nth-child(7) {
         animation-delay: -0.8s;
      }
      &:nth-child(8) {
         animation-delay: -1.2s;
      }
      &:nth-child(9) {
         animation-delay: -1.6s;
      }
   }
`;

const PageStyle = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const Loading = () => {
   const randomGenerator = () => {
      const random = Math.floor(Math.random() * 10);
      return random;
   };
   return (
      <PageStyle>
         <LoaderStyles>
            {Array.from({ length: 9 }, (_, i) => (
               <div key={i} style={{ order: randomGenerator() }}></div>
            ))}
         </LoaderStyles>
      </PageStyle>
   );
};

export default Loading;
