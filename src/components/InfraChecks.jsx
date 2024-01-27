import { Checkbox } from "primereact/checkbox";

import styled from "styled-components";

const CheckStyles = styled.div`
   display: flex;
   align-items: center;
   gap: 34px;
   /* padding-bottom: 46px; */
   .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
      background: transparent !important;
   }
   .p-checkbox {
      width: 26px;
      height: 26px;
      box-shadow: none;
   }
   .p-checkbox-box {
      width: 26px;
      height: 26px;
      border-radius: 100px;
      border: 4px solid #60269e !important;
      box-shadow: none !important;
      position: relative;

      &::after {
         content: "";
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         height: 12px;
         width: 12px;
         background: #60269e;
         border-radius: 100px;
         opacity: 0;
         transition: all 0.1s ease-in-out;
      }

      &.p-highlight {
         background: transparent;

         &::after {
            opacity: 1;
         }

         svg {
            display: none;
         }
      }
   }
   label {
      display: flex;
      align-items: center;
      gap: 26px;
      user-select: none;
      svg {
         width: 34px;
      }
      p {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #000000;
         text-transform: capitalize;
      }
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      gap: 20px;
      .p-checkbox-box {
         width: 22px;
         height: 22px;
      }
      label {
         gap: 16px;
         font-size: 18px;
         svg {
            width: 30px;
         }

         p {
            font-size: 18px;
         }
      }
   }

   @media (min-width: 1025px) and (max-width: 1280px) {
      gap: 26px;
      label {
         gap: 16px;
         p {
            font-size: 18px;
         }
      }
   }
`;

const InfraChecks = ({ data, infraChecks, setInfraChecks, name, disabled , formData ,handleCheckChange }) => {
   const onChecksChange = (e) => {
      console.log(e)
      // let _checkedItems = [...infraChecks];

      // if (e.checked) _checkedItems.push(e.value);
      // else _checkedItems.splice(_checkedItems.indexOf(e.value), 1);

      // setInfraChecks(_checkedItems);
   };

   return (
      <CheckStyles className="flex align-items-center">
         <Checkbox inputId={name + data.id} name={name} value={data.key} onChange={e => {
            handleCheckChange(data.key , e.checked)
         }} checked={formData?.[data.key] == true} disabled={disabled} />
         <label htmlFor={name + data.id}>
            <div className="icon">{data.icon}</div>
            <p>{data.label}</p>
         </label>
      </CheckStyles>
   );
};

export default InfraChecks;
