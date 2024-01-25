import styled from "styled-components";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";

const Wrapper = styled.div`
   display: flex;
   align-items: center;
`;

const RadioStyles = styled.div`
   padding: 0px 10px;
   border-right: 1px solid #60269e;
   &:last-child {
      border: none;
   }

   .p-radiobutton .p-radiobutton-box.p-highlight {
      background: #fff !important;
      border-color: #60269e !important;
   }

   .p-radiobutton {
      height: 16px;
      width: 16px;
      .p-radiobutton-box {
         box-shadow: none !important;
         border-radius: 5px !important;
         height: 16px;
         width: 16px;
      }

      .p-radiobutton-icon {
         position: relative;
         height: 100%;
         width: 100%;
         &::after {
            content: "";
            position: absolute;
            height: 100%;
            width: 100%;
            background: transparent;
            background-image: url('/check.svg');
            background-size: 80%;
            background-position: center;
            background-repeat: no-repeat;
         }
      }
   }

   label {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000000;
   }
`;

const VisibilityStatus = ({ Fid, visi }) => {
   const [visibility, setVisibility] = useState(visi);
   return (
      <Wrapper>
         <RadioStyles className="flex align-items-center">
            <RadioButton inputId={Fid + "hide"} name={Fid} value="hide" onChange={(e) => setVisibility(false)} checked={!visibility} />
            <label className="ml-2">
               Hide
            </label>
         </RadioStyles>
         <RadioStyles className="flex align-items-center">
            <RadioButton
               inputId={Fid + "publish"}
               name={Fid}
               value="publish"
               onChange={(e) => setVisibility(true)}
               checked={visibility}
            />
            <label className="ml-2">
               Publish
            </label>
         </RadioStyles>
      </Wrapper>
   );
};

export default VisibilityStatus;
