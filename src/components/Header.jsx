import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import ClickAwayListener from "react-click-away-listener";

const HeaderStyles = styled.header`
  display: flex;
  align-items: top;
  justify-content: space-between;
  padding: 0 60px 60px 0;

  .left {
    .header-title {
      h2 {
        font-weight: 400;
        font-size: 52px;
        line-height: 69px;
        color: #000000;
        padding-bottom: 4px;
      }
      p {
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;
        color: #7a86a1;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 26px;

    .search-block {
      display: flex;
      align-items: center;
      gap: 24px;

      .search-icon {
        width: 20px;
      }

      .search-input {
        input {
          outline: none;
          width: 320px;
        }
      }
    }

    .right-btn {
      position: relative;
      button {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;

        &:hover {
          background: #f1f1f1;
        }
      }

      &.notification {
        position: relative;

        .notification-list-main {
          position: absolute;
          height: 60vh;
          min-height: 600px;
          top: calc(100% + 14px);
          right: 0;
          width: 610px;
          max-width: 610px;
          background: #fff;
          border-radius: 20px;
          padding: 24px 34px;
          box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
          z-index: 99;

          .notification-list-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 34px;

            .noti-list-tabs {
              display: flex;
              align-items: center;
              gap: 10px;

              button {
                width: fit-content;
                padding: 10px 26px;
                border-radius: 14px;
                color: #7a86a1;
                outline: none;

                &.active {
                  background: #60269e;
                  color: #fff;
                }
              }
            }

            .close-btn {
              font-size: 26px;
            }
          }

          .notification-list-block {
            height: calc(100% - 98px);

            .notification-list-title {
              padding-bottom: 20px;
              h4 {
                color: #000;
                font-size: 22px;
                font-weight: 400;
                line-height: normal;
              }
            }

            .notification-list {
              height: calc(100% - 50px);
              overflow-y: auto;
            }
          }

          @media (min-width: 768px) and (max-width: 991px) {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            border-radius: 0px;
            width: calc(100vw - 200px);
            max-width: inherit;

            /* .notification-list-block{
                     height: calc(100% - 148px);
                     overflow-y: auto;
                  } */
          }
        }
      }

      .noti-count {
        position: absolute;
        top: -8px;
        right: -8px;
        height: 22px;
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f96767;
        border-radius: 8px;
        font-weight: 400;
        font-size: 13px;
        line-height: 17px;
        color: #ffffff;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0 0 30px 0;
    .left {
      .header-title {
        h2 {
          font-size: 30px;
          line-height: 45px;
        }
        p {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }

    .right {
      gap: 12px;
      .search-block {
        .search-input {
          input {
            outline: none;
            width: 140px;
          }
        }
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    padding: 0 0 30px 0;
    .left {
      .header-title {
        h2 {
          font-size: 30px;
          line-height: 45px;
        }
        p {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }

    .right {
      gap: 12px;
      .search-block {
        .search-input {
          input {
            outline: none;
            width: 140px;
          }
        }
      }
    }
  }
`;

const Header = ({ title = "Dashboard" }) => {
  const [notificationTab, setNotificationTab] = useState("Recent");
  const [showNotification, setShowNotification] = useState(false);
  const [data, setData] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const tokenPayload = token.split(".")[1];
      const decodedPayload = atob(tokenPayload);
      const tokenData = JSON.parse(decodedPayload);
      setData(tokenData?.name);
    } else {
      console.log("Token not found in localStorage");
    }
  }, [token]);
  return (
    <HeaderStyles>
      <div className="left">
        <div className="header-title">
          <h2>{title}</h2>
          <p>Hello {data}, welcome.</p>
        </div>
      </div>
      {/* <div className="right">
            <div className="search-block">
               <label className="search-icon" htmlFor="search">
                  <img src='/search-icon.svg' alt="" />
               </label>
               <div className="search-input">
                  <input type="text" id="search" placeholder="Search everything..." />
               </div>
            </div>
            <div className="right-btn notification">
               <button onClick={() => {
                  setShowNotification(true)
                  const body = document.querySelector("body");
                  body.style.marginRight = "17px";
                  body.style.overflow = "hidden";
               }}>
                  <img src={'/notification_icon.svg'} alt="" />
               </button>
               <span className="noti-count">6</span>

               {showNotification && (
                  <ClickAwayListener
                     onClickAway={() => {
                        setShowNotification(false);
                        setNotificationTab("Recent");
                        const body = document.querySelector("body");
                        body.style.marginRight = "0";
                        body.style.overflow = "auto";
                     }}
                  >
                     <div className="notification-list-main">
                        <div className="notification-list-header">
                           <div className="noti-list-tabs">
                              <button className={notificationTab === "Recent" ? "active" : ""} onClick={() => setNotificationTab("Recent")}>
                                 Recent
                              </button>
                              <button className={notificationTab === "All" ? "active" : ""} onClick={() => setNotificationTab("All")}>
                                 All notification
                              </button>
                           </div>
                           <button
                              className="close-btn"
                              onClick={() => {
                                 setShowNotification(false);
                                 setNotificationTab("Recent");
                                 const body = document.querySelector("body");
                                 body.style.marginRight = "0";
                                 body.style.overflow = "auto";
                              }}
                           >
                              <GrClose />
                           </button>
                        </div>

                        <div className="notification-list-block">
                           <div className="notification-list-title">
                              <h4>{notificationTab} Notification</h4>
                           </div>
                           <div className="notification-list">
                              <NotificationItem />
                              <NotificationItem />
                              <NotificationItem />
                              <NotificationItem />
                           </div>
                        </div>
                     </div>
                  </ClickAwayListener>
               )}
            </div>
            <div className="right-btn options">
               <button>
                  <img src={'/more_icon.svg'} alt="" />
               </button>
            </div>
         </div> */}
    </HeaderStyles>
  );
};

export default Header;
