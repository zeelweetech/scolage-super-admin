import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { GiRoundStar } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import MessageIcon from "../Icons/MessageIcon";

const Wrapper = styled.div`
   a {
      width: 100%;
      display: block;
      padding: 24px 24px 24px 48px;
      border-radius: 28px;
      display: flex;
      &:hover {
         background: #fff4f2;
      }

      .noti-profile {
         width: 55px;
         .profile {
            height: 55px;
            width: 55px;
            border-radius: 18px;
            overflow: hidden;

            img {
               height: 100%;
               width: 100%;
               object-fit: cover;
            }
         }
      }

      .noti-info {
         width: calc(100% - 55px);
         padding-left: 20px;
         padding-top: 4px;

         .noti-name-header {
            display: flex;
            justify-content: space-between;
            padding-bottom: 6px;
            h5 {
               color: #000;
               font-size: 15px;
               font-weight: 400;
               line-height: normal;
            }

            p {
               color: #7a86a1;
               font-size: 13px;
               font-weight: 400;
               line-height: normal;
            }
         }

         .short-message {
            padding-bottom: 14px;
            p {
               color: #7a86a1;
               font-size: 14px;
               font-weight: 400;
               line-height: normal;

               span {
                  color: #60269e;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
               }
            }
         }

         .message-title {
            padding: 18px 46px 18px 24px;
            border-radius: 34px;
            border: 1px solid #707070;
            background: #fff;
            margin-bottom: 24px;

            p {
               color: #000;
               font-size: 14px;
               font-weight: 400;
               line-height: normal;
            }
         }

         .noti-ctas {
            display: flex;
            align-items: center;
            gap: 10px;
         }
      }
   }
`;

const NotificationItem = () => {
   return (
      <Wrapper>
         <Link to={"/"} className="nothing">
            <div className="noti-profile">
               <div className="profile">
                  <img src={'/profile.png'} alt="" />
               </div>
            </div>
            <div className="noti-info">
               <div className="noti-name-header">
                  <h5>Anne Richard</h5>
                  <p>10:30 AM</p>
               </div>
               <div className="short-message">
                  <p>
                     Sent you a message <span>nothing</span>
                  </p>
               </div>

               <div className="message-title">
                  <p>“Consectetur adipiscing elit, sed do lore eiusmod tempor incididunt”</p>
               </div>

               <div className="noti-ctas">
                  <button onClick={e => e.preventDefault()}>
                     <GiRoundStar color="#F9B035" />
                  </button>
                  <button onClick={(e) => e.preventDefault()}>
                     <MessageIcon />
                  </button>

                  <button onClick={(e) => e.preventDefault()}>
                     <FiMoreHorizontal />
                  </button>
               </div>
            </div>
         </Link>
      </Wrapper>
   );
};

export default NotificationItem;
