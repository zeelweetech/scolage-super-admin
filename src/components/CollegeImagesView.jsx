import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
   .images-block-main {
      display: flex;
      flex-wrap: wrap;
      gap: 60px 30px;

      .add-sub-cta {
         display: flex;
         align-items: end;
         button {
            background: #60269e;
            padding: 10px 18px;
            border-radius: 20px;
            color: #fff;
            font-family: Segoe UI;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
         }
      }
   }
`;

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
         display: flex;
         align-items: center;
         justify-content: center;
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

         label {
            border: 1px solid #707070;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 15px 20px;
            background: #f8f8f8;
            border-radius: 16px;
            cursor: pointer;

            p {
               font-weight: 400;
               font-size: 16px;
               line-height: 21px;
               color: #7a86a1;
            }
         }
         button {
            border: 1px solid #707070;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 15px 20px;
            background: #f8f8f8;
            border-radius: 16px;
            cursor: pointer;

            p {
               font-weight: 400;
               font-size: 16px;
               line-height: 21px;
               color: #7a86a1;
            }
         }
      }

      &:hover {
         .img-ctas {
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

const CollegeImagesView = ({ data }) => {
   return (
      <Wrapper>
         <div className="images-block-main">
            {data?.map((item, i) => (
               <ImageItemStyle key={i}>
                  <div className="clg-image-block">
                     <div className="clg-img">
                        <img src={item.imagePreview} alt="" />
                     </div>
                  </div>

                  <div className="clg-img-title">
                     <input type="text" readOnly name="title" value={"nothing"} />
                  </div>
               </ImageItemStyle>
            ))}
         </div>
      </Wrapper>
   );
};

export default CollegeImagesView;
