import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import styled from "styled-components";

const Wrapper = styled.div`
   padding-bottom: 40px;
   .p-accordion .p-accordion-tab {
      border: 1px solid #707070;
      border-radius: 22px;
      overflow: hidden;
   }

   .p-accordion-header-text {
      font-weight: 700;
      font-size: 30px;
      line-height: 40px;
      color: #ffffff;
   }
   .p-accordion .p-accordion-header .p-accordion-header-link {
      box-shadow: none !important;
      flex-direction: row-reverse;
      justify-content: space-between;
      background: #60269e !important;
      color: #fff !important;
      border: none !important;
      border-radius: 20px !important;
      padding: 24px 32px 22px 54px;
   }
   .p-accordion .p-accordion-header .p-accordion-header-link .p-accordion-toggle-icon {
      width: 30px;
      height: 30px;
   }
   .p-accordion-content {
      padding: 0;
   }

   @media (min-width: 768px) and (max-width: 1280px) {
      .p-accordion .p-accordion-header .p-accordion-header-link {
         padding: 14px 22px 12px 34px;
      }
      .p-accordion-header-text {
         font-size: 24px;
         line-height: 34px;
      }
   }
`;

const AccordionBody = styled.div`
   padding: 60px;

   @media (min-width: 768px) and (max-width: 1440px) {
      padding: 30px;
   }
   @media (min-width: 1441px) and (max-width: 1600px) {
      padding: 40px;
   }
   @media ( min-width: 1601px) and (max-width: 1820px) {
      padding: 30px;
   }

`;

const AddClgAccordion = ({ children, accTitle }) => {
   return (
      <Wrapper>
         <Accordion multiple activeIndex={[0]}>
            <AccordionTab header={accTitle}>
               <AccordionBody>{children}</AccordionBody>
            </AccordionTab>
         </Accordion>
      </Wrapper>
   );
};

export default AddClgAccordion;
