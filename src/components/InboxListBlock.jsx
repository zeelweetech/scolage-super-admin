import styled from "styled-components";

import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import TaskItem from "./TaskItem";
import ComposeModal from "./ComposeModal";

const Wrapper = styled.div`
   position: relative;

   .compose-cta-main {
      position: absolute;
      top: -150px;
      right: 0;
      display: flex;
      align-items: center;

      .icon {
         background: #60269e;
         height: 55px;
         width: 55px;
         display: grid;
         place-content: center;
         border-radius: 20px;
         margin: 0 auto;
      }

      p {
         color: #7a86a1;
         font-family: Segoe UI;
         font-size: 14px;
         font-weight: 400;
         line-height: normal;
         padding-top: 7px;
         text-align: center;
      }
   }

   .list-header-tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 40px;

      button {
         border-radius: 20px;
         padding: 10px 22px;
         position: relative;

         .status-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 5px;
            height: 10px;
            width: 10px;
            background: #f3770b;
            border-radius: 100%;
            border: 1px solid #707070;
         }

         &.pending {
            .status-icon {
               background: #f3770b;
            }
         }
         &.completed {
            .status-icon {
               background: #2dc127;
            }
         }

         p {
            color: #7a86a1;
            font-weight: 400;
            line-height: 19px;
            font-size: 14px;
         }

         &:hover {
            background: #60269e;
            p {
               color: #fff;
            }
         }
         &.active {
            background: #60269e;
            p {
               color: #fff;
            }
         }
      }
   }

   .list-search-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      .search-block-main {
         max-width: 358px;
         width: 500px;
         position: relative;
         label {
            pointer-events: none;
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
         }
         input {
            border: 1px solid #707070;
            border-radius: 16px;
            padding: 9px 20px 10px 50px;
            font-weight: 400;
            width: 100%;
            font-size: 14px;
            line-height: 24px;
            outline: none;
            color: #000;
         }
      }
   }

   .filter-block-main {
      .p-dropdown {
         box-shadow: none;
         outline: none;
         border: 1px solid #707070;
         border-radius: 20px;
         .p-dropdown-label {
            padding-right: 0;
         }
      }
   }

   .list-block-main {
      padding-top: 25px;
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
`;

const InboxListBlock = ({ selectedChat, setSelectedChat }) => {
   const [selectedFilter, setSelectedFilter] = useState("Recent");
   const filterOpt = [{ name: "Recent" }, { name: "opt 1" }, { name: "opt 2" }];

   const [showComposeModal, setShowComposeModal] = useState(false);

   const data = [
      {
         id: "i1",
         name: "Finch Hoot",
         title: "How to write better advertising",
      },
      {
         id: "i2",
         name: "Finch Hoot",
         title: "How to write better advertising",
      },
      {
         id: "i3",
         name: "Finch Hoot",
         title: "How to write better advertising",
      },
   ];

   return (
      <Wrapper>
         <div className="compose-cta-main">
            <button onClick={() => setShowComposeModal(true)}>
               <div className="icon">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M12.517 20.9898C12.2156 20.9898 11.9265 20.87 11.7134 20.6569C11.5002 20.4438 11.3805 20.1547 11.3805 19.8533C11.3805 19.5519 11.5002 19.2628 11.7134 19.0496C11.9265 18.8365 12.2156 18.7168 12.517 18.7168H18.848C19.1494 18.7168 19.4385 18.8365 19.6516 19.0496C19.8647 19.2628 19.9845 19.5519 19.9845 19.8533C19.9845 20.1547 19.8647 20.4438 19.6516 20.6569C19.4385 20.87 19.1494 20.9898 18.848 20.9898H12.517ZM0.950014 20.5188L0.0629902 16.6868C-0.0173205 16.3414 -0.0191012 15.9825 0.0577412 15.6363C0.134584 15.2902 0.288122 14.9657 0.507021 14.6868L7.42102 5.74077C7.47717 5.67306 7.55692 5.62921 7.64417 5.61807C7.73142 5.60693 7.81964 5.62934 7.89099 5.68077L10.8 7.99977C10.8996 8.08046 11.0147 8.13983 11.1382 8.17424C11.2617 8.20864 11.391 8.21733 11.518 8.19977C11.7907 8.16403 12.0384 8.02264 12.2078 7.80606C12.3773 7.58948 12.4549 7.31502 12.424 7.04177C12.3881 6.77144 12.2591 6.5221 12.059 6.33677L9.23602 4.06977C9.15007 4.00112 9.09446 3.90149 9.08118 3.79228C9.0679 3.68308 9.09797 3.57302 9.16498 3.48577L10.258 2.06478C10.4936 1.77127 10.7847 1.5271 11.1147 1.34626C11.4448 1.16541 11.8072 1.05143 12.1813 1.01084C12.5555 0.970246 12.934 1.00384 13.2951 1.10971C13.6562 1.21557 13.993 1.39161 14.286 1.62777C14.3453 1.67577 14.403 1.72611 14.459 1.77877L16.094 3.07878C16.7329 3.55774 17.1829 4.24631 17.365 5.02378C17.4523 5.41795 17.4489 5.8268 17.3552 6.2195C17.2615 6.6122 17.0799 6.97849 16.824 7.29077L7.08197 19.9068C6.86757 20.1845 6.59333 20.4102 6.2796 20.5673C5.96588 20.7243 5.62081 20.8086 5.27002 20.8138L1.38898 20.8608C1.28778 20.8623 1.18909 20.8293 1.10925 20.7671C1.02942 20.7049 0.973252 20.6173 0.950014 20.5188Z"
                        fill="white"
                     />
                  </svg>
               </div>
               <p>Compose</p>
            </button>
         </div>

         {showComposeModal && <ComposeModal setShowComposeModal={setShowComposeModal} />}

         <div className="list-header-tabs">
            <button className="active">
               <p>Your Inbox</p>
            </button>
            <button className="pending">
               <div className="status-icon"></div>
               <p>Pending</p>
            </button>
            <button className="completed">
               <div className="status-icon"></div>
               <p>Completed</p>
            </button>
            <button>
               <p>Deleted</p>
            </button>
         </div>

         <div className="list-search-block">
            <div className="search-block-main">
               <label htmlFor="search">
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        id="search icon"
                        d="M15.835 13.9369L13.253 11.4229L13.192 11.3309C13.078 11.2191 12.9247 11.1565 12.765 11.1565C12.6053 11.1565 12.452 11.2191 12.338 11.3309C11.2642 12.3012 9.88106 12.8593 8.43453 12.9058C6.98801 12.9523 5.57187 12.4843 4.43798 11.5849C3.31728 10.7045 2.56496 9.43799 2.3279 8.03269C2.09085 6.62739 2.38611 5.18417 3.156 3.98487C3.94783 2.77497 5.1449 1.88686 6.5324 1.47983C7.91991 1.0728 9.40702 1.1735 10.727 1.76389C12.0386 2.32793 13.0953 3.35716 13.6937 4.65354C14.292 5.94991 14.3897 7.4218 13.968 8.78589C13.9367 8.88565 13.9329 8.99199 13.9571 9.09372C13.9812 9.19545 14.0323 9.28879 14.105 9.36389C14.1789 9.44013 14.2711 9.49607 14.3729 9.52637C14.4746 9.55667 14.5824 9.56027 14.686 9.53687C14.7887 9.51496 14.8838 9.4665 14.9619 9.3963C15.04 9.32611 15.0983 9.23665 15.131 9.13687C15.6361 7.51699 15.5332 5.76854 14.8415 4.21909C14.1499 2.66964 12.9171 1.42554 11.374 0.719881C9.82012 -0.0161229 8.05735 -0.183851 6.39257 0.245913C4.72779 0.675676 3.26644 1.6757 2.26299 3.07187C1.28442 4.45325 0.847834 6.14618 1.03628 7.82852C1.22472 9.51087 2.02505 11.0653 3.285 12.1959C4.56346 13.3485 6.20465 14.0178 7.92452 14.0881C9.64439 14.1584 11.3347 13.6252 12.703 12.5809L14.99 14.8079C15.1049 14.918 15.2578 14.9795 15.417 14.9795C15.5761 14.9795 15.7291 14.918 15.844 14.8079C15.8993 14.7541 15.9435 14.6899 15.9739 14.619C16.0043 14.5481 16.0204 14.4719 16.0212 14.3947C16.022 14.3176 16.0076 14.2411 15.9787 14.1695C15.9499 14.098 15.9071 14.0328 15.853 13.9779L15.844 13.9699L15.835 13.9369Z"
                        fill="black"
                     />
                  </svg>
               </label>
               <input type="text" id="search" autoComplete="off" placeholder="Search" value="" />
            </div>
            <div className="filter-block-main">
               <Dropdown value={selectedFilter} onChange={(e) => setSelectedFilter(e.value)} options={filterOpt} optionLabel="name" placeholder="filter" className="w-full md:w-14rem" />
            </div>
         </div>

         <div className="list-block-main">
            {data.map((item, index) => (
               <div key={index}>
                  <TaskItem data={item} selected={selectedChat} />
               </div>
            ))}

            <div className="more-tasks-cta">
               <button>
                  <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M0.539887 9.32357C0.651515 9.20753 0.802396 9.13721 0.963044 9.12631C1.12369 9.1154 1.28262 9.16472 1.40891 9.26461L1.4769 9.32357L5.66489 13.6526V1.67965C5.65824 1.50726 5.71927 1.33904 5.83493 1.21102C5.95059 1.08301 6.11172 1.00531 6.28391 0.99447C6.45609 0.983635 6.62571 1.04053 6.7565 1.15304C6.88729 1.26555 6.9689 1.42477 6.98392 1.59664V1.67965V15.2996C6.98483 15.433 6.94658 15.5637 6.87387 15.6755C6.80116 15.7873 6.6972 15.8753 6.57492 15.9286C6.46844 15.9733 6.35188 15.9888 6.2374 15.9734C6.12292 15.9579 6.01469 15.912 5.92392 15.8405L5.85794 15.7796L0.537934 10.2846C0.416085 10.1562 0.347404 9.98642 0.345734 9.80941C0.344064 9.6324 0.409496 9.46134 0.528901 9.33065L0.537934 9.32162L0.539887 9.32357ZM8.18192 12.4235L8.2399 12.3556L11.1759 9.32064C11.2365 9.25761 11.3091 9.20744 11.3896 9.17318C11.47 9.13892 11.5565 9.12118 11.6439 9.12118C11.7313 9.12118 11.8179 9.13892 11.8983 9.17318C11.9787 9.20744 12.0513 9.25761 12.1119 9.32064C12.2253 9.43907 12.2934 9.59348 12.3046 9.75704C12.3157 9.9206 12.2692 10.0828 12.1729 10.2155L12.1129 10.2866L9.1799 13.3176C9.11918 13.3805 9.04641 13.4306 8.96591 13.4648C8.88542 13.499 8.79885 13.5166 8.7114 13.5166C8.62394 13.5166 8.53743 13.499 8.45694 13.4648C8.37645 13.4306 8.30361 13.3805 8.24289 13.3176C8.12989 13.1994 8.06183 13.0454 8.05051 12.8823C8.03918 12.7192 8.08535 12.5573 8.18094 12.4246L8.18192 12.4235Z"
                        fill="black"
                     ></path>
                  </svg>
               </button>
            </div>
         </div>
      </Wrapper>
   );
};

export default InboxListBlock;
