import styled from "styled-components";

const Wrapper = styled.div`
   .seats-block-main {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
   }

   .criteria-block-main {
      padding-top: 44px;
      .criteria-title {
         padding-bottom: 10px;
         font-weight: 400;
         font-size: 25px;
         line-height: 33px;
         color: #60269e;
      }
      .criteria-info {
         p {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;

            color: #7a86a1;
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      .seats-block-main {
         grid-template-columns: repeat(3, 1fr);
      }
   }
`;

const SeatsItemStyles = styled.div`
   .title {
      padding-bottom: 24px;
      h5 {
         font-weight: 400;
         font-size: 28px;
         line-height: 37px;
         color: #60269e;
      }
   }
   .seats {
      p {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #7a86a1;
      }
   }
`;

const SeatsItem = ({ title, seats, minFees, maxFees }) => (
   <SeatsItemStyles>
      <div className="title">
         <h5>{title}</h5>
      </div>
      <FeeItem minFees={minFees} maxFees={maxFees} />
      <div className="seats">
         <p>{seats} seats</p>
      </div>
   </SeatsItemStyles>
);

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

const FeeItem = ({ minFees, maxFees }) => (
   <FeeItemStyles>
      {/* <div className="fee-title">
         <h5>{title}</h5>
      </div> */}
      <div className="total-fee">
         <p>
            Fees: {minFees} | {maxFees}
         </p>
      </div>
   </FeeItemStyles>
);

const SubjectSeats = ({ data }) => {
   //    {
   //       title: "M.P.C",
   //       seats: 60,
   //    },
   //    {
   //       title: "Bi.P.C",
   //       seats: 50,
   //    },
   //    {
   //       title: "C.E.C",
   //       seats: 60,
   //    },
   //    {
   //       title: "M.Bi.P.C",
   //       seats: 60,
   //    },
   //    {
   //       title: "M.E.C",
   //       seats: 70,
   //    },
   // ];
   return (
      <Wrapper>
         <div className="seats-block-main">
            {data?.map((item, index) => (
               <SeatsItem title={item?.subjectname} seats={item?.no_of_seats} key={index} minFees={item?.minFees} maxFees={item?.maxFees} />
            ))}
         </div>
      </Wrapper>
   );
};

export default SubjectSeats;
