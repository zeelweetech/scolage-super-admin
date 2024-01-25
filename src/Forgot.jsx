import styled  from "styled-components";
import ForgotForm from "./components/ForgotForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

const Wrapper = styled.div`
   height: 100vh;
   display: flex;
   align-items: center;
   font-family: "Segoe Ui";

   .left {
      max-width: 874px;
      height: 100%;
      display: flex;
      align-items: center;
      background-image: url("/bg color.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      color: #fff;

      .copyright {
         position: absolute;
         bottom: 45px;
         left: 40px;

         p {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #ffffff;
         }
      }

      .logo {
         position: absolute;
         width: 187px;
         top: 45px;
         left: 40px;
      }

      h2 {
         font-weight: 400;
         font-size: 92px;
         line-height: 104px;
         color: #ffffff;
         padding: 0 0 0 124px;
      }
   }

   .right {
    width: 100%;
      padding: 0 20px;
   }

   @media (max-width: 992px) {
      .left {
         h2 {
            font-size: 48px;
            line-height: 54px;
            padding: 0 20px;
         }
         .logo {
            width: 150px;
            top: 25px;
            left: 20px;
         }
         .copyright{
            bottom: 25px;
            left: 20px;
         }
      }
   }

   @media (max-width: 1200px) {
    .left {
         h2 {
            font-size: 60px;
            line-height: 65px;
            padding: 0 20px;
         }
         .logo {
            width: 150px;
            top: 25px;
            left: 20px;
         }
         .copyright{
            bottom: 25px;
            left: 20px;
         }
      }
   }
`;

const Forgot = () => {
   const navigate = useNavigate()
   const {auth} = useAuth()

   useEffect(() => {
      if (auth) {
         navigate('/dashboard')
      }
   },[auth])
   
   return (
      <Wrapper>
         <div className="left">
            <div className="logo">
               <img src={'/Logo.svg'} alt="" />
            </div>
            <h2>Let’s create something amazing</h2>

            <div className="copyright">
               <p>&copy;Copyright 2022. Made by scolage</p>
            </div>
         </div>
         <div className="right">
            <ForgotForm />
         </div>
      </Wrapper>
   );
};

export default Forgot;
