import styled from "styled-components";
import SkillIcon from "../Icons/SkillIcon";
import ScholarshipIcon from "../Icons/ScholarshipIcon";
import CareerIcon from "../Icons/CareerIcon";

const Wrapper = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 93px 20px;

   .safety-block-main {
      h4 {
         font-weight: 700;
         font-size: 30px;
         line-height: 40px;
         color: #60269e;
         padding-bottom: 16px;
      }

      .info {
         max-width: 395px;
         li {
            padding-bottom: 50px;

            &:last-child {
               padding: 0;
            }
            p {
               font-weight: 400;
               font-size: 16px;
               line-height: 21px;
               color: #7a86a1;
            }
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 30px;
   }
`;

const HighlightItemStyles = styled.div`
   max-width: 395px;
   .highlight-title {
      display: flex;
      align-items: center;
      gap: 33px;
      padding-bottom: 40px;

      .title {
         h4 {
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            color: #000000;
         }
      }

      .info {
         p {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #7a86a1;
         }
      }
   }
   @media (min-width: 768px) and (max-width: 1024px) {
      .highlight-title {
         padding-bottom: 20px;
      }
   }
`;

const HighlightItem = ({ icon, title, info }) => (
   <HighlightItemStyles>
      <div className="highlight-title">
         <div className="icon">
            <SkillIcon />
         </div>
         <div className="title">
            <h4>{title}</h4>
         </div>
      </div>
      <div className="info">
         <p>{info}</p>
      </div>
   </HighlightItemStyles>
);

const HighlightBlock = ({ data }) => {

   return (
      <Wrapper>
         {data?.skill_development.length > 0 && <HighlightItem icon={<SkillIcon />} title={"Skill Development"} info={data?.skill_development[0].description} />}
         {data?.scholarship.length > 0 && <HighlightItem icon={<ScholarshipIcon />} title={"scholarship"} info={data?.scholarship[0].description} />}
         {data?.career.length > 0 && <HighlightItem icon={<CareerIcon />} title={"Career Counselling"} info={data?.career[0].description} />}

         <div className="safety-block-main">
            <h4 className="title">SAFTY & SECURITY</h4>
            <ul className="info">
               <li>
                  <p>{data?.safety_security}</p>
               </li>
            </ul>
         </div>
      </Wrapper>
   );
};

export default HighlightBlock;
