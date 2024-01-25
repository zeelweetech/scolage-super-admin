import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
   p {
      font-size: 16px;
      padding-bottom: 10px;
      span {
         font-weight: 600;
         line-height: 24px;
         width: 400px;
         display: block;
      }
   }
`;

const YoutubeView = ({ data }) => {
   return (
      <Wrapper>
         <p>
            <span>Youtube Link 1 :</span> <a href={data?.videoUrl0} target="_blank">{data?.videoUrl0}</a>
         </p>
         <p>
            <span>Youtube Link 2 :</span> <a href={data?.videoUrl1} target="_blank">{data?.videoUrl1}</a>
         </p>
         <p>
            <span>Youtube Link 3 :</span> <a href={data?.videoUrl2} target="_blank">{data?.videoUrl2}</a>
         </p>
         <p>
            <span>Youtube Link 4 :</span> <a href={data?.videoUrl3} target="_blank">{data?.videoUrl3}</a>
         </p>
         <p>
            <span>Youtube Link 5 :</span> <a href={data?.videoUrl4} target="_blank">{data?.videoUrl4}</a>
         </p>
      </Wrapper>
   );
};

export default YoutubeView;
