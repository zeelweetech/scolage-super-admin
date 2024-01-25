import styled from "styled-components";

const Wrapper = styled.div`
   .fees-block-main {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
   }

   .fee-terms-block {
      padding-bottom: 64px;
      &:last-child{
         padding-bottom: 0;
      }
      .terms-title {
         padding-bottom: 10px;
         h4 {
            font-weight: 400;
            font-size: 25px;
            line-height: 33px;
            color: #60269e;
         }
      }
      .terms {
         p {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #7a86a1;
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      .fees-block-main {
      grid-template-columns: repeat(3, 1fr);
   }  
   }
`;

const FeeItemStyles = styled.div`
   .fee-title {
      padding-bottom: 24px;
      h5 {
         font-weight: 400;
         font-size: 28px;
         line-height: 37px;
         color: #60269e;
      }
   }
   .total-fee {
      p {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #7a86a1;
      }
   }
`;

const FeeItem = ({ title, fee }) => (
   <FeeItemStyles>
      {/* <div className="fee-title">
         <h5>{title}</h5>
      </div> */}
      <div className="total-fee">
         <p>Fees: {fee} | { fee}</p>
      </div>
   </FeeItemStyles>
);

const FeeStructureBlock = ({data}) => {   
   return (
      <Wrapper>
         {/* <div className="fees-block-main">
            {data.map((item, index) => (
               <FeeItem key={index} fee={item.fee} />
            ))}
         </div> */}

         <div className="fee-terms-block">
            <div className="terms-title">
               <h4>ELIGIBILITY CRITERIA</h4>
            </div>
            <div className="terms">
               <p>{data?.eligibility_criteria}
               </p>
            </div>
         </div>
         <div className="fee-terms-block">
            <div className="terms-title">
               <h4>FEE TERMS</h4>
            </div>
            <div className="terms">
               <p>{data?.fee_terms}
               </p>
            </div>
         </div>
      </Wrapper>
   );
};

export default FeeStructureBlock;
