import styled from "styled-components";

const Wrapper = styled.div`
   width: 216px;

   .clg-image-block {
      height: 195px;
      border: 1px solid #707070;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 12px;
      img {
         height: 100%;
         width: 100%;
         object-fit: cover;
      }
   }

   .clg-img-info {
      background: #f8f8f8;
      border: 1px solid #707070;
      border-radius: 8px;
      min-height: 42px;
      padding: 5px 10px;

      p {
         font-weight: 400;
         font-size: 12px;
         line-height: 16px;
         color: #7a86a1;
      }
   }
`;

const ClgImageItem = ({img,info}) => {
   return (
      <Wrapper>
         <div className="clg-image-block">
            <img src={img} alt="" />
         </div>
         <div className="clg-img-info">
            <p>{info}</p>
         </div>
      </Wrapper>
   );
};

export default ClgImageItem;
