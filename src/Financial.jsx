import styled from "styled-components";
import Layout from "./components/Layout";
import FinancialStat from "./components/FinancialStat";
import Calendar from "./components/Calendar";
import TransactionHistoryTable from "./components/TransactionHistoryTable";

const Wrapper = styled.div`
   display: flex;
   align-items: stretch;
   gap: 60px;

   .financial-left-main {
      flex: 2;

      .financial-stats-main {
         display: flex;
         flex-wrap: wrap;
         gap: 32px;
      }

      .transaction-block-main {
         padding-top: 102px;

         .transaction-title {
            padding-bottom: 35px;
            h3 {
               font-weight: 400;
               font-size: 22px;
               line-height: 29px;
               color: #000000;
            }
         }
      }
   }
   .financial-right-main {
      flex: 1;
      max-width: 433px;
      border: 1px solid #707070;
      border-radius: 30px;
      padding: 20px 32px;
   }

   @media (min-width: 768px) and (max-width: 1440px) {
      flex-direction: column-reverse;
      gap: 40px;
      .financial-right-main {
         max-width: 100%;
      }
   }

   @media (min-width: 1441px) and (max-width: 1800px) {
      .financial-left-main {
         flex: 1;
         width: 50%;
      }
      .financial-right-main {
         flex: 1;
         width: 50%;
      }
   }
`;

const Financial = () => {
   const data = [
      {
         title: "Total Earnings",
         counts: 3560000,
         perGrow: 0.8,
         percentage: 78,
      },
      {
         title: "Prepaid Balance",
         counts: 3568745,
         perGrow: 0.3,
         percentage: 56,
      },
      {
         title: "Admission Revenue",
         counts: 126,
         perGrow: 0.3,
         percentage: 70,
         totalGrowth: true,
      },
      {
         title: "Other Revenue",
         counts: 568745,
         perGrow: 0.5,
         percentage: 40,
      },
      {
         title: "Refunded",
         counts: 3568745,
         perGrow: 0.2,
         percentage: 40,
      },
   ];

   return (
      <Layout headerTitle={"Financial"}>
         <Wrapper>
            <div className="financial-left-main">
               <div className="financial-stats-main">
                  {data.map((item, index) => (
                     <FinancialStat key={index} title={item.title} counts={item.counts} perGrow={item.perGrow} percentage={item.percentage} totalGrowth={item.totalGrowth} />
                  ))}
               </div>

               <div className="transaction-block-main">
                  <div className="transaction-title">
                     <h3>Transaction History</h3>
                  </div>
                  <TransactionHistoryTable />
               </div>
            </div>
            <div className="financial-right-main">
               <Calendar />
            </div>
         </Wrapper>
      </Layout>
   );
};

export default Financial;
