import * as React from "react";
const MessageIcon = (props) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={props.width || 15} height={props.height || 16} fill={props.color || "#707070"} {...props}>
      <path d="M7.5 16a7.456 7.456 0 0 1-3.688-.976c-.242-.18-.53-.29-.83-.318a.906.906 0 0 0-.287.047l-1.514.45a.56.56 0 0 1-.169.027.465.465 0 0 1-.375-.179.487.487 0 0 1-.07-.434l.5-1.684a.786.786 0 0 0-.052-.676A7.94 7.94 0 0 1 0 8.505a7.63 7.63 0 0 1 2.122-5.241 7.49 7.49 0 0 1 12.301 2.36c.377.906.57 1.878.57 2.859a7.618 7.618 0 0 1-.648 3.131 7.2 7.2 0 0 1-1.705 2.367A7.676 7.676 0 0 1 7.5 16Zm3.441-8.449a.962.962 0 1 0 .365.073.962.962 0 0 0-.369-.073h.004Zm-3.47 0a.964.964 0 1 0 .02 0h-.02Zm-3.442 0a.962.962 0 1 0 .365.073.963.963 0 0 0-.369-.073h.004Z" />
   </svg>
);
export default MessageIcon;
