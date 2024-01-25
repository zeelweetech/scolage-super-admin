import styled from "styled-components";

const Wrapper = styled.div`
width: 188px;
   .profile-block {
      height: 96px;
      width: 96px;
      border-radius: 16px;
      border: 1px solid #707070;
      overflow: hidden;

      img {
         height: 100%;
         width: 100%;
         object-fit: cover;
         object-position: center;
      }
   }
`;

const StaffInfoItemStyle = styled.div`
   padding-top: 20px;
   .staff-info-title {
      padding-bottom: 8px;
      p {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #000000;
      }
   }
   .staff-info {
      p {
         font-weight: 400;
         font-size: 14px;
         line-height: 19px;
         color: #707070;
      }

      .experience-block {
         .exp-main {
            display: flex;
            align-items: center;
            gap: 5px;
            padding-bottom: 4px;
            &:last-child{
               padding: 0;
            }

            p {
               width: 58px;
               font-weight: 400;
               font-size: 15px;
               line-height: 20px;
               color: #7a86a1;
            }
            span {
               font-weight: 400;
               font-size: 14px;
               line-height: 19px;
               color: #707070;
            }
         }
      }
   }
`;

const StaffInfoItem = ({ title, info, totalXp, currentXp }) => (
   <StaffInfoItemStyle>
      <div className="staff-info-title">
         <p>{title}</p>
      </div>
      <div className="staff-info">
         {title == "Experience" ? (
            <div className="experience-block">
               <div className="exp-main total">
                  <p>Total : </p>
                  <span>{totalXp}years</span>
               </div>
               <div className="exp-main current">
                  <p>Current : </p>
                  <span>{currentXp}years</span>
               </div>
            </div>
         ) : (
            <p>{info}</p>
         )}
      </div>
   </StaffInfoItemStyle>
);

const StaffItem = ({item}) => {
   return (
      <Wrapper>
         <div className="profile-block">
            <img src={item?.url} alt="" />
         </div>
         <StaffInfoItem title={"Name"} info={item?.name} />
         <StaffInfoItem title={"Qualification"} info={item?.qualification} />
         <StaffInfoItem title={"Experience"} totalXp={item?.experience[0]?.total} currentXp={item?.experience[0]?.current} />
         <StaffInfoItem title={"Designation"} info={item?.designation} />
         <StaffInfoItem
            title={"About"}
            info={item?.about}
         />
      </Wrapper>
   );
};

export default StaffItem;
