import styled from "styled-components";
import ClgImageItem from "./ClgImageItem";

const Wrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 50px 60px;
   @media (min-width: 768px) and (max-width: 1280px) {
      gap: 40px 12px;
   }
   @media (min-width: 1281px) and (max-width: 1600px) {
      gap: 40px 24px;
   }
`;

const SportBlock = ({ data }) => {
   return (
      <Wrapper>
         {data?.length == 0 && <p>No Images Found!!</p>}
         {data?.length > 0 && (
            <>
               {data?.map((item, index) => (
                  <ClgImageItem key={index} img={item.imageUrl} info={item.more_info} />
               ))}
            </>
         )}
      </Wrapper>
   );
};

export default SportBlock;
