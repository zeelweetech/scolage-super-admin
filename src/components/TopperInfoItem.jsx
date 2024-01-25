import styled from "styled-components";

const Wrapper = styled.div`
   width: 305px;
   .topper-info-top-block {
      display: flex;
      align-items: stretch;
      padding-bottom: 16px;
      .topper-img-block {
         width: 124px;
         height: 112px;
         border: 1px solid #707070;
         border-radius: 8px;
         overflow: hidden;
         img {
            height: 100%;
            width: 100%;
            object-fit: cover;
         }
      }
      .topper-details-block {
         width: calc(100% - 124px);
         padding-left: 16px;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         .Tdetail {
            border: 1px solid #707070;
            background: #f8f8f8;
            border-radius: 6px;
            padding: 5px;
            p {
               font-weight: 400;
               font-size: 12px;
               line-height: 16px;
               color: #7a86a1;
               text-align: center;
            }
         }
      }
   }

   .more-info-block {
      border: 1px solid #707070;
      padding: 5px 10px;
      border-radius: 8px;
      min-height: 42px;
      P {
         font-weight: 400;
         font-size: 12px;
         line-height: 16px;
         color: #7a86a1;
      }
   }
`;

const TopperInfoItem = ({ item }) => {
   return (
      <Wrapper>
         <div className="topper-info-top-block">
            <div className="topper-img-block">
               <img src={item?.imageUrl} alt="" />
            </div>
            <div className="topper-details-block">
               <div className="Tdetail Tname">
                  <p>{item?.name}</p>
               </div>
               <div className="Tdetail TPassingYear">
                  <p>Passing year: { item?.passing_out_year }</p>
               </div>
               <div className="Tdetail TMarks">
                  <p>Marks: { item.marks }</p>
               </div>
            </div>
         </div>
         <div className="more-info-block">
            <p>{ item?.more_info }</p>
         </div>
      </Wrapper>
   );
};

export default TopperInfoItem;
