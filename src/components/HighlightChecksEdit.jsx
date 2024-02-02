import { Checkbox } from "primereact/checkbox";
import styled from "styled-components";

const Wrapper = styled.div`
   width: 100%;
   max-width: 530px;
`;

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
      }
   }
`;

const HighlightDescStyles = styled.div`
   margin-top: 30px;
   border: 1px solid #707070;
   border-radius: 20px;
   height: 112px;
   overflow: hidden;

   textarea {
      height: 100%;
      width: 100%;
      resize: none;
      padding: 30px;
      outline: none;
   }
`;

const HighlightChecksEdit = ({ data, name, highlightChecks, setHighlightChecks, formData, handleCheckChange, handleDescChange }) => {
   const onChecksChange = (e) => {
      let _checkedItems = [...highlightChecks];

      if (e.checked) _checkedItems.push(e.value);
      else _checkedItems.splice(_checkedItems.indexOf(e.value), 1);

      setHighlightChecks(_checkedItems);
   };

   return (
      <Wrapper>
         <CheckStyles className="flex align-items-center">
            <Checkbox
               inputId={name + data.id}
               name={name}
               value={data.key}
               onChange={(e) => {
                  handleCheckChange(data.key, e.checked);
               }}
               checked={formData[data.key]?.[0]?.status}
            />
            <label htmlFor={name + data.id}>
               <div className="icon">{data.icon}</div>
               <p>{data.label}</p>
            </label>
         </CheckStyles>
         <HighlightDescStyles>
            <textarea
               placeholder="Description"
               disabled={!formData[data.key]?.[0]?.status}
               onChange={(e) => {
                  handleDescChange(data.key, e.target.value);
               }}
               value={formData[data.key]?.[0]?.description}
            ></textarea>
         </HighlightDescStyles>
      </Wrapper>
   );
};

export default HighlightChecksEdit;
