import styled from "styled-components";
import FormInput from "./FormInput";
import Button from "./Button";
// import { TfiAngleLeft } from "react-icons/tfi";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Wrapper = styled.div`

   margin: 0 auto;
   max-width: 618px ;

   .inner{
       max-width: 400px;
    }

   .form-title {
      h2 {
         font-weight: 400;
         font-size: 30px;
         line-height: 40px;
         color: #000000;
         padding-bottom: 18px;
      }

      p {
         font-weight: 400;
         font-size: 14px;
         line-height: 19px;
         color: #7a86a1;
      }
   }

   .signin-form {
      padding-top: 30px;
      max-width: 358px;

      .form-inputs {
         display: flex;
         gap: 32px;
      }

      a {
         font-weight: 400;
         font-size: 14px;
         line-height: 19px;
         color: #60269e;
      }
   }

   .back-cta {
      padding-top: 36px;

      a {
         svg {
            font-size: 30px;
         }
         display: flex;
         align-items: center;
         font-weight: 400;
         font-size: 14px;
         line-height: 19px;
         color: #60269e;
      }
   }


   @media (min-width: 768px) and (max-width: 991px) {

   }

`;

const ForgotForm = () => {
   return (
       <Wrapper>
           <div className="inner">
            <div className="form-title">
                <h2>Forgot password?</h2>
                <p>Enter the email address you used when you joined and we'll send you instructions to reset your password.</p>
            </div>

            <form className="signin-form">
                <div className="form-inputs">
                <FormInput title={"Your email"} type={"email"} placeholder={"Tonynguyen@example.com"} id={"email"} />
                </div>
                <Button type={"submit"}>Submit</Button>
            </form>

            <div className="back-cta">
                <Link to="/signin">
                <RiArrowDropLeftLine /> Back to sign in
                </Link>
            </div>
         </div>
      </Wrapper>
   );
};

export default ForgotForm;
