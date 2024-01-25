import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutStyles = styled.div`
   width: calc(100% - 293px);
   margin: 0 0 0 auto;
   padding: 34px 60px;

   @media (min-width: 768px) and (max-width: 1024px) {
      width: calc(100% - 200px);
      padding: 17px 30px;
   }
   @media (min-width: 1025px) and (max-width: 1280px) {
      width: calc(100% - 200px);
      padding: 17px 30px;
   }
`;

const Layout = ({ children, headerTitle }) => {
   return (
      <>
         <Sidebar />
         <LayoutStyles>
            <Header title={headerTitle} />
            {children}
         </LayoutStyles>
      </>
   );
};

export default Layout;
