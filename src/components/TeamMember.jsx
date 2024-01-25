import styled from "styled-components";
import Layout from "./Layout";
import TaskBoard from "./TaskBoard";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled.div`
   .member-Info-main {
      display: flex;
      align-items: flex-end;
      gap: 80px;
      padding-bottom: 32px;
      .member-name-main {
         display: flex;
         gap: 17px;

         .member-avatar {
            height: 55px;
            width: 55px;
            border-radius: 20px;
            overflow: hidden;
            img {
               height: 100%;
               width: 100%;
               object-fit: cover;
            }
         }

         .member-name {
            h4 {
               font-weight: 400;
               font-size: 30px;
               line-height: 55px;
               color: #000000;
            }
            p {
               font-weight: 400;
               font-size: 14px;
               line-height: 19px;
               color: #7a86a1;
            }
         }
      }
      .member-tasks-count {
         display: flex;
         gap: 38px;
         .task-counter {
            padding-left: 22px;
            h5 {
               font-weight: 400;
               font-size: 25px;
               line-height: 33px;
               color: #000000;
               padding-bottom: 6px;
            }
            p {
               font-weight: 400;
               font-size: 20px;
               line-height: 27px;
               color: #7a86a1;
               position: relative;

               &::before {
                  content: "";
                  position: absolute;
                  height: 15px;
                  width: 15px;
                  top: 50%;
                  left: -22px;
                  transform: translateY(-50%);
                  /* background: #2dc127; */
                  border-radius: 100%;
                  border: 1px solid #707070;
               }

               &.completed {
                  &::before {
                     background: #2dc127;
                  }
               }
               &.pending {
                  &::before {
                     background: #f3770b;
                  }
               }
            }
         }
      }
   }

   .full-task-view-main {
      border: 1px solid #707070;
      border-radius: 30px;
      padding: 30px 42px;
      margin-bottom: 56px;
      position: relative;

      .task-close-btn {
         position: absolute;
         top: 32px;
         right: 26px;

         button {
            height: 44px;
            width: 44px;
            border: 1px solid #707070;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 18px;
         }
      }

      .task-profile-avatar {
         display: flex;
         align-items: center;
         gap: 20px;
         padding-bottom: 24px;

         .avatar-image {
            height: 55px;
            width: 55px;
            border-radius: 20px;
            overflow: hidden;

            img {
               height: 100%;
               width: 100%;
               object-fit: cover;
            }
         }
         .task-profile-info {
            position: relative;

            .task-status {
               height: 13px;
               width: 13px;
               position: absolute;
               top: 5px;
               right: 0;

               background: #2dc127;
               border: 1px solid #707070;
               border-radius: 100%;
            }

            .name {
               padding-bottom: 8px;
               p {
                  font-weight: 400;
                  font-size: 15px;
                  line-height: 20px;
                  color: #000000;
                  span {
                     font-size: 13px;
                     line-height: 17px;
                     color: #7a86a1;
                  }
               }
            }
            .clg-name {
               p {
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 19px;
                  color: #60269e;
               }
            }
         }
      }

      .task-title {
         max-width: 650px;
         padding-bottom: 28px;
         h5 {
            font-weight: 400;
            font-size: 30px;
            line-height: 40px;
            color: #000000;
         }
      }

      .task-desc-main {
         p {
            font-weight: 400;
            font-size: 15px;
            line-height: 20px;
            color: #7a86a1;
            padding-bottom: 26px;
         }
      }

      .task-attached-block {
         .task-attached-title {
            padding-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 60px;
            h3 {
               font-weight: 400;
               font-size: 15px;
               line-height: 20px;
               color: #000000;
            }

            .download-all-cta {
               button {
                  background: #ffffff;
                  filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  padding: 15px 24px;
                  border-radius: 20px;
                  p {
                     font-weight: 400;
                     font-size: 14px;
                     line-height: 19px;
                     color: #60269e;
                  }
               }
            }
         }

         .task-attached-list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;

            .task-attached-item {
               width: 130px;
               height: 100px;
               background: #707070;
               border-radius: 20px;
               overflow: hidden;
            }
         }
      }
   }


   @media (min-width: 768px) and (max-width: 1024px) {
      .member-Info-main{
         flex-direction: column;
         align-items: flex-start;
         gap: 20px;
      }
   }
`;

const TeamMember = () => {
   const [selected, setSelected] = useState(null);

   useEffect(() => {
      document.documentElement.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
   }, [selected]);

   return (
      <Layout headerTitle={"Team"}>
         <Wrapper>
            {selected == null ? (
               <div className="member-Info-main">
                  <div className="member-name-main">
                     <div className="member-avatar">
                        <img src={'/profile.png'} alt="" />
                     </div>
                     <div className="member-name">
                        <h4>Dharam Raj</h4>
                        <p>Dharam@scolage.com</p>
                     </div>
                  </div>

                  <div className="member-tasks-count">
                     <div className="task-counter">
                        <h5>20</h5>
                        <p className="completed">Completed</p>
                     </div>
                     <div className="task-counter ">
                        <h5>10</h5>
                        <p className="pending">Pending</p>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="full-task-view-main">
                  <div className="task-close-btn">
                     <button onClick={() => setSelected(null)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M6.99598 8.39911L2.08298 13.3091L0.682983 11.9071L5.59398 6.99711L0.682983 2.08311L2.08298 0.683105L6.99298 5.59311L11.907 0.683105L13.307 2.08311L8.39898 6.99611L13.31 11.9061L11.91 13.3061L6.99598 8.39911Z" fill="#7A86A1" />
                        </svg>
                     </button>
                  </div>

                  <div className="task-profile-avatar">
                     <div className="avatar-image">
                        <img src={'/profile.png'} alt="" />
                     </div>
                     <div className="task-profile-info">
                        <div className="task-status"></div>
                        <div className="name">
                           <p>
                              Finch Hoot <span>9:35 AM</span>
                           </p>
                        </div>

                        <div className="clg-name">
                           <p>Sri Vidya jr college | SC1001</p>
                        </div>
                     </div>
                  </div>

                  <div className="task-title">
                     <h5>How to write better advertising for customer. Copy heading to project.</h5>
                  </div>

                  <div className="task-desc-main">
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>
                     <p>Nam ac elit a ante commodo tristique. Duis lacus urna, condimentum a vehicula a, hendrerit ac nisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate, tortor nec commodo ultricies, vitae viverra urna nulla sed turpis. Nullam lacinia faucibus risus, a euismod lorem tincidunt id. </p>
                     <p>Have a nice day!</p>
                     <p>Finch Hoot</p>
                  </div>

                  <div className="task-attached-block">
                     <div className="task-attached-title">
                        <h3> 3 attachments (32 MB)</h3>

                        <div className="download-all-cta">
                           <button>
                              <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M7.91899 3.78589V0.621887C7.91276 0.464982 7.96899 0.311972 8.07524 0.19635C8.1815 0.0807278 8.32914 0.0118966 8.48601 0.00488281C8.63296 0.00562144 8.77434 0.0613708 8.88225 0.161133C8.99016 0.260895 9.05677 0.397439 9.06902 0.543884L9.07402 0.622864V3.78687H12.6611C13.5548 3.82432 14.3999 4.20402 15.0214 4.84735C15.643 5.49068 15.9934 6.34835 16 7.24286V11.3899C16.0302 12.283 15.7184 13.1539 15.1281 13.8248C14.5378 14.4957 13.7137 14.916 12.824 14.9999H4.32402C3.43051 14.9636 2.58544 14.584 1.96477 13.9402C1.3441 13.2965 0.995631 12.4381 0.991991 11.5439V7.3999C0.961876 6.50801 1.27273 5.63811 1.86125 4.96729C2.44978 4.29646 3.27186 3.87509 4.16008 3.78888H4.31609H7.91606V8.8399L6.71599 7.53485C6.66605 7.47881 6.60518 7.4337 6.53703 7.40222C6.46889 7.37075 6.39503 7.35362 6.31999 7.35193C6.24495 7.35024 6.17037 7.36402 6.10088 7.3924C6.03139 7.42077 5.96847 7.46317 5.91606 7.51691L5.8991 7.53485C5.804 7.64581 5.7468 7.78432 5.73601 7.93005C5.72521 8.07578 5.76133 8.22109 5.83904 8.34485L5.8991 8.42389L8.08306 10.8029C8.12939 10.8566 8.18581 10.9007 8.24919 10.9326C8.31258 10.9645 8.38167 10.9836 8.45244 10.9888C8.52321 10.994 8.5943 10.9852 8.66167 10.9629C8.72903 10.9406 8.79132 10.9053 8.84502 10.8589L8.90105 10.8029L11.085 8.42389C11.1939 8.30142 11.2541 8.14324 11.2541 7.97937C11.2541 7.8155 11.1939 7.65732 11.085 7.53485C10.9917 7.43044 10.8618 7.36591 10.7222 7.35455C10.5826 7.3432 10.444 7.38592 10.335 7.47388L10.2701 7.53485L9.07707 8.8349V3.78387L7.91899 3.78589Z"
                                    fill="#60269E"
                                 />
                              </svg>
                              <p>Download all</p>
                           </button>
                        </div>
                     </div>

                     <div className="task-attached-list">
                        <div className="task-attached-item"></div>
                        <div className="task-attached-item"></div>
                        <div className="task-attached-item"></div>
                     </div>
                  </div>
               </div>
            )}

            <div className="task-board-block-main">
               <TaskBoard selected={selected} setSelected={setSelected} />
            </div>
         </Wrapper>
      </Layout>
   );
};

export default TeamMember;
