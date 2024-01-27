import styled from "styled-components";

const Wrapper = styled.div`
   label {
      &.more-title {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #60269e;
         padding-left: 10px;
         padding-bottom: 15px;
         display: block;
      }
   }

   .textarea {
      border: 1px solid #707070;
      border-radius: 20px;
      overflow: hidden;
      height: 114px;
      textarea {
         height: 100%;
         resize: none;
         width: 100%;
         padding: 15px;
         outline: none;
      }
   }
`;

const MoreInfoField = ({ height, name, value, handleChange }) => {
   return (
      <Wrapper>
         <label className="more-title">More Info...</label>
         <div className="textarea" style={{ height: height }}>
            <textarea name={name} value={value} onChange={handleChange} />
         </div>
      </Wrapper>
   );
};

export default MoreInfoField;
