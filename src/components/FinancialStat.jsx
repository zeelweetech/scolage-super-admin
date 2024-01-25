import styled from "styled-components";
import { CircleProgress } from "react-gradient-progress";

const Wrapper = styled.div`
   width: 230px;
   min-height: 170px;
   border: 1px solid #707070;
   border-radius: 20px;
   padding: 30px;
   position: relative;

   .title {
      h5 {
         font-weight: 400;
         font-size: 15px;
         line-height: 20px;
         color: #7a86a1;
         padding-bottom: 4px;
      }
   }
   .counter {
      p {
         font-weight: 400;
         font-size: 24px;
         line-height: 32px;
         color: #000000;
         padding-bottom: 4px;
      }

      .per-growth {
         font-weight: 400;
         font-size: 13px;
         line-height: 17px;
         color: #60269e;
      }

      .total-growth {
         display: flex;
         align-items: center;
         gap: 5px;
         padding: 5px 10px;
         background: #f6efff;
         border-radius: 10px;
         width: fit-content;

         .icon {
            width: 15px;
            height: 15px;
         }
         p {
            font-weight: 400;
            font-size: 13px;
            line-height: 17px;

            color: #60269e;
         }
      }
   }

   .circular-progress {
      position: absolute;
      right: 15px;
      bottom: 15px;
   }
`;

const FinancialStat = ({ title, counts, perGrow, percentage, totalGrowth = false }) => {
   return (
      <Wrapper>
         <div className="title">
            <h5>{title}</h5>
         </div>

         <div className="counter">
            <p>{counts}</p>

            {!totalGrowth ? (
               <div className="per-growth">+{perGrow}%</div>
            ) : (
               <div className="total-growth">
                  <div className="icon">
                     <img src={'/Arrow-Up.svg'} alt="" />
                  </div>
                  <p>+23</p>
               </div>
            )}
         </div>

         <div className="circular-progress">
            <CircleProgress percentage={percentage} strokeWidth={5} secondaryColor="#F6EFFF" width={70} primaryColor={["#EA5F8B", "#A654AC", "#6149CD"]} />
         </div>
      </Wrapper>
   );
};

export default FinancialStat;
