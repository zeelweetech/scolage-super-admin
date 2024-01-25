import styled from "styled-components";
import Layout from "./components/Layout";
import InboxListBlock from "./components/InboxListBlock";
import { useState } from "react";
import MessageBlock from "./components/MessageBlock";

const Wrapper = styled.div`
   display: flex;
   align-items: stretch;

   .inbox-list-main {
      width: 610px;
      padding-right: 18px;
      border-right: 1px solid #707070;
      .inbox-list-in {
         border: 1px solid #707070;
         border-radius: 30px;
         padding: 40px;
         height: 100%;
      }
   }

   .message-box-main {
      width: calc(100% - 610px);
      padding-left: 18px;

      .message-box-in {
         border: 1px solid #707070;
         border-radius: 30px;
         padding: 40px;
         height: 100%;
      }
   }
`;

const Inbox = () => {
   const [selectedChat, setSelectedChat] = useState(null);

   return (
      <Layout headerTitle={"Your Inbox"}>
         <Wrapper>
            <div className="inbox-list-main">
               <div className="inbox-list-in">
                  <InboxListBlock selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
               </div>
            </div>
            <div className="message-box-main">
               <div className="message-box-in">
                  <MessageBlock />
               </div>
            </div>
         </Wrapper>
      </Layout>
   );
};

export default Inbox;
