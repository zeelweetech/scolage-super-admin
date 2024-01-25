import styled from "styled-components";

const Wrapper = styled.div`
   display: flex;
   gap: 10px;

   p {
      width: 50%;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #000000;
      text-transform: capitalize;
   }
   span {
      width: 50%;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      color: #7a86a1;
      text-transform: capitalize;
   }
`;

const StudentDetail = ({ title, name }) => {
   return (
      <Wrapper>
         <p>{title}</p>
         <span>{name}</span>
      </Wrapper>
   );
};

export default StudentDetail;
