import styled from "styled-components";
import TaskItem from "./TaskItem";
import { useRef } from "react";
import { useState } from "react";

const Wrapper = styled.div`
   display: flex;
   .task-board {
      flex: 1;
      .Tboard-in {
         border: 1px solid #a36565;
         border-radius: 30px;
         padding: 40px 20px;
         height: 100%;
         .Board-title {
            background: #f3770b;
            width: fit-content;
            padding: 10px 32px;
            border-radius: 16px;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            color: #ffffff;
            margin-left: 20px;
            margin-bottom: 46px;
         }

         .more-tasks-cta {
            display: flex;
            align-items: center;
            justify-content: center;
            button {
               width: 36px;
               aspect-ratio: 1 / 1;
               display: flex;
               align-items: center;
               justify-content: center;
               border-radius: 16px;
               background: #fff;
               filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.25));
            }
         }
      }
      &.pending {
         padding-right: 74px;
         border-right: 1px solid #707070;
         .Board-title {
            background: #f3770b;
         }

         .task-status {
            background: #f3770b;
         }
      }
      &.completed {
         padding-left: 74px;
         .Board-title {
            background: #2dc127;
         }

         .task-status {
            background: #2dc127;
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1280px) {
      flex-direction: column;
      gap: 30px;

      .task-board {
         &.pending {
            padding: 0;
            border: none;
         }
         &.completed {
            padding: 0;
         }
      }
   }

   @media (min-width: 1281px) and (max-width: 1440px) {
      .task-board {
         &.pending {
            padding-right: 14px;
         }
         &.completed {
            padding-left: 14px;
         }
      }
   }
`;

const TaskBoard = ({ selected, setSelected }) => {
   // const taskRef = useRef(null);

   // const handleTaskClick = () => {
   //    const TaskItem = taskRef.current.querySelector(".task-item");
   //    TaskItem.classList.add("active");
   // };

   const pendingTask = [
      {
         id: "p1",
         name: "Jane Cooper",
         title: "Ready to start your first wireframe?",
      },
      {
         id: "p2",
         name: "Finch Hoot",
         title: "Ready to start your first wireframe?",
      },
   ];
   const completedTask = [
      {
         id: "c1",
         name: "Jane Cooper",
         title: "Ready to start your first wireframe?",
      },
      {
         id: "c2",
         name: "Finch Hoot",
         title: "Ready to start your first wireframe?",
      },
      {
         id: "c3",
         name: "Finch Hoot",
         title: "Ready to start your first wireframe?",
      },
      {
         id: "c4",
         name: "Finch Hoot",
         title: "Ready to start your first wireframe?",
      },
   ];

   return (
      <Wrapper>
         <div className="task-board pending">
            <div className="Tboard-in">
               <div className="Board-title">Pending</div>
               <div className="task-list">
                  {/* <div ref={taskRef} onClick={handleTaskClick}>
                     <TaskItem />
                  </div> */}
                  {pendingTask.map((item, index) => (
                     <div key={index} onClick={() => setSelected(item.id)}>
                        <TaskItem data={item} selected={selected} />
                     </div>
                  ))}
               </div>
               <div className="more-tasks-cta">
                  <button>
                     <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M0.539887 9.32357C0.651515 9.20753 0.802396 9.13721 0.963044 9.12631C1.12369 9.1154 1.28262 9.16472 1.40891 9.26461L1.4769 9.32357L5.66489 13.6526V1.67965C5.65824 1.50726 5.71927 1.33904 5.83493 1.21102C5.95059 1.08301 6.11172 1.00531 6.28391 0.99447C6.45609 0.983635 6.62571 1.04053 6.7565 1.15304C6.88729 1.26555 6.9689 1.42477 6.98392 1.59664V1.67965V15.2996C6.98483 15.433 6.94658 15.5637 6.87387 15.6755C6.80116 15.7873 6.6972 15.8753 6.57492 15.9286C6.46844 15.9733 6.35188 15.9888 6.2374 15.9734C6.12292 15.9579 6.01469 15.912 5.92392 15.8405L5.85794 15.7796L0.537934 10.2846C0.416085 10.1562 0.347404 9.98642 0.345734 9.80941C0.344064 9.6324 0.409496 9.46134 0.528901 9.33065L0.537934 9.32162L0.539887 9.32357ZM8.18192 12.4235L8.2399 12.3556L11.1759 9.32064C11.2365 9.25761 11.3091 9.20744 11.3896 9.17318C11.47 9.13892 11.5565 9.12118 11.6439 9.12118C11.7313 9.12118 11.8179 9.13892 11.8983 9.17318C11.9787 9.20744 12.0513 9.25761 12.1119 9.32064C12.2253 9.43907 12.2934 9.59348 12.3046 9.75704C12.3157 9.9206 12.2692 10.0828 12.1729 10.2155L12.1129 10.2866L9.1799 13.3176C9.11918 13.3805 9.04641 13.4306 8.96591 13.4648C8.88542 13.499 8.79885 13.5166 8.7114 13.5166C8.62394 13.5166 8.53743 13.499 8.45694 13.4648C8.37645 13.4306 8.30361 13.3805 8.24289 13.3176C8.12989 13.1994 8.06183 13.0454 8.05051 12.8823C8.03918 12.7192 8.08535 12.5573 8.18094 12.4246L8.18192 12.4235Z"
                           fill="black"
                        />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
         <div className="task-board completed">
            <div className="Tboard-in">
               <div className="Board-title">Completed</div>
               <div className="task-list">
                  {completedTask.map((item, index) => (
                     <div key={index} onClick={() => setSelected(item.id)}>
                        <TaskItem data={item} selected={selected} />
                     </div>
                  ))}
               </div>
               <div className="more-tasks-cta">
                  <button>
                     <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M0.539887 9.32357C0.651515 9.20753 0.802396 9.13721 0.963044 9.12631C1.12369 9.1154 1.28262 9.16472 1.40891 9.26461L1.4769 9.32357L5.66489 13.6526V1.67965C5.65824 1.50726 5.71927 1.33904 5.83493 1.21102C5.95059 1.08301 6.11172 1.00531 6.28391 0.99447C6.45609 0.983635 6.62571 1.04053 6.7565 1.15304C6.88729 1.26555 6.9689 1.42477 6.98392 1.59664V1.67965V15.2996C6.98483 15.433 6.94658 15.5637 6.87387 15.6755C6.80116 15.7873 6.6972 15.8753 6.57492 15.9286C6.46844 15.9733 6.35188 15.9888 6.2374 15.9734C6.12292 15.9579 6.01469 15.912 5.92392 15.8405L5.85794 15.7796L0.537934 10.2846C0.416085 10.1562 0.347404 9.98642 0.345734 9.80941C0.344064 9.6324 0.409496 9.46134 0.528901 9.33065L0.537934 9.32162L0.539887 9.32357ZM8.18192 12.4235L8.2399 12.3556L11.1759 9.32064C11.2365 9.25761 11.3091 9.20744 11.3896 9.17318C11.47 9.13892 11.5565 9.12118 11.6439 9.12118C11.7313 9.12118 11.8179 9.13892 11.8983 9.17318C11.9787 9.20744 12.0513 9.25761 12.1119 9.32064C12.2253 9.43907 12.2934 9.59348 12.3046 9.75704C12.3157 9.9206 12.2692 10.0828 12.1729 10.2155L12.1129 10.2866L9.1799 13.3176C9.11918 13.3805 9.04641 13.4306 8.96591 13.4648C8.88542 13.499 8.79885 13.5166 8.7114 13.5166C8.62394 13.5166 8.53743 13.499 8.45694 13.4648C8.37645 13.4306 8.30361 13.3805 8.24289 13.3176C8.12989 13.1994 8.06183 13.0454 8.05051 12.8823C8.03918 12.7192 8.08535 12.5573 8.18094 12.4246L8.18192 12.4235Z"
                           fill="black"
                        />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
      </Wrapper>
   );
};

export default TaskBoard;
