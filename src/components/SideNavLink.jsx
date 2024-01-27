import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.li`
   a {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 15px 20px;
      border-radius: 20px;
      position: relative;
      margin-top: 5px;

      svg {
         width: 20px;
      }

      &:hover {
         background-color: #60269e;
         svg {
            fill: #fff;
            path {
               fill: #fff;
            }
         }
         p {
            color: #fff;
         }
      }
      &.active {
         background-color: #60269e;
         svg {
            fill: #fff;
            path {
               fill: #fff;
            }
         }
         p {
            color: #fff;
         }
      }

      p {
         font-weight: 400;
         font-size: 16px;
         line-height: 21px;
         color: #7a86a1;
      }

      .badge {
         position: absolute;
         top: 50%;
         right: 20px;
         transform: translateY(-50%);
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

   @media (min-width: 768px) and (max-width: 1024px) {
      a {
         padding: 10px 15px;
         border-radius: 15px;
         gap: 10px;

         svg{
            width: 16px;
         }

         p{
            font-size: 15px;
         }

         .badge{
            height: 18px;
            width: 18px;
            font-size: 10px;
            border-radius: 6px;
         }
      }
   }
`;

const SideNavLink = ({ icon, title, link, badge = 0 }) => {
   const location = useLocation();

   const path = location.pathname;

   var isActive = false;
   if (path === link) {
      isActive = true;
   }

   return (
      <Wrapper>
         <Link to={link} className={isActive ? "active" : ""}>
            {icon}
            <p>{title}</p>
            {badge > 0 && <span className="badge">{badge}</span>}
         </Link>
      </Wrapper>
   );
};

export default SideNavLink;
