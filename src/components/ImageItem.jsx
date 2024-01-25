import styled from "styled-components";
import AddIconBig from "../Icons/AddIconBig";
import RemoveIcon from "../Icons/RemoveIcon";

const ImageItemStyle = styled.div`
   width: 200px;
   .clg-image-block {
      height: 182px;
      border: 1px solid #707070;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      margin-bottom: 20px;

      .clg-img {
         height: 100%;
         width: 100%;
         img {
            height: 100%;
            width: 100%;
            object-fit: cover;
         }
      }

      .img-ctas {
         position: absolute;
         height: 100%;
         width: 100%;
         top: 0;
         left: 0;
         display: none;
         align-items: center;
         justify-content: center;
         flex-direction: column;
         gap: 10px;

         button {
            border: 1px solid #707070;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 15px 20px;
            background: #f8f8f8;
            border-radius: 16px;

            p {
               font-weight: 400;
               font-size: 16px;
               line-height: 21px;
               color: #7a86a1;
            }
         }
      }

      &:hover{
        .img-ctas{
            display: flex;
        }
      }
   }

   .clg-img-title {
      background: #f8f8f8;
      border: 1px solid #707070;
      padding: 6px 4px 4px;
      input {
         width: 100%;
         background: transparent;
         font-weight: 400;
         font-size: 14px;
         line-height: 19px;
         color: #000;
         outline: none;
         text-align: center;
      }
   }
`;

const ImageItem = () => {
   return (
      <ImageItemStyle>
         <div className="clg-image-block">
            <div className="clg-img">
               <img src="" alt="" />
            </div>
            <div className="img-ctas">
               <button className="edit-cta">
                  <AddIconBig />
                  <p>Edit</p>
               </button>
               <button className="remove-cta">
                  <RemoveIcon />
                  <p>Remove</p>
               </button>
            </div>
         </div>

         <div className="clg-img-title">
            <input type="text" name="title" placeholder="Name" />
         </div>
      </ImageItemStyle>
   );
};

export default ImageItem;
