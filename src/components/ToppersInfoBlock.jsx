import styled from "styled-components";
import TopperInfoItem from "./TopperInfoItem";

const Wrapper = styled.div`
   .toppers-info-block {
      display: flex;
      flex-wrap: wrap;
      gap: 60px 40px;
   }

   @media (min-width: 1281px) and (max-width: 1600px) {
      .toppers-info-block {
         gap: 40px 14px;
      }
   }
`;

const ToppersInfoBlock = ({ data }) => {
   return (
      <Wrapper>
         <div className="toppers-info-block">
            {data?.map((item, index) => (
               <TopperInfoItem key={index} item={item} />
            ))}
         </div>
      </Wrapper>
   );
};

export default ToppersInfoBlock;
