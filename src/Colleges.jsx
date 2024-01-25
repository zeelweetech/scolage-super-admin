import { Link } from "react-router-dom";
import CollegeTable from "./components/CollegeTable";
import Layout from "./components/Layout";
import styled from "styled-components";
import { useLoadingBar } from "./context/LoadingBarContext";
import { useEffect } from "react";

const Wrapper = styled.div`
   border: 1px solid #707070;
   border-radius: 20px;
   overflow: hidden;

   .college-list-header {
      padding: 81px 50px 60px 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-title {
         h2 {
            font-weight: 400;
            font-size: 31px;
            line-height: 41px;
            color: #60269e;
         }
      }

      .filter-tabs {
         button {
            padding: 16px 34px;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            border-radius: 20px;
            color: #7a86a1;
            background: #fff;
            outline: none;

            &.active {
               background: #60269e;
               color: #ffffff;
            }
         }
      }
   }

   .add-clg-cta {
      padding: 0 46px 40px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      a {
         background: #60269e;
         border-radius: 16px;
         padding: 10px 21px;
         font-weight: 400;
         font-size: 13px;
         line-height: 17px;
         color: #ffffff;
      }
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      .college-list-header {
         padding: 41px 20px 30px 30px;

         .header-title h2 {
            font-weight: 400;
            font-size: 24px;
            line-height: 30px;
         }

         .filter-tabs {
            button {
               padding: 6px 12px;
               font-size: 16px;
               line-height: 24px;
               border-radius: 13px;
            }
         }
      }
   }
`;

const Colleges = () => {

   return (
      <>
         <Layout headerTitle={"Colleges"}>
            <Wrapper>
               <div className="college-list-header">
                  <div className="header-title">
                     <h2>College Lists</h2>
                  </div>
                  <div className="filter-tabs">
                     <button className="active">Last Month</button>
                     <button>Feb 2022</button>
                     <button>Mar 2022</button>
                  </div>
               </div>

               <div className="college-list-table">
                  <CollegeTable />
               </div>

               <div className="add-clg-cta">
                  <Link to="/add-college">Add College</Link>
               </div>
            </Wrapper>
         </Layout>
      </>
   );
};

export default Colleges;
