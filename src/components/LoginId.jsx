import styled from "styled-components";
import EditIcon from "../Icons/EditIcon";

const Wrapper = styled.li`
   display: flex;
   align-items: center;
   gap: 40px;
   padding-bottom: 40px;

   &:last-child {
      padding: 0px;
   }

   .login-info {
      width: 308px;
      border: 1px solid #707070;
      border-radius: 20px;
      text-align: center;
      padding: 20px;
      p {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #7a86a1;
      }
   }

   .edit-ctas {
      display: flex;
      align-items: center;
      gap: 70px;

      .edt1 {
         background: #60269e;
         border: 1px solid #707070;
         filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #fefefe;
         border-radius: 20px;
         padding: 20px 40px;
      }

      .edt2 {
         background: #ffffff;
         border: 1px solid #707070;
         height: 66px;
         aspect-ratio: 1 / 1;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 20px;
         filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
      }
   }

   @media (min-width: 768px) and (max-width: 1280px) {
      gap: 20px;
      flex-wrap: wrap;

      .login-info {
         width: calc(50% - 20px);
      }

      .edit-ctas {
         gap: 30px;
      }
   }

   @media (min-width: 1281px) and (max-width: 1440px) {
      gap: 20px;

      .edit-ctas {
         gap: 20px;
      }
   }

   @media (min-width: 1441px) and (max-width: 1600px){
gap: 20px;
.edit-ctas{
   gap: 30px;
}
   }
`;

const LoginId = () => {
   return (
      <Wrapper>
         <div className="login-info user-id">
            <p>User Id</p>
         </div>
         <div className="login-info user-password">
            <p>password</p>
         </div>
         <div className="login-info user-role">
            <p>role</p>
         </div>
         <div className=" edit-ctas">
            <button className="edt1">Edit</button>
            <button className="edt2">
               <EditIcon />
            </button>
         </div>
      </Wrapper>
   );
};

export default LoginId;
