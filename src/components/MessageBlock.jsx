import styled from "styled-components";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";

const Wrapper = styled.div`
   .message-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .msg-profile {
         display: flex;
         align-items: center;
         gap: 20px;
         .avatar {
            width: 55px;
            aspect-ratio: 1 / 1;
            border-radius: 20px;
            background: #f6efff;
         }
         .profile-info {
            .name {
               color: #000;
               font-size: 15px;
               font-weight: 400;
               line-height: normal;
               position: relative;
               span {
                  color: #7a86a1;
                  font-size: 14px;
               }

               &::after {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 110%;
                  transform: translateY(-50%);
                  height: 13px;
                  width: 13px;
                  border: 1px solid #707070;
                  border-radius: 100px;
                  background: #2dc127;
               }
            }
            .email {
               padding-top: 6px;
               color: #7a86a1;
               font-size: 14px;
               font-weight: 400;
               line-height: normal;
            }
         }
      }

      .msg-ctas {
         display: flex;
         align-items: center;
         gap: 20px;
         button.msg-cta {
            width: 45px;
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            border: 1px solid #707070;
         }

         .opt-cta {
            position: relative;

            .opt-close-cta {
               height: 30px;
               width: 30px;
               border: 1px solid #707070;
               border-radius: 10px;
               display: flex;
               align-items: center;
               justify-content: center;
               margin-left: auto;
               margin-bottom: 14px;
            }

            .opt-list-main {
               position: absolute;
               z-index: 9;
               top: 110%;
               right: 0;
               width: 200px;
               background: #fff;
               border: 1px solid #707070;
               padding: 10px;
               border-radius: 14px;

               .opt-list-inner {
                  li {
                     button {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 6px;
                        width: 100%;
                        padding: 6px 10px;
                        border-radius: 10px;
                        color: #7a86a1;
                        font-family: Segoe UI;
                        font-size: 20px;
                        font-weight: 400;
                        line-height: normal;
                        text-transform: uppercase;

                        &:hover {
                           background: #60269e;
                           color: #fff;
                        }
                     }
                  }
               }
            }
         }
      }
   }

   .message-block__messages {
      padding: 24px 0 40px;
      .message-title {
         padding-bottom: 28px;
         h5 {
            color: #000;
            font-size: 30px;
            font-weight: 400;
            line-height: normal;
         }
      }
      .message-block {
         p {
            color: #7a86a1;
            font-size: 15px;
            font-weight: 400;
            line-height: normal;
            padding-bottom: 26px;
         }
      }
   }

   .msg-attachments-block {
      padding-bottom: 40px;
      .attachments-title {
         display: flex;
         align-items: center;
         gap: 60px;
         padding-bottom: 30px;

         h3 {
            color: #000;
            font-size: 15px;
            font-weight: 400;
            line-height: normal;
         }

         button {
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 2px 8px 29px rgba(105, 95, 151, 0.14);
            padding: 15px 24px;
            border-radius: 20px;
            span {
               color: #60269e;
               font-size: 14px;
               font-weight: 400;
               line-height: normal;
            }
         }
      }

      .attachments-list {
         display: flex;
         align-items: center;
         flex-wrap: wrap;
         gap: 10px;
         .attached-item {
            width: 130px;
            height: 100px;
            background: #707070;
            border-radius: 20px;
         }
      }
   }

   .write-msg-main {
      border: 1px solid #707070;
      padding: 40px 32px;
      border-radius: 20px;

      .epr-preview {
         display: none;
      }

      .write-msg-header {
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding-bottom: 20px;
         .write-header-left {
            display: flex;
            align-items: center;
            gap: 20px;
            .profile-avatar {
               height: 50px;
               width: 50px;
               border-radius: 20px;
               background: #f6efff;
            }

            .reply-block {
               display: flex;
               align-items: center;
               gap: 10px;

               p {
                  color: #7a86a1;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
               }

               .reply-acc-name {
                  display: flex;
                  align-items: center;
                  background: #f6efff;
                  border: 1px solid #707070;
                  border-radius: 13px;
                  padding: 5px 10px;
                  display: flex;
                  align-items: center;
                  gap: 14px;

                  button {
                     height: 10px;
                     width: 10px;
                  }
               }
            }
         }
         .write-header-right {
            button {
               height: 45px;
               width: 45px;
               border-radius: 20px;
               background: #fff;
               border: 1px solid #707070;
               display: flex;
               align-items: center;
               justify-content: center;
            }
         }
      }

      .message-text-field {
         display: flex;
         flex-direction: column-reverse;
         .ql-toolbar {
            border: none;
            padding-inline: 0;
            order: -1;
            transform: translateY(2px);
            .ql-formats {
               display: flex;
               align-items: center;
               gap: 10px;
               button {
                  height: 36px;
                  width: 36px;
                  border: 1px solid #707070;
                  border-radius: 15px;
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  svg {
                     width: 18px;
                  }
               }
            }
         }
         .ql-container {
            border: none;
            height: 200px;
         }
         .ql-editor {
            padding-inline: 0;
            font-family: "Noto Color Emoji", sans-serif;
            font-size: 20px;
            &.ql-blank::before {
               left: 0px;
            }

            p {
               font-size: 20px;
               font-family: "Noto Color Emoji", sans-serif;
            }
         }

         .textarea-extra-btns {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 138px;
            position: relative;
            z-index: 9999;
            margin-bottom: -55px;

            .emoji-picker-main {
               position: absolute;
               left: 0;
               bottom: 100%;
            }

            .send-btn {
               min-width: 140px;
               height: 55px;
               background: #60269e;
               color: #fff;
               font-size: 16px;
               font-weight: 400;
               line-height: normal;
               border-radius: 20px;
            }
            .left-btns {
               display: flex;
               align-items: center;
               gap: 10px;
               button,
               label {
                  height: 36px;
                  width: 36px;
                  border: 1px solid #707070;
                  border-radius: 15px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }
            }
         }
      }

      .attachment-prev-main {
         display: flex;
         align-items: center;
         flex-wrap: wrap;
         gap: 10px;

         .attachment-prev {
            width: 92px;
            height: 70px;
            border-radius: 18px;
            background: #707070;
            overflow: hidden;
            position: relative;

            img {
               height: 100%;
               width: 100%;
               object-fit: cover;
            }

            .cancel-attach {
               position: absolute;
               top: 10px;
               right: 10px;
               height: 20px;
               width: 20px;
               border-radius: 8px;
               background: #fff;
               display: flex;
               align-items: center;
               justify-content: center;
               display: none;
            }

            &:hover {
               .cancel-attach {
                  display: flex;
               }
            }
         }
      }
   }
`;

const MessageBlock = () => {
   const modules = {
      toolbar: [["bold", "italic", "underline"]],
   };
   const { quill, quillRef } = useQuill({ modules, placeholder: "Enter your Messages" });
   const [value, setValue] = useState(null);
   const [viewEmojiPicker, setViewEmojiPicker] = useState(false);
   const [imageAttachments, setImageAttachments] = useState([]);
   const [imagePreview, setImagePreview] = useState([]);
   const [showOpt, setShowOpt] = useState(false);

   useEffect(() => {
      if (quill) {
         quill.on("text-change", (delta, oldDelta, source) => {
            setValue(quill.root.innerHTML);
         });
      }
   }, [quill]);


   const onEmojiClick = (emoji, event) => {
      quill.root.innerHTML += emoji.emoji;
   };

   const handleImageFileChange = (e) => {
      const files = [...e.target.files];
      var tempAttaches = [];
      var tempPreview = [];
      for (const f of files) {
         tempAttaches.push(f);
         tempPreview.push(URL.createObjectURL(f));
      }
      setImageAttachments(tempAttaches);
      setImagePreview(tempPreview);
   };

   const handleRemoveImage = (index) => {
      var tempAttaches = [...imageAttachments];
      var tempPreview = [...imagePreview];
      tempAttaches.splice(index, 1);
      tempPreview.splice(index, 1);
      setImageAttachments(tempAttaches);
      setImagePreview(tempPreview);
   };

   return (
      <Wrapper>
         <div className="message-header">
            <div className="msg-profile">
               <div className="avatar">{/* <img src="" alt="" /> */}</div>
               <div className="profile-info">
                  <p className="name">
                     Finch Hoot <span>9:35 AM</span>
                  </p>
                  <p className="email">finch@scolage.com</p>
               </div>
            </div>

            <div className="msg-ctas">
               <button className="msg-cta">
                  <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M6.61203 9.99992C6.22562 9.93942 5.84955 9.82497 5.49497 9.65993C3.79345 8.84574 2.22392 7.78052 0.83896 6.49992L0.52292 6.16693C0.439289 6.07915 0.361132 5.98631 0.288911 5.88893C0.100598 5.63353 -0.000357065 5.32424 0.000946879 5.00693C-0.00279032 4.66511 0.106949 4.33171 0.312959 4.05893L0.63791 3.70892L0.709931 3.63393C2.15074 2.25808 3.80569 1.12564 5.60996 0.28093L5.81003 0.202927C6.06595 0.104299 6.33283 0.0371431 6.60495 0.00292969C6.86854 0.0031074 7.12838 0.0658239 7.36301 0.185928C7.6637 0.35513 7.90021 0.618731 8.03598 0.935928C8.1247 1.22734 8.19719 1.52346 8.25302 1.82292C8.39382 2.77499 8.46063 3.73654 8.45297 4.69893V4.99393C8.46261 6.02115 8.40242 7.04785 8.27292 8.06693L8.17893 8.51993C8.13733 8.74379 8.07234 8.96267 7.98496 9.17293C7.85998 9.41984 7.6695 9.62766 7.43442 9.77368C7.19934 9.9197 6.92868 9.99832 6.65195 10.0009L6.61203 9.99992ZM10.656 5.99292C10.4006 5.98145 10.1594 5.87193 9.98276 5.68715C9.80609 5.50237 9.70749 5.25658 9.70749 5.00093C9.70749 4.74528 9.80609 4.49948 9.98276 4.3147C10.1594 4.12992 10.4006 4.0204 10.656 4.00893L13.7359 3.73692C14.0714 3.73692 14.3932 3.8702 14.6305 4.10744C14.8677 4.34467 15.0009 4.66642 15.0009 5.00192C15.0009 5.33742 14.8677 5.65917 14.6305 5.89641C14.3932 6.13364 14.0714 6.26692 13.7359 6.26692L10.656 5.99292Z"
                        fill="#7A86A1"
                     />
                  </svg>
               </button>

               <button className="msg-cta">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M4.279 17.958C3.63925 17.9558 3.02568 17.7036 2.5694 17.2551C2.11312 16.8067 1.85029 16.1977 1.83698 15.558C1.57598 13.139 1.13691 7.42105 1.13691 7.36305C1.12779 7.19059 1.1847 7.02113 1.29597 6.88905C1.35023 6.82687 1.41703 6.77689 1.49201 6.74242C1.56699 6.70794 1.64838 6.68975 1.7309 6.68904H13.285C13.3675 6.6906 13.4487 6.70916 13.5237 6.74358C13.5988 6.77799 13.6659 6.82752 13.7209 6.88905C13.7763 6.95404 13.8183 7.02943 13.8442 7.11082C13.8701 7.19222 13.8795 7.27797 13.8719 7.36305C13.8719 7.42105 13.4279 13.148 13.1719 15.558C13.1583 16.2077 12.8873 16.8254 12.4185 17.2754C11.9498 17.7254 11.3216 17.9709 10.6719 17.958C9.59694 17.98 8.5419 17.989 7.5019 17.989C6.3999 17.992 5.324 17.983 4.279 17.958ZM0.598944 5.32405C0.437671 5.31908 0.284874 5.25082 0.173529 5.13405C0.0621834 5.01728 0.00126859 4.86137 0.00397299 4.70004V4.37704C0.00197978 4.29698 0.0157837 4.21731 0.0446224 4.14259C0.0734611 4.06788 0.116796 3.99958 0.172064 3.94162C0.227332 3.88366 0.293384 3.83717 0.366644 3.80481C0.439904 3.77245 0.518876 3.75487 0.598944 3.75305H3.0279C3.27274 3.74893 3.50888 3.66117 3.69697 3.50436C3.88506 3.34756 4.01384 3.13115 4.06196 2.89105L4.18891 2.31105C4.26802 1.9449 4.46833 1.61612 4.75739 1.37787C5.04646 1.13961 5.40741 1.0058 5.78193 0.998047H9.22089C9.58851 1.00538 9.94336 1.13441 10.2298 1.36494C10.5163 1.59548 10.7181 1.9145 10.8039 2.27205L10.9399 2.89204C10.9875 3.1325 11.1161 3.34936 11.3043 3.50642C11.4924 3.66349 11.7289 3.75124 11.9739 3.75505H14.4029C14.483 3.75622 14.5622 3.7732 14.6358 3.80502C14.7094 3.83684 14.776 3.88287 14.8317 3.94048C14.8875 3.99808 14.9312 4.06611 14.9606 4.14069C14.99 4.21526 15.0045 4.2949 15.003 4.37505V4.69804C15.0054 4.85913 14.9445 5.01475 14.8334 5.13144C14.7224 5.24813 14.57 5.31657 14.409 5.32205L0.598944 5.32405Z"
                        fill="#60269E"
                     />
                  </svg>
               </button>

               <div className="opt-cta">
                  <button className="msg-cta" onClick={() => setShowOpt((prev) => !prev)}>
                     <svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M14 2.81006C14 2.41449 14.1173 2.02781 14.337 1.69891C14.5568 1.37001 14.8692 1.11367 15.2346 0.962292C15.6001 0.810917 16.0022 0.771321 16.3901 0.848492C16.7781 0.925662 17.1345 1.11613 17.4142 1.39584C17.6939 1.67554 17.8844 2.03191 17.9615 2.41987C18.0387 2.80783 17.9992 3.20997 17.8478 3.57542C17.6964 3.94087 17.44 4.25324 17.1111 4.473C16.7822 4.69277 16.3956 4.81006 16 4.81006C15.4696 4.81006 14.9609 4.59934 14.5858 4.22427C14.2107 3.8492 14 3.34049 14 2.81006ZM7 2.81006C7 2.41449 7.11727 2.02781 7.33704 1.69891C7.5568 1.37001 7.86917 1.11367 8.23462 0.962292C8.60007 0.810917 9.00217 0.771321 9.39014 0.848492C9.7781 0.925662 10.1345 1.11613 10.4142 1.39584C10.6939 1.67554 10.8844 2.03191 10.9615 2.41987C11.0387 2.80783 10.9992 3.20997 10.8478 3.57542C10.6964 3.94087 10.44 4.25324 10.1111 4.473C9.78219 4.69277 9.39556 4.81006 9 4.81006C8.46957 4.81006 7.96089 4.59934 7.58582 4.22427C7.21074 3.8492 7 3.34049 7 2.81006ZM0 2.81006C0 2.41449 0.117273 2.02781 0.337036 1.69891C0.556799 1.37001 0.869167 1.11367 1.23462 0.962292C1.60007 0.810917 2.00217 0.771321 2.39014 0.848492C2.7781 0.925662 3.13448 1.11613 3.41418 1.39584C3.69389 1.67554 3.88438 2.03191 3.96155 2.41987C4.03872 2.80783 3.99915 3.20997 3.84778 3.57542C3.6964 3.94087 3.43998 4.25324 3.11108 4.473C2.78219 4.69277 2.39556 4.81006 2 4.81006C1.46957 4.81006 0.960888 4.59934 0.585815 4.22427C0.210743 3.8492 0 3.34049 0 2.81006Z"
                           fill="#707070"
                        />
                     </svg>
                  </button>
                  {showOpt && (
                     <ClickAwayListener onClickAway={() => setShowOpt(false)}>
                        <div id="optBox" className="opt-list-main" >
                           <button className="opt-close-cta" onClick={() => setShowOpt(false)}>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M4.86401 5.89189L1.26401 9.49189L0.234009 8.46489L3.83401 4.86489L0.234009 1.26289L1.26301 0.233887L4.86301 3.83389L8.46501 0.233887L9.49301 1.26289L5.89301 4.86289L9.49301 8.46289L8.46501 9.49289L4.86401 5.89189Z" fill="#7A86A1" />
                              </svg>
                           </button>
                           <ul className="opt-list-inner">
                              <li>
                                 <button>
                                    <p>Forward</p>
                                    <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M14.73 0.770019C14.5402 0.620927 14.3123 0.528213 14.0723 0.502463C13.8323 0.476713 13.59 0.518965 13.3728 0.624395C13.1557 0.729824 12.9726 0.894182 12.8445 1.0987C12.7163 1.30322 12.6482 1.53966 12.648 1.78102V4.36102C9.42582 4.47223 6.37273 5.8304 4.13255 8.14912C1.89236 10.4678 0.64017 13.5659 0.640015 16.79V17.219C0.640129 17.494 0.728311 17.7617 0.891638 17.9829C1.05497 18.2041 1.28485 18.3672 1.54761 18.4483C1.81036 18.5294 2.09218 18.5241 2.35175 18.4334C2.61132 18.3426 2.835 18.1711 2.99002 17.944L4.24901 16.084C5.15274 14.7495 6.3697 13.6568 7.79343 12.9014C9.21717 12.1461 10.8043 11.7511 12.416 11.751H12.648V15.289C12.6482 15.5304 12.7163 15.7668 12.8445 15.9713C12.9726 16.1759 13.1557 16.3402 13.3728 16.4456C13.59 16.5511 13.8323 16.5933 14.0723 16.5676C14.3123 16.5418 14.5402 16.4491 14.73 16.3L23.307 9.54402C23.4599 9.42367 23.5835 9.2702 23.6685 9.09517C23.7534 8.92013 23.7976 8.72809 23.7976 8.53352C23.7976 8.33895 23.7534 8.14691 23.6685 7.97187C23.5835 7.79684 23.4599 7.64337 23.307 7.52302L14.73 0.770019Z" fill="#5E94FF" />
                                    </svg>
                                 </button>
                              </li>
                              <li>
                                 <button>
                                    <p>COMPLETED</p>
                                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M9.2019 17C13.8963 17 17.7019 13.1944 17.7019 8.5C17.7019 3.80558 13.8963 0 9.2019 0C4.50748 0 0.701904 3.80558 0.701904 8.5C0.701904 13.1944 4.50748 17 9.2019 17Z" fill="#2DC127" />
                                    </svg>
                                 </button>
                              </li>
                              <li>
                                 <button>
                                    <p>PENDING</p>
                                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M9.2019 17C13.8963 17 17.7019 13.1944 17.7019 8.5C17.7019 3.80558 13.8963 0 9.2019 0C4.50748 0 0.701904 3.80558 0.701904 8.5C0.701904 13.1944 4.50748 17 9.2019 17Z" fill="#F3770B" />
                                    </svg>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </ClickAwayListener>
                  )}
               </div>
            </div>
         </div>

         <div className="message-block__messages">
            <div className="message-title">
               <h5>How to write better advertising for customer. Copy heading to project.</h5>
            </div>

            <div className="message-block">
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.</p>

               <p>Nam ac elit a ante commodo tristique. Duis lacus urna, condimentum a vehicula a, hendrerit ac nisi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate, tortor nec commodo ultricies, vitae viverra urna nulla sed turpis. Nullam lacinia faucibus risus, a euismod lorem tincidunt id. </p>

               <p>
                  Have a nice day! <br />
                  Finch Hoot
               </p>
            </div>
         </div>

         <div className="msg-attachments-block">
            <div className="attachments-title">
               <h3>3 attachments (32MB)</h3>
               <button>
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M7.91899 3.78589V0.621887C7.91276 0.464982 7.96899 0.311972 8.07524 0.19635C8.1815 0.0807278 8.32914 0.0118966 8.48601 0.00488281C8.63296 0.00562144 8.77434 0.0613708 8.88225 0.161133C8.99016 0.260895 9.05677 0.397439 9.06902 0.543884L9.07402 0.622864V3.78687H12.6611C13.5548 3.82432 14.3999 4.20402 15.0214 4.84735C15.643 5.49068 15.9934 6.34835 16 7.24286V11.3899C16.0302 12.283 15.7184 13.1539 15.1281 13.8248C14.5378 14.4957 13.7137 14.916 12.824 14.9999H4.32402C3.43051 14.9636 2.58544 14.584 1.96477 13.9402C1.3441 13.2965 0.995631 12.4381 0.991991 11.5439V7.3999C0.961876 6.50801 1.27273 5.63811 1.86125 4.96729C2.44978 4.29646 3.27186 3.87509 4.16008 3.78888H4.31609H7.91606V8.8399L6.71599 7.53485C6.66605 7.47881 6.60518 7.4337 6.53703 7.40222C6.46889 7.37075 6.39503 7.35362 6.31999 7.35193C6.24495 7.35024 6.17037 7.36402 6.10088 7.3924C6.03139 7.42077 5.96847 7.46317 5.91606 7.51691L5.8991 7.53485C5.804 7.64581 5.7468 7.78432 5.73601 7.93005C5.72521 8.07578 5.76133 8.22109 5.83904 8.34485L5.8991 8.42389L8.08306 10.8029C8.12939 10.8566 8.18581 10.9007 8.24919 10.9326C8.31258 10.9645 8.38167 10.9836 8.45244 10.9888C8.52321 10.994 8.5943 10.9852 8.66167 10.9629C8.72903 10.9406 8.79132 10.9053 8.84502 10.8589L8.90105 10.8029L11.085 8.42389C11.1939 8.30142 11.2541 8.14324 11.2541 7.97937C11.2541 7.8155 11.1939 7.65732 11.085 7.53485C10.9917 7.43044 10.8618 7.36591 10.7222 7.35455C10.5826 7.3432 10.444 7.38592 10.335 7.47388L10.2701 7.53485L9.07707 8.8349V3.78387L7.91899 3.78589Z"
                        fill="#60269E"
                     />
                  </svg>

                  <span>Download All</span>
               </button>
            </div>

            <div className="attachments-list">
               <div className="attached-item" />
               <div className="attached-item" />
               <div className="attached-item" />
            </div>
         </div>

         <div className="write-msg-main">
            <div className="write-msg-header">
               <div className="write-header-left">
                  <div className="profile-avatar">{/* <img src={avatar} alt="avatar" /> */}</div>
                  <div className="reply-block">
                     <div className="reply-icon">
                        <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M6.61203 9.99994C6.22562 9.93945 5.84955 9.82497 5.49497 9.65991C3.79347 8.8457 2.22394 7.78051 0.83896 6.49994L0.52292 6.16693C0.439374 6.07908 0.361222 5.98623 0.288911 5.88892C0.100662 5.63348 -0.000285894 5.32426 0.000946879 5.00696C-0.00279032 4.66514 0.106949 4.33174 0.312959 4.05896L0.63791 3.70892L0.709931 3.63391C2.15081 2.25814 3.80574 1.12575 5.60996 0.280945L5.81003 0.202942C6.06596 0.104352 6.33283 0.037182 6.60495 0.00292969C6.86855 0.00299294 7.12842 0.0657005 7.36301 0.185913C7.66366 0.355173 7.90015 0.618756 8.03598 0.935913C8.12479 1.2273 8.19728 1.52346 8.25302 1.82294C8.39393 2.77499 8.46075 3.73652 8.45297 4.69891V4.99396C8.46273 6.02119 8.40254 7.04789 8.27292 8.06696L8.17893 8.51996C8.13724 8.7438 8.07225 8.96262 7.98496 9.17291C7.85981 9.41991 7.66919 9.62778 7.43393 9.7738C7.19867 9.91982 6.92785 9.99838 6.65097 10.0009L6.61203 9.99994ZM10.656 5.99194C10.3929 5.99194 10.1406 5.88745 9.95456 5.70142C9.76852 5.51538 9.66391 5.26303 9.66391 4.99994C9.66391 4.73684 9.76852 4.4845 9.95456 4.29846C10.1406 4.11243 10.3929 4.00793 10.656 4.00793L13.7359 3.73492C14.0714 3.73492 14.3932 3.86824 14.6305 4.10547C14.8677 4.3427 15.0009 4.66444 15.0009 4.99994C15.0009 5.33544 14.8677 5.65718 14.6305 5.89441C14.3932 6.13164 14.0714 6.26495 13.7359 6.26495L10.656 5.99194Z"
                              fill="#7A86A1"
                           />
                        </svg>
                     </div>
                     <p>Reply to:</p>

                     <div className="reply-acc-name">
                        <p>Finch Hoot</p>
                        <button>
                           <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 6.10883L1.11804 9.99084L0.0090332 8.8808L3.89099 4.99884L0.0090332 1.11682L1.11804 0.0078125L5 3.88983L8.88196 0.0078125L9.99194 1.11682L6.10901 4.99982L9.99097 8.88184L8.88098 9.99182L5 6.10883Z" fill="#7A86A1" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
               <div className="write-header-right">
                  <button>
                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8.41376L2.05005 13.3638L0.635986 11.9498L5.58606 6.99976L0.635986 2.04974L2.05005 0.635742L7 5.58575L11.95 0.635742L13.364 2.04974L8.41394 6.99976L13.364 11.9498L11.95 13.3638L7 8.41376Z" fill="#7A86A1" />
                     </svg>
                  </button>
               </div>
            </div>

            <div className="message-text-field">
               <div className="textarea-extra-btns">
                  <div className="left-btns">
                     <button onClick={() => setViewEmojiPicker((prev) => !prev)}>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M7.50005 0.999847C5.7555 0.966921 4.056 1.55475 2.70464 2.65854C1.35327 3.76233 0.437906 5.31033 0.121876 7.02634C-0.194154 8.74234 0.109698 10.5148 0.979175 12.0276C1.84865 13.5404 3.22725 14.6951 4.86907 15.2859C4.69224 14.9139 4.5994 14.5076 4.5971 14.0958V12.7418C4.23829 12.5417 3.92465 12.2697 3.67583 11.9427C3.42702 11.6158 3.24834 11.241 3.15105 10.8419C3.13852 10.7604 3.14708 10.6772 3.17583 10.5999C3.20458 10.5227 3.25262 10.454 3.31536 10.4006C3.3781 10.3472 3.45341 10.3107 3.53423 10.2946C3.61505 10.2786 3.69862 10.2835 3.77703 10.3088C6.22239 10.9119 8.77771 10.9119 11.2231 10.3088C11.3015 10.2837 11.3849 10.2791 11.4656 10.2953C11.5463 10.3114 11.6216 10.348 11.6843 10.4013C11.7469 10.4547 11.7949 10.5231 11.8238 10.6002C11.8526 10.6773 11.8613 10.7605 11.849 10.8419C11.7518 11.241 11.5731 11.6158 11.3243 11.9427C11.0755 12.2697 10.7618 12.5417 10.403 12.7418V14.0958C10.4007 14.5076 10.3079 14.9139 10.131 15.2859C11.7729 14.6951 13.1514 13.5404 14.0209 12.0276C14.8904 10.5148 15.1943 8.74234 14.8782 7.02634C14.5622 5.31033 13.6468 3.76233 12.2955 2.65854C10.9441 1.55475 9.2446 0.966921 7.50005 0.999847ZM5.0811 7.89987C4.89353 7.89672 4.711 7.83816 4.55657 7.73166C4.40213 7.62515 4.28267 7.47545 4.21306 7.30124C4.14345 7.12703 4.12681 6.93614 4.16533 6.75253C4.20385 6.56893 4.29574 6.4008 4.42949 6.26926C4.56325 6.13771 4.73294 6.04861 4.91716 6.01315C5.10138 5.9777 5.29199 5.99741 5.46502 6.06992C5.63804 6.14242 5.78578 6.26443 5.8897 6.42062C5.99361 6.57681 6.04897 6.76024 6.049 6.94784C6.04808 7.07395 6.02236 7.19866 5.97319 7.31479C5.92403 7.43092 5.85242 7.53617 5.7625 7.6246C5.67259 7.71303 5.56608 7.78294 5.44915 7.83017C5.33221 7.87739 5.20721 7.90106 5.0811 7.89987ZM9.92009 7.89987C9.73252 7.89672 9.54999 7.83816 9.39556 7.73166C9.24112 7.62515 9.12166 7.47545 9.05205 7.30124C8.98244 7.12703 8.9658 6.93614 9.00432 6.75253C9.04284 6.56893 9.13473 6.4008 9.26848 6.26926C9.40224 6.13771 9.57193 6.04861 9.75615 6.01315C9.94037 5.9777 10.131 5.99741 10.304 6.06992C10.477 6.14242 10.6248 6.26443 10.7287 6.42062C10.8326 6.57681 10.888 6.76024 10.888 6.94784C10.8871 7.07395 10.8614 7.19866 10.8122 7.31479C10.763 7.43092 10.6914 7.53617 10.6015 7.6246C10.5116 7.71303 10.4051 7.78294 10.2881 7.83017C10.1712 7.87739 10.0462 7.90106 9.92009 7.89987ZM8.86504 11.9059C8.76273 11.8613 8.65189 11.8398 8.54033 11.8427C8.42878 11.8457 8.31931 11.8732 8.21953 11.9232C8.11976 11.9732 8.03213 12.0445 7.96294 12.132C7.89375 12.2196 7.84459 12.3213 7.81902 12.4299L7.76506 12.6618C7.75091 12.7205 7.7174 12.7728 7.66997 12.8102C7.62254 12.8475 7.56396 12.8678 7.50359 12.8678C7.44322 12.8678 7.38452 12.8475 7.33709 12.8102C7.28965 12.7728 7.25615 12.7205 7.24199 12.6618L7.18706 12.4299C7.16149 12.3213 7.11233 12.2196 7.04314 12.132C6.97395 12.0445 6.88644 11.9732 6.78667 11.9232C6.6869 11.8732 6.5773 11.8457 6.46575 11.8427C6.35419 11.8398 6.24335 11.8613 6.14104 11.9059C6.11404 11.9179 6.15002 11.8999 5.56902 12.1859V14.0609C5.57644 14.567 5.78185 15.0501 6.14116 15.4067C6.50048 15.7633 6.98519 15.9649 7.49138 15.9685C7.99758 15.972 8.48492 15.7771 8.84917 15.4256C9.21342 15.0741 9.42551 14.5939 9.43999 14.0879V12.1878C8.84899 11.8998 8.88806 11.9208 8.86406 11.9078L8.86504 11.9059Z"
                              fill="#7A86A1"
                           />
                        </svg>
                     </button>
                     <label htmlFor="message-file">
                        <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M4.12593 18C3.01815 17.9821 1.96258 17.5259 1.19038 16.7314C0.41819 15.9369 -0.0077003 14.8688 0.00593639 13.761V4.06104C-0.00983486 3.00099 0.395837 1.97801 1.13387 1.21692C1.87189 0.455827 2.88194 0.0187984 3.94197 0.00195312H8.60201C8.70987 0.00405651 8.81244 0.0488794 8.88741 0.126465C8.96237 0.20405 9.00352 0.308145 9.00191 0.416016V3.31604C8.99411 4.10014 9.29602 4.85563 9.842 5.41846C10.388 5.98129 11.1339 6.30599 11.9179 6.32202C12.2909 6.32202 12.6179 6.32203 12.9069 6.32703H13.9659C14.1659 6.32703 14.394 6.32703 14.597 6.32703C14.7019 6.32886 14.8018 6.37184 14.8753 6.44666C14.9488 6.52147 14.99 6.62217 14.9899 6.72705V13.963C15.0047 15.0181 14.6003 16.0361 13.8657 16.7936C13.131 17.5511 12.1261 17.9864 11.071 18.004L4.12593 18ZM4.13496 12.277C4.13438 12.4527 4.20251 12.6218 4.32491 12.7479C4.44731 12.8741 4.6143 12.9473 4.78999 12.952H9.53792C9.71353 12.9471 9.88029 12.8738 10.0026 12.7477C10.125 12.6216 10.1933 12.4527 10.1929 12.277C10.1937 12.1902 10.1775 12.1041 10.145 12.0236C10.1125 11.9431 10.0644 11.8698 10.0036 11.8079C9.94279 11.7459 9.87038 11.6965 9.79048 11.6626C9.71059 11.6287 9.62472 11.6108 9.53792 11.61H4.7889C4.61393 11.6118 4.44689 11.683 4.3243 11.8079C4.2017 11.9327 4.13363 12.102 4.13496 12.277ZM4.13496 7.78601C4.13363 7.96115 4.20185 8.12965 4.32466 8.25452C4.44747 8.37939 4.61486 8.45044 4.78999 8.45203H7.73897C7.9141 8.45044 8.08149 8.37939 8.2043 8.25452C8.32711 8.12965 8.39533 7.96115 8.394 7.78601C8.39433 7.61033 8.32604 7.44139 8.20369 7.31531C8.08134 7.18923 7.91458 7.11591 7.73897 7.11096H4.78999C4.61464 7.11591 4.44816 7.18917 4.326 7.31506C4.20385 7.44096 4.13561 7.60961 4.13594 7.78503L4.13496 7.78601ZM12.035 5.00403C11.5614 4.99431 11.1107 4.79825 10.7807 4.4585C10.4507 4.11874 10.2679 3.6626 10.2719 3.18896V0.81604C10.2695 0.70445 10.3115 0.596402 10.3885 0.515625C10.4655 0.434848 10.5714 0.387893 10.6829 0.38501C10.7402 0.384421 10.797 0.395782 10.8497 0.418335C10.9024 0.440888 10.9498 0.474121 10.989 0.515991L14.503 4.28406C14.58 4.36721 14.6216 4.47702 14.619 4.59033C14.6164 4.70364 14.5697 4.81148 14.489 4.89099C14.4127 4.96548 14.3106 5.00778 14.2039 5.00903H13.5949C13.0449 5.00903 12.476 5.00903 12.035 5.00403Z"
                              fill="#7A86A1"
                           />
                        </svg>
                     </label>
                     <input type="file" hidden id="message-file" />
                     <label htmlFor="message-images">
                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11.73 13.0001H3.27002C2.41971 13.0154 1.59807 12.6929 0.985107 12.1034C0.372149 11.5139 0.0178617 10.7054 0 9.8551V5.57007C0.0175994 4.71972 0.371725 3.91112 0.984741 3.32153C1.59776 2.73195 2.41963 2.40963 3.27002 2.42517C3.29978 2.42639 3.32917 2.41868 3.35461 2.4032C3.38006 2.38772 3.40037 2.36512 3.41296 2.33813L3.45703 2.2511L3.51904 2.12512C3.71904 1.72512 3.93702 1.27807 4.07202 1.01807C4.22486 0.710068 4.46135 0.451342 4.75439 0.271484C5.04744 0.091625 5.38518 -0.0020663 5.729 0.00109795H9.26196C9.60699 -0.00286763 9.94625 0.0903987 10.2407 0.270263C10.5352 0.450127 10.773 0.709285 10.927 1.01807C11.045 1.24607 11.227 1.61016 11.397 1.96216L11.5031 2.17908L11.578 2.33813C11.5929 2.36476 11.6147 2.38691 11.6411 2.40222C11.6675 2.41753 11.6975 2.42546 11.728 2.42517C12.5785 2.40963 13.4004 2.73198 14.0135 3.32153C14.6267 3.91109 14.9812 4.71963 14.999 5.57007V9.8551C14.9812 10.7052 14.627 11.5135 14.0143 12.103C13.4015 12.6925 12.5801 13.0151 11.73 13.0001ZM7.5 4.62415C6.71978 4.621 5.969 4.92194 5.40698 5.46313C5.13554 5.72052 4.91962 6.03068 4.77258 6.37463C4.62554 6.71859 4.5505 7.08907 4.552 7.46313C4.56672 8.22895 4.88488 8.95762 5.43652 9.48901C5.98817 10.0204 6.72819 10.311 7.49402 10.2971H7.49902C8.27266 10.3006 9.01741 10.0034 9.57605 9.46814C9.84941 9.21228 10.0676 8.90329 10.2175 8.56018C10.3674 8.21707 10.4457 7.84706 10.4476 7.47266C10.4496 7.09825 10.3753 6.72735 10.229 6.38269C10.0827 6.03803 9.8677 5.72685 9.59705 5.46814L9.58398 5.45508C9.02386 4.91753 8.27632 4.61951 7.5 4.62415ZM11.707 4.45117C11.5803 4.45762 11.4583 4.50096 11.356 4.57593C11.2536 4.65089 11.1755 4.75419 11.1311 4.87305C11.0867 4.9919 11.0781 5.12107 11.1063 5.24475C11.1345 5.36844 11.1983 5.48121 11.2898 5.56909C11.3813 5.65697 11.4965 5.71619 11.6212 5.73938C11.7459 5.76257 11.8747 5.7487 11.9917 5.69958C12.1087 5.65047 12.2086 5.56817 12.2794 5.46289C12.3502 5.35761 12.3887 5.23403 12.39 5.10718C12.3893 5.01895 12.3709 4.93173 12.3359 4.85071C12.301 4.76969 12.2503 4.69649 12.1866 4.63538C12.123 4.57426 12.0478 4.52639 11.9655 4.49475C11.8831 4.46311 11.7952 4.44837 11.707 4.45117ZM7.5 9.21313C7.0269 9.22332 6.56914 9.04524 6.22729 8.71802C5.88545 8.3908 5.6875 7.94124 5.677 7.46814V7.45312C5.67452 7.22321 5.71992 6.99535 5.8103 6.78394C5.90069 6.57252 6.03411 6.38216 6.20203 6.2251C6.5478 5.8929 7.00783 5.7061 7.4873 5.70312C7.96678 5.70015 8.42918 5.88123 8.77905 6.20911C8.94867 6.36764 9.08418 6.55908 9.17737 6.77173C9.27055 6.98438 9.31945 7.21376 9.32104 7.44592C9.32264 7.67809 9.27691 7.90816 9.18665 8.12207C9.09638 8.33598 8.96345 8.52922 8.79602 8.69006C8.44855 9.02641 7.9836 9.21411 7.5 9.21313Z"
                              fill="#60269E"
                           />
                        </svg>
                     </label>
                     <input type="file" hidden accept="image/*" multiple onChange={handleImageFileChange} id="message-images" />
                  </div>
                  <button className="send-btn">Send</button>
                  {viewEmojiPicker && (
                     <ClickAwayListener onClickAway={() => setViewEmojiPicker(false)}>
                        <div className="emoji-picker-main">
                           <EmojiPicker searchDisabled previewConfig={false} onEmojiClick={onEmojiClick} height={200} />
                        </div>
                     </ClickAwayListener>
                  )}
               </div>
               <div className="attachment-prev-main">
                  {imagePreview.map((image, index) => (
                     <div className="attachment-prev" key={index}>
                        <img src={image} alt="" />
                        <button className="cancel-attach" onClick={() => handleRemoveImage(index)}>
                           <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 4.88684L0.894043 7.99292L0.00695801 7.10583L3.11304 3.99988L0.00695801 0.893921L0.894043 0.00683594L4 3.11292L7.10596 0.00683594L7.99304 0.893921L4.88696 3.99988L7.99304 7.10583L7.10596 7.99292L4 4.88684Z" fill="#7A86A1" />
                           </svg>
                        </button>
                     </div>
                  ))}
               </div>

               <div ref={quillRef} />
            </div>
         </div>
      </Wrapper>
   );
};

export default MessageBlock;
