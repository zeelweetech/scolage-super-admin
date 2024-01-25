import styled from "styled-components";
import StaffItem from "./StaffItem";

const Wrapper = styled.div`
   .staff-info-block-main {
      display: flex;
      flex-wrap: wrap;
      gap: 78px 96px;
   }

   @media (min-width: 768px) and (max-width: 1280px) {
      .staff-info-block-main {
         gap: 42px 66px;
      }
   }
   @media (min-width: 1281px) and (max-width: 1440px) {
      .staff-info-block-main {
         gap: 44px;
      }
   }

   @media (min-width: 1441px) and (max-width: 1600px) {
      .staff-info-block-main {
         gap: 48px 62px;
      }
   }
`;

const StaffInfoBlock = ({ data }) => {
   return (
      <Wrapper>
         <div className="staff-info-block-main">
            {
               data?.map((item, index) => (
                  <StaffItem key={index} item={item} />
               ))
            }
         </div>
      </Wrapper>
   );
};

export default StaffInfoBlock;
