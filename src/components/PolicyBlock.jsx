import styled from "styled-components";
import TwitterIcon from "../Icons/TwitterIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import InstagramIcon from "../Icons/InstagramIcon";

const Wrapper = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: space-between;

   .tnc-block-main {
      max-width: 458px;
      .tnc-title {
         padding-bottom: 26px;
         h4 {
            font-weight: 400;
            font-size: 25px;
            line-height: 33px;
            color: #60269e;
         }
      }

      .tnc {
         ul {
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
   }

   .college-links-main {
    padding: 100px;
      .website-link {
         display: flex;
         align-items: center;
         gap: 60px;
         padding-bottom: 30px;

         .label {
            p {
               font-weight: 400;
               font-size: 20px;
               line-height: 27px;
               color: #000000;
            }
         }

         .link {
            a {
               font-weight: 400;
               font-size: 20px;
               line-height: 27px;
               color: #707070;
            }
         }
      }
      .social-links{
        display: flex;
        align-items: flex-end;
        gap: 30px;
      }
   }

   @media (min-width: 768px) and (max-width: 1024px){
      flex-direction: column;
      align-items: flex-start;
   }
   @media (min-width: 1025px) and (max-width: 1280px){
      align-items: flex-start;
      .college-links-main{
         padding: 40px 0 40px 40px;
      }
   }
   @media (min-width: 1281px) and (max-width: 1440px){
      .college-links-main{
         padding: 40px 0 40px 40px;
      }
   }
`;

const PolicyBlock = ({data}) => {
   return (
      <Wrapper>
         <div className="tnc-block-main">
            <div className="tnc-title">
               <h4>TERMS & CONDITIONS</h4>
            </div>
            <div className="tnc">
               <ul>
                  <li>
                     <p>{data?.terms_condition }</p>
                  </li>
               </ul>
            </div>
         </div>

         <div className="college-links-main">
            <div className="website-link">
               <div className="label">
                  <p>Website</p>
               </div>
               <div className="link">
                  <a href={data?.website} target="_blank">{data?.website}</a>
               </div>
            </div>

            <div className="social-links">
               <a href={data?.twitter} target="_blank">
                  <TwitterIcon />
               </a>
               <a href={data?.linkedin} target="_blank">
                  <LinkedinIcon />
               </a>
               <a href={data?.youtube} target="_blank">
                  <YoutubeIcon />
               </a>
               <a href={data?.instagram} target="_blank">
                  <InstagramIcon />
               </a>
            </div>
         </div>
      </Wrapper>
   );
};

export default PolicyBlock;
