import styled from "styled-components";
import CameraIcon from "../Icons/CameraIcon";

const GalleryStyle = styled.div`
   width: 195px;
   .image-block {
      height: 216px;
      width: 100%;
      border-radius: 12px;
      border: 1px solid #707070;
      overflow: hidden;
      position: relative;
      margin-bottom: 12px;
      img {
         height: 100%;
         width: 100%;
         object-fit: cover;
      }

      .image-btn {
         position: absolute;
         bottom: 0;
         right: 0;
         background: #fff;
         border-radius:  10px 0 0 0;
         label {
            height: 30px;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
         }
      }
   }
   .info-block {
      border: 1px solid #707070;
      height: 44px;
      border-radius: 6px;
      overflow: hidden;

      textarea {
         height: 100%;
         width: 100%;
         padding: 5px 10px;
         font-weight: 400;
         font-size: 12px;
         line-height: 16px;
         color: #000;
         outline: none;
         resize: none;
         background: #F8F8F8;
      }
   }
`;

const GalleryItem = () => {
   return (
      <GalleryStyle>
         <div className="image-block">
            {/* <img src={""} alt="" /> */}
               <img src="/bar-bg.png" alt="" />
            <div className="image-btn">
               <label htmlFor="file-upload">
                  <CameraIcon />
               </label>
               <input type="file" accept="image/*" id="file-upload" style={{ display: "none" }} />
            </div>
         </div>
         <div className="info-block">
            <textarea placeholder="More Info"></textarea>
         </div>
      </GalleryStyle>
   );
};

export default GalleryItem;
