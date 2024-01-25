import styled from "styled-components";
import { CircleProgress } from "react-gradient-progress";
import { FiMoreHorizontal } from "react-icons/fi";

const Wrapper = styled.div`
   background: #fff4f2;
   border: 1px solid #707070;
   border-radius: 20px;
   height: 100%;
   padding: 30px;
   position: relative;

   .activity-per {
      height: 80px;
      width: 80px;
      position: relative;

      .circular {
         svg {
            path {
               &:first-of-type {
                  display: none;
               }
            }
         }
      }

      .icon {
         position: absolute;
         top: 50%;
         left: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
         background: #fff;
         border-radius: 100px;
         transform: translate(-50%, -50%);
         height: 47px;
         width: 47px;
         z-index: 999;
      }
   }

   .activity-per-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;

      h5 {
         font-weight: 400;
         font-size: 24px;
         line-height: 32px;
         color: #000000;
         padding-bottom: 4px;
      }
      p {
         font-weight: 400;
         font-size: 15px;
         line-height: 20px;
         color: #7a86a1;
      }

      .team-avatars {
         .avatars {
            display: flex;
            list-style-type: none;
            margin: auto;
            padding: 0px;
            flex-direction: row;
            &__item {
               background-color: #596376;
               border: 2px solid #fff;
               border-radius: 100%;
               color: #ffffff;
               display: block;
               font-family: sans-serif;
               font-size: 12px;
               font-weight: 100;
               height: 45px;
               width: 45px;
               line-height: 45px;
               text-align: center;
               transition: margin 0.1s ease-in-out;
               overflow: hidden;
               margin-left: -10px;
               &:first-child {
                  z-index: 5;
               }
               &:nth-child(2) {
                  z-index: 4;
               }
               &:nth-child(3) {
                  z-index: 3;
               }
               &:nth-child(4) {
                  z-index: 2;
               }
               &:last-child {
                  z-index: 0;
               }
               img {
                  width: 100%;
               }
            }
         }
      }
   }
   .more {
      padding-top: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .options {
    position: absolute;
    top: 32px;
    right: 32px;
      button {
         height: 18px;
         width: 18px;
         display: flex;
         align-items: center;
         justify-content: center;

         svg {
            width: 100%;

            path {
               fill: #707070;
            }
         }
      }
   }

   @media (min-width:1025px) and (max-width:1280px) {
      padding: 18px;
   }

`;

const TeamActivity = () => {
   return (
      <Wrapper>
         <div className="activity-per">
            <div className="circular">
               <CircleProgress percentage={58} strokeWidth={5} width={80} primaryColor={["#F9B035", "#F98C4E", "#F96767"]} />
            </div>
            <div className="icon">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M10.3 20.0001C10.1048 20.0009 9.91712 19.9245 9.77795 19.7876C9.63879 19.6506 9.55938 19.4643 9.55701 19.2691C9.55961 19.0731 9.63885 18.8859 9.77771 18.7476C9.91657 18.6093 10.1041 18.5309 10.3 18.5291H13.251C16.175 18.5291 17.791 16.9291 17.817 14.0031V7.53806C17.817 7.34471 17.8938 7.1593 18.0305 7.02258C18.1672 6.88587 18.3527 6.80905 18.546 6.80905C18.7394 6.80905 18.9248 6.88587 19.0615 7.02258C19.1982 7.1593 19.275 7.34471 19.275 7.53806V14.0001C19.275 17.7001 16.96 19.9921 13.251 19.9921L10.3 20.0001ZM0 14.0001V6.80905C0 3.09705 2.30599 0.79706 6.01599 0.79706H12.516C12.7109 0.799423 12.897 0.878382 13.0342 1.01685C13.1713 1.15531 13.2485 1.34216 13.249 1.53705C13.2485 1.73155 13.1708 1.9179 13.033 2.05515C12.8951 2.19239 12.7085 2.26934 12.514 2.26907H6.01404C3.09004 2.26907 1.474 3.88105 1.474 6.80405V14.0001C1.474 16.9241 3.09004 18.5261 6.01404 18.5261C6.21009 18.5276 6.3977 18.606 6.53662 18.7444C6.67554 18.8827 6.75461 19.07 6.75696 19.2661C6.75564 19.4613 6.67724 19.6481 6.53882 19.7857C6.4004 19.9234 6.21317 20.0008 6.01794 20.0011C2.30494 20.0001 0 17.7001 0 14.0001ZM4.646 13.3931C4.4929 13.2731 4.39323 13.0976 4.36853 12.9046C4.34383 12.7117 4.39611 12.5168 4.51404 12.3621L7.40295 8.61206C7.52402 8.45661 7.70175 8.35546 7.89722 8.33072C8.09269 8.30598 8.29007 8.35968 8.44604 8.48007L11.158 10.6031L13.5439 7.56406C13.6698 7.44213 13.8353 7.36939 14.0103 7.35907C14.1852 7.34875 14.358 7.40154 14.4973 7.50781C14.6366 7.61409 14.7333 7.76683 14.7695 7.93826C14.8058 8.1097 14.7793 8.28844 14.6949 8.44205L11.868 12.08C11.7427 12.2335 11.5642 12.3342 11.368 12.3621C11.1746 12.382 10.9811 12.3252 10.829 12.2041L8.11902 10.0821L5.68103 13.2431C5.62346 13.3216 5.55082 13.3878 5.46741 13.438C5.38399 13.4881 5.29139 13.5212 5.19507 13.5352C5.09875 13.5493 5.00064 13.544 4.90637 13.5198C4.8121 13.4956 4.72359 13.4528 4.646 13.3941V13.3931ZM14.7939 2.62006C14.79 2.10568 14.9387 1.60168 15.2213 1.17185C15.5039 0.742013 15.9077 0.40567 16.3815 0.205354C16.8553 0.00503893 17.3778 -0.0502211 17.8831 0.0465408C18.3883 0.143303 18.8534 0.387729 19.2196 0.748933C19.5858 1.11014 19.8367 1.57186 19.9404 2.07569C20.0442 2.57951 19.9962 3.1028 19.8025 3.57932C19.6088 4.05584 19.278 4.46419 18.8522 4.75269C18.4263 5.04119 17.9244 5.19689 17.41 5.20007H17.3929C17.0537 5.20231 16.7173 5.13766 16.403 5.00986C16.0886 4.88205 15.8026 4.69358 15.5612 4.4552C15.3197 4.21682 15.1277 3.93319 14.9958 3.62055C14.864 3.3079 14.7951 2.97235 14.793 2.63306L14.7939 2.62006ZM16.269 2.62006C16.2683 2.84201 16.3333 3.0592 16.4559 3.24417C16.5786 3.42914 16.7534 3.57359 16.9581 3.65921C17.1629 3.74483 17.3885 3.76779 17.6063 3.72519C17.8242 3.68259 18.0245 3.57635 18.1819 3.41989C18.3393 3.26344 18.4468 3.06381 18.4907 2.84625C18.5347 2.6287 18.5132 2.403 18.4288 2.19769C18.3445 1.99239 18.2012 1.81673 18.017 1.6929C17.8328 1.56908 17.616 1.50267 17.394 1.50208C17.0974 1.50234 16.813 1.62013 16.603 1.82968C16.3931 2.03923 16.2748 2.32344 16.274 2.62006H16.269Z"
                     fill="#F96767"
                  />
               </svg>
            </div>
         </div>

         <div className="activity-per-info">
            <div className="team-activity-title">
               <h5>58%</h5>
               <p>Team activities</p>
            </div>

            <div className="team-avatars">
               <div className="avatars">
                  <a href="#" className="avatars__item">
                     <img className="avatar" src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                  </a>
                  <a href="#" className="avatars__item">
                     <img className="avatar" src="https://randomuser.me/api/portraits/men/25.jpg" alt="" />
                  </a>
                  <a href="#" className="avatars__item">
                     <img className="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="" />
                  </a>
                  <a href="#" className="avatars__item">
                     <img className="avatar" src="https://randomuser.me/api/portraits/men/55.jpg" alt="" />
                  </a>
               </div>
            </div>
         </div>

         <div className="more">
            <button>
               <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.254028 1.20699C0.391317 1.06691 0.574796 0.9816 0.770386 0.96688C0.965975 0.95216 1.16031 1.00908 1.31702 1.12704L1.40796 1.20699L7.94397 7.83401L14.48 1.20699C14.6171 1.06698 14.8006 0.981662 14.996 0.966941C15.1914 0.95222 15.3854 1.00915 15.542 1.12704L15.6331 1.20699C15.7714 1.34818 15.8553 1.53387 15.8698 1.73104C15.8842 1.92821 15.8283 2.12414 15.712 2.28402L15.6331 2.37704L8.52002 9.59005C8.38279 9.72987 8.19939 9.81502 8.00403 9.82973C7.80867 9.84445 7.61464 9.78769 7.45801 9.67L7.36694 9.59005L0.254028 2.37704C0.100733 2.22091 0.0147705 2.01082 0.0147705 1.79201C0.0147705 1.57321 0.100733 1.36312 0.254028 1.20699Z" fill="#7A86A1" />
               </svg>
            </button>
         </div>

         <div className="options">
            <button>
               <FiMoreHorizontal />
            </button>
         </div>
      </Wrapper>
   );
};

export default TeamActivity;
