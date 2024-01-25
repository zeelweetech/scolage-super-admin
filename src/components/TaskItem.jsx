import styled from "styled-components";
import AttachedItemLabel from "./AttachedItemLabel";
import OptionIcon from "../Icons/OptionIcon";

const Wrapper = styled.div`
   display: flex;
   align-items: flex-start;
   padding-bottom: 33px;
   cursor: pointer;
   border: 1px solid transparent;
   border-radius: 30px;
   padding: 25px 20px;

   &:hover {
      border-color: #707070;
      background: #fff4f2;
   }
   &.active {
      border-color: #707070;
      background: #fff4f2;
   }

   .profile-img {
      width: 55px;
      aspect-ratio: 1 / 1;
      border-radius: 20px;
      overflow: hidden;
      background: #f6efff;
      img {
         height: 100%;
         width: 100%;
         object-fit: cover;
      }
   }

   .task-info-main {
      width: calc(100% - 55px);
      padding: 0 18px 0 46px;
      position: relative;

      .profile-name-time {
         display: flex;
         align-items: center;
         gap: 10px;
         padding-bottom: 6px;
         p {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #7a86a1;
         }
      }
      .task-title {
         padding-bottom: 12px;
         h5 {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
         }
      }

      .task-desc {
         padding-bottom: 15px;
         max-width: 274px;
         p {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #7a86a1;
         }
      }

      .task-attachments {
         .task-attach-list {
            display: flex;
            gap: 16px 40px;
            flex-wrap: wrap;
         }
      }

      .task-indicators-main {
         position: absolute;
         top: 0;
         right: 0;
         display: flex;
         flex-direction: column;
         gap: 30px;
         align-items: center;
         justify-content: center;
         .task-star {
            width: 15px;
            svg {
               width: 100%;
            }
         }

         .task-status {
            height: 13px;
            aspect-ratio: 1 / 1;
            border-radius: 100%;
            border: 1px solid #707070;
            /* background: #F3770B; */
         }

         .task-options {
            button {
               width: 18px;
               height: 18px;
               display: flex;
               align-items: center;
               justify-content: center;
            }
         }
      }
   }

   .online-status {
      height: 13px;
      width: 13px;
      background: #f3770b;
      border: 1px solid #707070;
      border-radius: 100%;
      &.online {
         background: #2dc127;
      }
   }

   @media (min-width: 768px) and (max-width: 1440px) {
      .task-info-main {
         padding-left: 16px;
      }
   }
`;

const TaskItem = ({ data, selected }) => {
   return (
      <Wrapper className={`task-item ${selected === data?.id ? "active" : ""}`}>
         <div className="profile-img">
            <img src={'/profile.png'} alt="" />
         </div>
         <div className="task-info-main">
            <div className="profile-name-time">
               <p>{data?.name}</p>
               <p>9:35 AM</p>
            </div>

            <div className="task-title">
               <h5>{data?.title}</h5>
            </div>
            <div className="task-desc">
               <p>Vestibulum imperdiet nibh vel magna lacinia ultrices duis lacus. </p>
            </div>

            <div className="task-attachments">
               <div className="task-attach-list">
                  <AttachedItemLabel />
               </div>
            </div>

            <div className="task-indicators-main">
               <div className="task-star">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M11.9331 9.32391C11.8367 9.42441 11.7649 9.54589 11.7235 9.6788C11.682 9.81172 11.6719 9.95244 11.694 10.0899L12.3601 13.9739C12.3885 14.1334 12.3721 14.2976 12.3126 14.4482C12.2531 14.5989 12.1529 14.73 12.0231 14.8269C11.8996 14.9232 11.7504 14.9807 11.5942 14.9919C11.438 15.0031 11.282 14.9676 11.1461 14.8899L7.8271 13.0669C7.71202 13.0037 7.58334 12.9695 7.4521 12.9669H7.25208C7.18165 12.9782 7.11385 13.0022 7.05207 13.0379L3.73207 14.8699C3.5692 14.9569 3.38216 14.9874 3.20008 14.9569C2.98221 14.907 2.7917 14.7755 2.66767 14.5896C2.54364 14.4036 2.49551 14.1772 2.53309 13.9569L3.20008 10.0729C3.22233 9.93436 3.2123 9.79254 3.17085 9.65848C3.1294 9.52442 3.05763 9.40171 2.96107 9.2999L0.255075 6.5369C0.143712 6.4205 0.0661986 6.27593 0.0309543 6.11874C-0.00428997 5.96155 0.00405995 5.7977 0.0550632 5.6449C0.100922 5.49453 0.187384 5.35972 0.30488 5.25528C0.422376 5.15084 0.566372 5.08083 0.721079 5.05292L4.44508 4.48392C4.58707 4.46697 4.72233 4.41381 4.8379 4.32959C4.95347 4.24537 5.04543 4.13288 5.10505 4.0029L6.74507 0.458923C6.78335 0.380357 6.83402 0.308431 6.89509 0.245911L6.96308 0.190918C6.99796 0.151481 7.03876 0.117734 7.08405 0.0909119L7.16609 0.0588989L7.29408 0.00390625H7.60908C7.75006 0.0207033 7.88445 0.0730136 7.9997 0.155914C8.11496 0.238815 8.20731 0.349594 8.26808 0.477905L9.92408 3.99991C9.98044 4.12489 10.0666 4.23412 10.1751 4.31799C10.2835 4.40186 10.4109 4.4578 10.5461 4.4809L14.2701 5.0499C14.4274 5.07585 14.5744 5.14494 14.6948 5.24945C14.8152 5.35396 14.9043 5.48981 14.9521 5.64191C15.0005 5.79626 15.0058 5.96089 14.9676 6.11807C14.9294 6.27526 14.849 6.41904 14.7351 6.53391L11.9331 9.32391Z"
                        fill="#F9B035"
                     />
                  </svg>
               </div>

               <div className="online-status online"></div>

               <div className="task-options">
                  <button>
                     <OptionIcon />
                  </button>
               </div>
            </div>
         </div>
      </Wrapper>
   );
};

export default TaskItem;
