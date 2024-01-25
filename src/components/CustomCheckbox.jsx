import styled from "styled-components";

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;

   label {
      display: block;
      position: relative;
      padding-left: 30px;
      cursor: pointer;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #7a86a1;
      user-select: none;

      span {
         position: absolute;
         top: 0;
         left: 0;
         height: 19px;
         width: 19px;
         border-radius: 4px;
         background-color: #fff;
         border: 1px solid #707070;

         &::after {
            content: "";
            position: absolute;
            left: 6px;
            top: 3px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
            display: none;
         }
      }

      input {
         position: absolute;
         opacity: 0;
         cursor: pointer;
         height: 0;
         width: 0;

         &:checked {
            & ~ span {
                border-color: #6149cd;
               background: linear-gradient(90deg, #6149cd 0%, #a654ac 47%, #ea5f8b 100%);

               &::after {
                  display: block;
               }
            }
         }
      }
   }
`;

const CustomCheckbox = () => {
   return (
      <Wrapper>
         <label htmlFor="remember">
            Remember me
            <input type="checkbox" id="remember" />
            <span></span>
         </label>
      </Wrapper>
   );
};

export default CustomCheckbox;
