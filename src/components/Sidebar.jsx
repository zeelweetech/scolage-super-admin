import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideNavLink from "./SideNavLink";
import { useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const SidebarStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 293px;
  height: 100vh;
  border-right: 1px solid #707070;
  background-color: #fff;
  padding: 40px 20px;

  .logo {
    width: 187px;
    padding-bottom: 17px;
  }

  .side-nav-main {
    height: calc(100% - 240px);
    margin-right: -10px;
    padding-right: 10px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      padding: 3px;
      background: #e7ebee;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #60269e;
      border-radius: 100px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #0f3a5d;
    }

    ul {
      padding: 35px 0 74px;
      border-bottom: 1px solid #707070;

      &:last-child {
        border: none;
      }
    }
  }

  .sidebar-bottom {
    .teamdb-cta {
      border-radius: 30px;
      overflow: hidden;
      padding-bottom: 50px;
      a {
        height: 102px;
        max-width: 212px;
        width: 100%;
        margin: 0 auto;
        display: block;
        background-image: url("/db-cta-bg.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        align-items: end;
        justify-content: end;
        padding: 20px;

        .teamdb-cta-inner {
          max-width: 132px;
          font-weight: 400;
          font-size: 14px;
          line-height: 19px;
          color: #f6efff;
          display: flex;
          align-items: flex-end;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 200px;
    padding: 30px 12px;
    .logo {
      width: 136px;
      padding-bottom: 17px;
    }

    .side-nav-main {
      height: calc(100% - 210px);
      ul {
        padding: 10px 0 44px;
      }
    }

    .sidebar-bottom {
      .teamdb-cta {
        padding-bottom: 20px;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 200px;
    padding: 30px 12px;
    .logo {
      width: 136px;
      padding-bottom: 17px;
    }

    .side-nav-main {
      height: calc(100% - 210px);
      ul {
        padding: 10px 0 44px;
      }
    }

    .sidebar-bottom {
      .teamdb-cta {
        padding-bottom: 20px;
      }
    }
  }
`;

const firstNav = [
  {
    link: "/dashboard",
    title: "Dashboard",
    icon: (
      <svg
        fill="#7A86A1"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 20C13.1896 19.9842 12.4179 19.6503 11.8516 19.0702C11.2854 18.4901 10.9702 17.7106 10.974 16.9V13.88C10.9668 13.0695 11.2813 12.2893 11.8486 11.7104C12.4159 11.1315 13.1896 10.8012 14 10.792H16.96C17.7709 10.8038 18.5445 11.1345 19.1134 11.7124C19.6824 12.2903 20.0009 13.069 20 13.88V16.9C20.0002 17.7109 19.6827 18.4895 19.1155 19.069C18.5483 19.6485 17.7767 19.9827 16.966 20H14ZM12.6 13.879V16.9C12.5964 17.279 12.7431 17.6439 13.008 17.915C13.1352 18.0475 13.2878 18.1531 13.4567 18.2254C13.6256 18.2978 13.8073 18.3354 13.991 18.336H16.972C17.1557 18.3354 17.3374 18.2978 17.5063 18.2254C17.6752 18.1531 17.8278 18.0475 17.955 17.915C18.2199 17.644 18.3663 17.2789 18.362 16.9V13.88C18.3635 13.5019 18.2162 13.1384 17.952 12.868C17.8236 12.7351 17.6698 12.6293 17.4998 12.557C17.3297 12.4847 17.1468 12.4473 16.962 12.447H14C13.6244 12.4518 13.2661 12.6053 13.0036 12.874C12.7412 13.1426 12.596 13.5044 12.6 13.88V13.879ZM3.033 19.984C2.22675 19.9583 1.46147 19.6226 0.896495 19.0469C0.331525 18.4711 0.010408 17.6996 2.96813e-06 16.893V13.88C-0.00112279 13.0628 0.318024 12.2777 0.889003 11.693C1.16831 11.4073 1.50202 11.1805 1.87043 11.0259C2.23883 10.8713 2.63448 10.7922 3.034 10.793H4.25C4.40312 10.7765 4.55777 10.8041 4.69576 10.8725C4.83376 10.9408 4.94936 11.0472 5.029 11.179C5.1104 11.3121 5.15348 11.465 5.15348 11.621C5.15348 11.777 5.1104 11.9299 5.029 12.063C4.94931 12.1948 4.83373 12.3012 4.69578 12.3698C4.55782 12.4383 4.4032 12.4661 4.25 12.45H3.035C2.65881 12.454 2.29944 12.6065 2.0353 12.8744C1.77115 13.1423 1.62366 13.5038 1.625 13.88V16.864C1.63101 17.238 1.78088 17.5952 2.04347 17.8615C2.30606 18.1278 2.66117 18.2827 3.035 18.294H6.014C6.20047 18.2949 6.38519 18.2581 6.55705 18.1857C6.72891 18.1134 6.88434 18.007 7.014 17.873C7.28005 17.6022 7.42878 17.2376 7.428 16.858V12.382C7.39798 12.2192 7.41659 12.0512 7.48151 11.899C7.54642 11.7468 7.65477 11.617 7.793 11.526C7.92986 11.4362 8.09097 11.3906 8.25459 11.3952C8.41821 11.3999 8.57647 11.4546 8.708 11.552C8.8409 11.6508 8.94174 11.7866 8.99794 11.9424C9.05414 12.0982 9.0632 12.2671 9.024 12.428V16.89C9.02849 17.2928 8.95356 17.6925 8.80349 18.0664C8.65342 18.4402 8.43115 18.7808 8.14938 19.0687C7.86762 19.3566 7.53189 19.5861 7.16137 19.7442C6.79085 19.9023 6.39281 19.9858 5.99 19.99L3.033 19.984ZM15.78 9.23801C15.5779 9.21265 15.392 9.11438 15.2572 8.96164C15.1224 8.8089 15.048 8.61219 15.048 8.40849C15.048 8.20479 15.1224 8.0081 15.2572 7.85536C15.392 7.70262 15.5779 7.60435 15.78 7.57899H16.968C17.1552 7.57786 17.3402 7.53902 17.512 7.4648C17.6838 7.39057 17.8389 7.2825 17.968 7.147C18.2307 6.86989 18.3743 6.50081 18.368 6.119V3.10001C18.3668 2.72627 18.2199 2.36775 17.9584 2.10069C17.697 1.83364 17.3416 1.67911 16.968 1.67H14C13.6249 1.67448 13.2669 1.82755 13.0044 2.09561C12.742 2.36368 12.5965 2.72488 12.6 3.10001V7.619C12.5953 7.83714 12.5052 8.04471 12.349 8.19711C12.1929 8.34951 11.9832 8.43458 11.765 8.43401C11.6577 8.43137 11.552 8.40716 11.4543 8.36284C11.3565 8.31851 11.2687 8.25497 11.196 8.17599C11.0492 8.01348 10.972 7.79983 10.981 7.58099V3.10001C10.977 2.28221 11.2941 1.49549 11.864 0.908997C12.1416 0.622916 12.4735 0.395152 12.8403 0.239059C13.2071 0.0829667 13.6014 0.00169125 14 0H16.96C17.7664 0.0277742 18.531 0.365587 19.0945 0.943069C19.658 1.52055 19.977 2.29318 19.985 3.10001V6.11301C19.9964 6.92879 19.6881 7.71662 19.126 8.308C18.8512 8.5972 18.5214 8.82869 18.156 8.98889C17.7906 9.14909 17.3969 9.2348 16.998 9.241L15.78 9.23801ZM6 9.209H3.035C2.22498 9.19535 1.45278 8.86383 0.885001 8.28595C0.31722 7.70807 -0.000636845 6.93013 2.96813e-06 6.12V3.10001C-0.000180825 2.28914 0.317349 1.51049 0.884513 0.930984C1.45168 0.351482 2.22332 0.0172635 3.034 0H6C6.81131 0.0141964 7.58434 0.347571 8.15152 0.927856C8.7187 1.50814 9.03434 2.28858 9.03 3.10001V6.12199C9.03371 6.93971 8.71418 7.72579 8.141 8.30901C7.86268 8.59488 7.52973 8.82186 7.16192 8.97647C6.79412 9.13108 6.39898 9.21016 6 9.209ZM2.026 2.077C1.75685 2.34871 1.60559 2.71555 1.605 3.09801V6.12C1.60118 6.31185 1.63545 6.50256 1.70582 6.68108C1.7762 6.85959 1.88129 7.02237 2.015 7.16C2.1435 7.29224 2.29704 7.39757 2.46667 7.46985C2.63629 7.54213 2.81862 7.57991 3.003 7.58099H6.003C6.1902 7.58014 6.3753 7.54143 6.54715 7.46719C6.71901 7.39295 6.87406 7.28472 7.003 7.149C7.26656 6.87241 7.41031 6.50298 7.403 6.121V3.10001C7.40257 2.72604 7.25587 2.36707 6.99426 2.09985C6.73264 1.83263 6.37687 1.67835 6.003 1.67H3.008C2.82553 1.66949 2.64478 1.70521 2.47621 1.77507C2.30764 1.84493 2.15462 1.94756 2.026 2.077Z" />
      </svg>
    ),
  },
  {
    link: "/colleges",
    title: "Colleges",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.253 20C2.392 20 0 17.608 0 13.756V6.256C0 2.392 2.392 0 6.253 0H13.746C17.59 0 20 2.39201 20 6.25301V8.575C20.0001 8.67533 19.9805 8.7747 19.9422 8.86745C19.904 8.96019 19.8478 9.04449 19.7769 9.11552C19.7061 9.18656 19.6219 9.24295 19.5293 9.28146C19.4367 9.31998 19.3373 9.33987 19.237 9.34H19.226C19.0255 9.34 18.8332 9.26035 18.6914 9.11858C18.5497 8.9768 18.47 8.7845 18.47 8.584C18.47 8.578 18.47 8.57199 18.47 8.56599V6.25301C18.47 3.21001 16.79 1.53 13.747 1.53H6.253C3.2 1.53 1.53 3.21001 1.53 6.25301V13.753C1.53 16.796 3.21 18.467 6.253 18.467H13.746C16.798 18.467 18.469 16.787 18.469 13.753C18.469 13.5501 18.5496 13.3555 18.6931 13.2121C18.8365 13.0686 19.0311 12.988 19.234 12.988C19.4369 12.988 19.6315 13.0686 19.7749 13.2121C19.9184 13.3555 19.999 13.5501 19.999 13.753C19.999 17.608 17.608 20 13.756 20H6.253ZM5.7 15.479C5.49725 15.472 5.30559 15.3847 5.16719 15.2363C5.02879 15.088 4.95498 14.8908 4.962 14.688V8.28799C4.96878 8.08736 5.05498 7.89764 5.20163 7.76056C5.34828 7.62347 5.54337 7.55026 5.744 7.55701H5.753C5.95602 7.56405 6.14793 7.65143 6.28651 7.79996C6.4251 7.94848 6.49902 8.14598 6.492 8.349V14.74C6.48526 14.9384 6.40169 15.1263 6.25895 15.2642C6.11621 15.4021 5.92547 15.4791 5.727 15.479H5.7ZM9.27 14.7V5.321C9.27 5.11811 9.3506 4.92353 9.49406 4.78006C9.63753 4.63659 9.83211 4.556 10.035 4.556C10.2379 4.556 10.4325 4.63659 10.5759 4.78006C10.7194 4.92353 10.8 5.11811 10.8 5.321V14.7C10.8 14.9029 10.7194 15.0975 10.5759 15.2409C10.4325 15.3844 10.2379 15.465 10.035 15.465C9.83211 15.465 9.63753 15.3844 9.49406 15.2409C9.3506 15.0975 9.27 14.9029 9.27 14.7ZM13.509 14.691V11.7C13.509 11.497 13.5897 11.3023 13.7332 11.1587C13.8768 11.0151 14.0715 10.9345 14.2745 10.9345C14.4775 10.9345 14.6722 11.0151 14.8158 11.1587C14.9594 11.3023 15.04 11.497 15.04 11.7V14.691C15.04 14.894 14.9594 15.0887 14.8158 15.2323C14.6722 15.3758 14.4775 15.4565 14.2745 15.4565C14.0715 15.4565 13.8768 15.3758 13.7332 15.2323C13.5897 15.0887 13.509 14.894 13.509 14.691Z"
          fill="#7A86A1"
        />
      </svg>
    ),
  },
  {
    link: "/applicants",
    title: "Applicants",
    icon: (
      <svg
        width="17"
        height="21"
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.56501 21C3.96352 20.9981 3.36828 20.8778 2.8133 20.6459C2.25832 20.4139 1.75448 20.0749 1.33056 19.6482C0.906629 19.2215 0.570928 18.7155 0.342629 18.159C0.11433 17.6025 -0.00209282 17.0065 1.17336e-05 16.405C1.17336e-05 16.372 1.17336e-05 16.34 1.17336e-05 16.305V13.782C-0.00366101 13.6817 0.0129293 13.5816 0.0487903 13.4878C0.0846512 13.394 0.139048 13.3085 0.208729 13.2362C0.27841 13.1639 0.361946 13.1064 0.454346 13.0671C0.546746 13.0279 0.646112 13.0076 0.74651 13.0076C0.846908 13.0076 0.946277 13.0279 1.03868 13.0671C1.13108 13.1064 1.21461 13.1639 1.28429 13.2362C1.35398 13.3085 1.40837 13.394 1.44423 13.4878C1.48009 13.5816 1.49668 13.6817 1.49301 13.782V16.305C1.47122 17.1259 1.77604 17.9219 2.34056 18.5182C2.90507 19.1146 3.68315 19.4627 4.50401 19.486H12.51C13.3175 19.4358 14.075 19.0779 14.6264 18.4859C15.1778 17.8939 15.4812 17.113 15.474 16.304V7.37897L11.665 3.36496V4.68097C11.6629 5.16399 11.8519 5.62825 12.1908 5.97241C12.5297 6.31657 12.991 6.5127 13.474 6.51797C13.6742 6.51797 13.8663 6.59752 14.0079 6.73911C14.1495 6.8807 14.229 7.07274 14.229 7.27298C14.229 7.47322 14.1495 7.66523 14.0079 7.80682C13.8663 7.94841 13.6742 8.02798 13.474 8.02798C12.5933 8.01901 11.7518 7.66185 11.1335 7.03455C10.5152 6.40724 10.1703 5.56076 10.174 4.67996V2.51797H4.56501C3.76351 2.51956 2.99431 2.83402 2.42125 3.39438C1.84818 3.95474 1.51656 4.71671 1.49701 5.51797V9.67697C1.50069 9.7773 1.4841 9.87736 1.44823 9.97113C1.41237 10.0649 1.35798 10.1505 1.2883 10.2227C1.21861 10.295 1.13508 10.3525 1.04268 10.3918C0.950279 10.4311 0.850909 10.4513 0.750511 10.4513C0.650114 10.4513 0.550748 10.4311 0.458348 10.3918C0.365947 10.3525 0.282408 10.295 0.212727 10.2227C0.143046 10.1505 0.088649 10.0649 0.0527881 9.97113C0.0169271 9.87736 0.000340603 9.7773 0.00401335 9.67697V5.51797C0.0274137 4.32019 0.517178 3.1788 1.36914 2.33655C2.2211 1.4943 3.36804 1.01763 4.56601 1.00797H10.866C10.8847 1.00268 10.9038 0.998673 10.923 0.995972C10.9422 0.999009 10.9612 1.00301 10.98 1.00797H11.18C11.281 1.00815 11.3808 1.02891 11.4735 1.06897C11.5662 1.10903 11.6497 1.16755 11.719 1.24097L16.759 6.55298C16.8937 6.69386 16.9693 6.88104 16.97 7.07596V16.304C16.9856 17.513 16.5285 18.6803 15.6963 19.5574C14.864 20.4345 13.7222 20.9521 12.514 21H4.56501ZM5.36501 15.406C5.16478 15.406 4.97274 15.3264 4.83115 15.1848C4.68956 15.0433 4.61001 14.8512 4.61001 14.651C4.61001 14.4507 4.68956 14.2587 4.83115 14.1171C4.97274 13.9755 5.16478 13.896 5.36501 13.896H10.736C10.9362 13.896 11.1283 13.9755 11.2699 14.1171C11.4115 14.2587 11.491 14.4507 11.491 14.651C11.491 14.8512 11.4115 15.0433 11.2699 15.1848C11.1283 15.3264 10.9362 15.406 10.736 15.406H5.36501ZM5.36501 10.42C5.16478 10.42 4.97274 10.3404 4.83115 10.1988C4.68956 10.0572 4.61001 9.86522 4.61001 9.66498C4.61001 9.46474 4.68956 9.27269 4.83115 9.1311C4.97274 8.98951 5.16478 8.90997 5.36501 8.90997H8.70001C8.90025 8.90997 9.09229 8.98951 9.23388 9.1311C9.37547 9.27269 9.45501 9.46474 9.45501 9.66498C9.45501 9.86522 9.37547 10.0572 9.23388 10.1988C9.09229 10.3404 8.90025 10.42 8.70001 10.42H5.36501Z"
          fill="#7A86A1"
        />
      </svg>
    ),
  },
  {
    link: "/financial",
    title: "Financial",
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.94197 19.039C3.89048 18.0682 2.23024 16.4284 1.23408 14.3891C0.237922 12.3498 -0.0348976 10.0323 0.460453 7.81745C0.955803 5.60256 2.18986 3.62205 3.95982 2.20139C5.72979 0.780722 7.93038 0.00440531 10.2 2.60383e-06C10.931 -0.000534416 11.6596 0.0819972 12.372 0.246005C14.9555 0.81701 17.2064 2.39085 18.6296 4.62137C20.0528 6.85189 20.5317 9.55642 19.961 12.14L19.942 12.225C19.9232 12.3307 19.8828 12.4313 19.8233 12.5207C19.7638 12.61 19.6865 12.6861 19.5963 12.7442C19.506 12.8023 19.4047 12.8412 19.2988 12.8583C19.1928 12.8755 19.0845 12.8706 18.9805 12.844C18.8765 12.8174 18.7791 12.7696 18.6945 12.7036C18.6098 12.6376 18.5397 12.5548 18.4885 12.4605C18.4373 12.3662 18.4061 12.2623 18.3969 12.1553C18.3877 12.0484 18.4007 11.9407 18.435 11.839C18.8845 9.82219 18.5742 7.71045 17.5636 5.90817C16.553 4.1059 14.9131 2.73977 12.9579 2.07138C11.0027 1.403 8.86963 1.47934 6.96722 2.2858C5.06482 3.09226 3.52676 4.57216 2.64759 6.44208C1.76842 8.312 1.60994 10.4405 2.2025 12.42C2.79505 14.3995 4.09698 16.0909 5.85898 17.1702C7.62098 18.2495 9.7192 18.6409 11.7518 18.2694C13.7844 17.8979 15.6086 16.7898 16.875 15.157C17.0113 15.0299 17.1887 14.9557 17.375 14.9481C17.5613 14.9405 17.7442 14.9999 17.8905 15.1155C18.0368 15.231 18.1368 15.3952 18.1725 15.5782C18.2082 15.7612 18.1771 15.9509 18.085 16.113C16.6972 17.9113 14.7369 19.1817 12.5286 19.7138C10.3203 20.2459 7.9965 20.0078 5.94197 19.039ZM6.76697 13.934C6.57095 13.873 6.40716 13.7367 6.31155 13.555C6.21593 13.3733 6.1963 13.1611 6.25697 12.965V12.96L7.78197 8.081C7.821 7.96321 7.88752 7.85642 7.97604 7.76947C8.06456 7.68252 8.17251 7.61791 8.29097 7.581L13.163 6.055C13.31 6.00192 13.471 6.00192 13.618 6.055C13.8118 6.11266 13.9748 6.24489 14.0711 6.42264C14.1675 6.60039 14.1894 6.80912 14.132 7.00299L14.127 7.01999L12.567 11.908C12.5363 12.0082 12.4855 12.1011 12.4178 12.181C12.3501 12.261 12.2668 12.3263 12.173 12.373L11.297 12.812C11.1162 12.8717 10.9199 12.8633 10.7449 12.7885C10.5699 12.7136 10.4283 12.5774 10.3466 12.4055C10.2649 12.2336 10.2489 12.0377 10.3014 11.8548C10.354 11.6718 10.4715 11.5144 10.632 11.412L11.22 11.122L12.196 7.97501L9.12897 8.94001L7.72897 13.424C7.6686 13.6193 7.53313 13.7826 7.35236 13.8781C7.17159 13.9735 6.9603 13.9933 6.76497 13.933L6.76697 13.934Z"
          fill="#7A86A1"
        />
      </svg>
    ),
  },
  {
    link: "/settings",
    title: "Settings",
    icon: (
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.532 18.318C13.5299 18.1394 13.5987 17.9673 13.7234 17.8394C13.8481 17.7115 14.0184 17.6384 14.197 17.636C15.3893 17.6199 16.5265 17.1313 17.3588 16.2774C18.1911 15.4236 18.6504 14.2743 18.636 13.082V7.36499H15.362C14.8305 7.36499 14.3208 7.57614 13.945 7.95197C13.5692 8.32779 13.358 8.83749 13.358 9.36899C13.358 9.90048 13.5692 10.4102 13.945 10.786C14.3208 11.1619 14.8305 11.373 15.362 11.373H16.722C16.9029 11.373 17.0764 11.4449 17.2043 11.5728C17.3322 11.7007 17.404 11.8741 17.404 12.055C17.404 12.2359 17.3322 12.4094 17.2043 12.5373C17.0764 12.6652 16.9029 12.737 16.722 12.737H15.362C14.483 12.7156 13.6472 12.3513 13.033 11.722C12.4189 11.0928 12.0751 10.2483 12.0751 9.36899C12.0751 8.48969 12.4189 7.64525 13.033 7.01596C13.6472 6.38667 14.483 6.02243 15.362 6.00101H18.636V5.91901C18.6507 4.72653 18.1914 3.57698 17.3591 2.7229C16.5268 1.86882 15.3895 1.38009 14.197 1.36401H5.79703C4.85053 1.37483 3.93221 1.68757 3.17585 2.25668C2.41949 2.8258 1.8646 3.62155 1.59202 4.52802H10.354C10.5349 4.52802 10.7084 4.59985 10.8363 4.72775C10.9642 4.85565 11.036 5.02911 11.036 5.20999C11.036 5.39087 10.9642 5.56436 10.8363 5.69226C10.7084 5.82016 10.5349 5.892 10.354 5.892H1.35702V13.081C1.34261 14.2733 1.80199 15.4226 2.63429 16.2764C3.46658 17.1303 4.60375 17.6189 5.79603 17.635H10.024C10.2049 17.635 10.3784 17.7068 10.5063 17.8347C10.6342 17.9626 10.706 18.1361 10.706 18.317C10.706 18.4979 10.6342 18.6714 10.5063 18.7993C10.3784 18.9272 10.2049 18.999 10.024 18.999H5.79202C4.24318 18.9771 2.76621 18.342 1.68495 17.2328C0.603694 16.1236 0.00639571 14.6309 0.0240231 13.082V5.91901C0.00586221 4.36976 0.602924 2.87656 1.68424 1.76694C2.76555 0.657317 4.24283 0.0218721 5.79202 0H14.192C15.7413 0.0218727 17.2187 0.657285 18.3002 1.76688C19.3816 2.87647 19.9789 4.36967 19.961 5.91901V13.081C19.9789 14.629 19.3827 16.121 18.303 17.2303C17.2232 18.3397 15.7479 18.976 14.2 19C14.1113 18.9992 14.0237 18.981 13.9421 18.9462C13.8605 18.9115 13.7865 18.861 13.7245 18.7976C13.6624 18.7343 13.6135 18.6593 13.5804 18.577C13.5474 18.4947 13.531 18.4067 13.532 18.318ZM15.506 9.98901C15.3251 9.98901 15.1517 9.91715 15.0238 9.78925C14.8959 9.66135 14.824 9.48788 14.824 9.30701C14.824 9.12613 14.8959 8.95267 15.0238 8.82477C15.1517 8.69687 15.3251 8.625 15.506 8.625H15.806C15.9869 8.625 16.1604 8.69687 16.2883 8.82477C16.4162 8.95267 16.488 9.12613 16.488 9.30701C16.488 9.48788 16.4162 9.66135 16.2883 9.78925C16.1604 9.91715 15.9869 9.98901 15.806 9.98901H15.506Z"
          fill="#7A86A1"
        />
      </svg>
    ),
  },
];
const secNav = [
  {
    link: "/inbox",
    title: "Inbox",
    icon: (
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.807 18C4.26339 17.9921 2.78594 17.3723 1.69865 16.2766C0.611369 15.1808 0.00301159 13.6987 0.00700361 12.155V5.84497C0.00397741 5.08033 0.151607 4.32263 0.441459 3.61505C0.731312 2.90747 1.15771 2.2639 1.6963 1.72113C2.2349 1.17836 2.87514 0.746973 3.58046 0.45166C4.28578 0.156347 5.04236 0.00288344 5.807 0H14.2C15.7428 0.0105667 17.2187 0.631169 18.3054 1.72632C19.3922 2.82147 20.0014 4.30215 20 5.84497V7.30701C20.0008 7.49514 19.9269 7.67589 19.7945 7.80957C19.6622 7.94326 19.4821 8.01896 19.294 8.02002L19.284 8C19.191 8.00014 19.0988 7.98175 19.013 7.94586C18.9271 7.90998 18.8493 7.85734 18.784 7.79102C18.6523 7.65785 18.5779 7.47834 18.577 7.29102V5.84497C18.5701 4.68389 18.1083 3.57185 17.2907 2.74738C16.4732 1.9229 15.365 1.45172 14.204 1.435H5.807C4.6461 1.45198 3.53809 1.9232 2.72058 2.74762C1.90308 3.57204 1.4412 4.68397 1.434 5.84497V12.154C1.44094 13.3152 1.90271 14.4274 2.72024 15.252C3.53777 16.0766 4.64593 16.548 5.807 16.565H14.2C15.3615 16.5488 16.4703 16.0777 17.2883 15.253C18.1063 14.4282 18.5683 13.3156 18.575 12.154C18.5925 11.9775 18.6751 11.8138 18.8066 11.6947C18.938 11.5756 19.1091 11.5096 19.2865 11.5096C19.4639 11.5096 19.635 11.5756 19.7665 11.6947C19.8979 11.8138 19.9805 11.9775 19.998 12.154C19.9996 13.6966 19.3908 15.1773 18.3045 16.2726C17.2182 17.3679 15.7426 17.9889 14.2 18H5.807ZM8.055 9.97998L3.936 6.65601C3.79045 6.53517 3.69789 6.36221 3.67808 6.17407C3.65828 5.98593 3.7128 5.79749 3.83001 5.64899C3.94543 5.50373 4.11379 5.41023 4.29811 5.38904C4.48244 5.36785 4.66763 5.42073 4.813 5.53601L4.82 5.54199L8.973 8.85797C9.22452 9.05736 9.53605 9.16589 9.857 9.16589C10.178 9.16589 10.4895 9.05736 10.741 8.85797L14.851 5.54199H14.86C15.0077 5.42477 15.196 5.37101 15.3833 5.39258C15.5707 5.41414 15.7418 5.50926 15.859 5.65698C15.9762 5.80471 16.03 5.99295 16.0084 6.1803C15.9868 6.36765 15.8917 6.53878 15.744 6.65601L11.634 9.97998C11.1282 10.3911 10.4963 10.6156 9.84451 10.6156C9.1927 10.6156 8.56078 10.3911 8.055 9.97998Z"
          fill="#7A86A1"
        />
      </svg>
    ),
    badge: 12,
  },
];

const Sidebar = () => {
  const { verifyAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/v2/logout");
      localStorage.removeItem("allowPrivate");
      localStorage.removeItem("token");
      verifyAuth();
      navigate("/signin");
      toast.success("Logout successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong...");
    }
  };
  return (
    <SidebarStyles>
      <div className="logo">
        <Link to="/dashboard">
          <img src="/Logo_p.svg" alt="" />
        </Link>
      </div>

      <div className="side-nav-main">
        <ul>
          {firstNav.map((item, index) => (
            <SideNavLink
              key={index}
              link={item.link}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </ul>

        <ul>
          {secNav.map((item, index) => (
            <SideNavLink
              key={index}
              badge={item?.badge}
              link={item.link}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <div className="teamdb-cta">
          <Link to="/team">
            <div className="teamdb-cta-inner">
              <p>Scolage Team Team Database</p>
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.32398 11.7929C9.20794 11.6813 9.13761 11.5304 9.1267 11.3698C9.1158 11.2091 9.16509 11.0502 9.26498 10.9239L9.32398 10.8559L13.653 6.66892H1.67997C1.50758 6.67556 1.33942 6.61453 1.2114 6.49888C1.08339 6.38322 1.00567 6.22208 0.994836 6.0499C0.984001 5.87772 1.04091 5.70816 1.15342 5.57737C1.26593 5.44658 1.42511 5.36491 1.59698 5.34989H1.67997H15.3C15.4334 5.34897 15.5641 5.38729 15.6759 5.46C15.7877 5.53271 15.8757 5.63661 15.929 5.75889C15.9738 5.86537 15.9892 5.98193 15.9737 6.09641C15.9583 6.21089 15.9124 6.31911 15.841 6.40989L15.78 6.47593L10.285 11.7959C10.1564 11.9176 9.98656 11.9861 9.80955 11.9876C9.63254 11.9891 9.46153 11.9235 9.33097 11.8039L9.32198 11.7959L9.32398 11.7929ZM12.424 4.14994L12.357 4.09293L9.32198 1.1569C9.25895 1.09633 9.2088 1.02369 9.17454 0.943273C9.14028 0.862852 9.12261 0.776353 9.12261 0.688939C9.12261 0.601526 9.14028 0.514966 9.17454 0.434545C9.2088 0.354124 9.25895 0.281484 9.32198 0.220922C9.44041 0.10756 9.59486 0.0393814 9.75842 0.0282338C9.92198 0.0170862 10.0843 0.0636415 10.217 0.159887L10.288 0.219884L13.318 3.15293C13.3809 3.21365 13.431 3.28642 13.4652 3.36692C13.4993 3.44741 13.517 3.53398 13.517 3.62143C13.517 3.70889 13.4993 3.7954 13.4652 3.87589C13.431 3.95638 13.3809 4.02922 13.318 4.08994C13.1997 4.20279 13.0456 4.27063 12.8825 4.28177C12.7194 4.29292 12.5575 4.24663 12.425 4.15091L12.424 4.14994Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="pb-2 flex items-center justify-between">
          <div className="profile active relative w-[45px] aspect-square rounded-[18px]">
            <img
              src={"/profile.png"}
              alt=""
              className="h-full w-full object-cover rounded-[18px]"
            />
          </div>

          <div className="flex items-center gap-[10px]">
            <button className="w-[40px] aspect-square rounded-full flex items-center justify-center">
              <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.473 15.058C13.4901 14.0768 13.8957 13.1425 14.6007 12.4599C15.3058 11.7774 16.2528 11.4023 17.234 11.417C17.5165 11.4167 17.7981 11.4472 18.074 11.508C18.1847 11.5301 18.2899 11.5739 18.3836 11.6369C18.4772 11.6999 18.5574 11.7808 18.6196 11.875C18.6817 11.9692 18.7245 12.0749 18.7455 12.1857C18.7665 12.2966 18.7653 12.4106 18.742 12.521V12.528C18.6847 12.752 18.5421 12.9447 18.3445 13.0649C18.147 13.1851 17.9103 13.2232 17.685 13.171C17.1645 13.059 16.6209 13.1564 16.1717 13.4422C15.7226 13.7279 15.404 14.1791 15.285 14.698C15.2594 14.8157 15.2446 14.9356 15.241 15.056C15.241 15.5865 15.4517 16.0952 15.8268 16.4702C16.2019 16.8453 16.7106 17.056 17.241 17.056C17.7714 17.056 18.2801 16.8453 18.6552 16.4702C19.0303 16.0952 19.241 15.5865 19.241 15.056C19.2412 14.9481 19.2322 14.8404 19.214 14.734C19.1967 14.6221 19.2017 14.5078 19.2288 14.3978C19.2559 14.2879 19.3045 14.1843 19.3718 14.0932C19.4391 14.0021 19.5238 13.9252 19.621 13.867C19.7182 13.8087 19.8259 13.7704 19.938 13.754C20.1652 13.7145 20.3988 13.7657 20.5886 13.8966C20.7784 14.0275 20.9093 14.2276 20.953 14.454C20.9871 14.6522 21.0042 14.8529 21.004 15.054C20.9879 16.041 20.5845 16.9821 19.8809 17.6744C19.1772 18.3667 18.2296 18.7547 17.2425 18.7547C16.2554 18.7547 15.3078 18.3667 14.6041 17.6744C13.9005 16.9821 13.4971 16.041 13.481 15.054L13.473 15.058ZM1.881 15.911C1.6545 15.911 1.43729 15.8211 1.27713 15.6609C1.11697 15.5007 1.02699 15.2835 1.02699 15.057C1.02699 14.8305 1.11697 14.6133 1.27713 14.4531C1.43729 14.293 1.6545 14.203 1.881 14.203H9.116C9.34249 14.203 9.55971 14.293 9.71986 14.4531C9.88002 14.6133 9.97 14.8305 9.97 15.057C9.97 15.2835 9.88002 15.5007 9.71986 15.6609C9.55971 15.8211 9.34249 15.911 9.116 15.911H1.881ZM0.998993 3.71102C0.999055 3.50989 1.01645 3.30917 1.05099 3.11104C1.0945 2.88452 1.22531 2.68419 1.41519 2.55324C1.60507 2.42229 1.8388 2.3712 2.06599 2.41103C2.17817 2.42727 2.28602 2.4656 2.3833 2.52376C2.48059 2.58192 2.56539 2.65877 2.6328 2.7499C2.70021 2.84102 2.74889 2.9446 2.77605 3.05464C2.8032 3.16469 2.80829 3.27899 2.791 3.39101C2.71031 3.79498 2.75602 4.214 2.92191 4.59108C3.08779 4.96816 3.3658 5.28501 3.71812 5.49849C4.07045 5.71198 4.47997 5.81176 4.89101 5.78426C5.30204 5.75676 5.69464 5.60332 6.01538 5.34481C6.33612 5.08629 6.56945 4.73525 6.68362 4.33943C6.7978 3.94362 6.78727 3.52221 6.65349 3.13259C6.5197 2.74296 6.26914 2.40401 5.9359 2.16182C5.60265 1.91963 5.2029 1.78596 4.791 1.77901C4.63129 1.77665 4.47186 1.79311 4.31599 1.82802C4.0909 1.88256 3.85339 1.8462 3.65495 1.72676C3.45652 1.60733 3.31317 1.41445 3.256 1.19002C3.23148 1.08 3.22905 0.966214 3.24883 0.855242C3.2686 0.744271 3.3102 0.638314 3.37122 0.543536C3.43223 0.448757 3.51145 0.367002 3.60428 0.303057C3.69711 0.239112 3.8017 0.194271 3.912 0.171038C4.87738 -0.0532316 5.89224 0.111936 6.73663 0.630816C7.58103 1.1497 8.18693 1.98046 8.423 2.94301C8.4822 3.19587 8.51405 3.45435 8.51801 3.71401C8.48249 4.68789 8.07065 5.61003 7.36911 6.28646C6.66757 6.96288 5.73103 7.34084 4.7565 7.34084C3.78197 7.34084 2.84543 6.96288 2.14389 6.28646C1.44235 5.61003 1.03051 4.68789 0.994995 3.71401L0.998993 3.71102ZM12.881 4.56502C12.6545 4.56502 12.4373 4.47505 12.2771 4.3149C12.117 4.15474 12.027 3.93751 12.027 3.71102C12.027 3.48452 12.117 3.26729 12.2771 3.10713C12.4373 2.94698 12.6545 2.85701 12.881 2.85701H20.114C20.3405 2.85701 20.5577 2.94698 20.7179 3.10713C20.878 3.26729 20.968 3.48452 20.968 3.71102C20.968 3.93751 20.878 4.15474 20.7179 4.3149C20.5577 4.47505 20.3405 4.56502 20.114 4.56502H12.881Z"
                  fill="#7A86A1"
                />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="w-[40px] aspect-square rounded-full flex items-center justify-center"
            >
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.30899 18.971C4.17793 18.9833 3.08813 18.5466 2.27852 17.7566C1.46891 16.9667 1.00554 15.888 0.98999 14.757C0.991165 14.6601 1.01141 14.5643 1.04959 14.4753C1.08777 14.3862 1.14313 14.3055 1.21249 14.2378C1.28186 14.1701 1.36388 14.1167 1.45387 14.0807C1.54387 14.0447 1.64007 14.0268 1.73698 14.028C1.8339 14.0267 1.93013 14.0444 2.02017 14.0803C2.11022 14.1162 2.19232 14.1694 2.26178 14.237C2.33124 14.3046 2.3867 14.3852 2.425 14.4743C2.4633 14.5633 2.48368 14.659 2.48499 14.756C2.495 15.4953 2.7978 16.2006 3.327 16.717C3.85619 17.2335 4.56859 17.519 5.30798 17.511H10.042C10.7792 17.5198 11.4899 17.2357 12.0178 16.721C12.5458 16.2064 12.848 15.5032 12.858 14.766V13.874C12.858 13.6751 12.937 13.4843 13.0777 13.3437C13.2183 13.203 13.4091 13.124 13.608 13.124C13.8069 13.124 13.9977 13.203 14.1383 13.3437C14.279 13.4843 14.358 13.6751 14.358 13.874V14.766C14.3417 15.8942 13.8785 16.97 13.0702 17.7574C12.2619 18.5447 11.1743 18.9793 10.046 18.966L5.30899 18.971ZM16.821 12.771C16.7532 12.7056 16.699 12.6275 16.6614 12.5411C16.6238 12.4548 16.6036 12.3618 16.6019 12.2677C16.6003 12.1735 16.6172 12.08 16.6517 11.9923C16.6862 11.9047 16.7376 11.8247 16.803 11.757L16.821 11.739L18.377 10.229H8.51999C8.32638 10.229 8.1407 10.1521 8.0038 10.0152C7.8669 9.87827 7.78998 9.6926 7.78998 9.49899C7.78998 9.30539 7.8669 9.11966 8.0038 8.98276C8.1407 8.84586 8.32638 8.76895 8.51999 8.76895H20.19C20.3368 8.76816 20.4806 8.81059 20.6035 8.89096C20.7264 8.97134 20.8229 9.08613 20.881 9.22098C20.938 9.35522 20.9529 9.50363 20.9236 9.64652C20.8943 9.7894 20.8222 9.91999 20.717 10.021L17.878 12.778C17.7361 12.9149 17.5467 12.9914 17.3495 12.9914C17.1523 12.9914 16.9628 12.9149 16.821 12.778V12.771ZM0.98999 11.442V4.22696C1.00659 3.09894 1.46964 2.02349 2.27769 1.23624C3.08575 0.448988 4.17291 0.0141235 5.30098 0.0269482H10.035C11.1664 0.014131 12.2567 0.450585 13.0667 1.24057C13.8768 2.03056 14.3404 3.10962 14.356 4.241V5.12399C14.356 5.32291 14.277 5.51368 14.1363 5.65433C13.9957 5.79498 13.8049 5.87399 13.606 5.87399C13.4071 5.87399 13.2163 5.79498 13.0757 5.65433C12.935 5.51368 12.856 5.32291 12.856 5.12399V4.241C12.846 3.50145 12.543 2.79605 12.0136 2.27957C11.4842 1.7631 10.7715 1.47772 10.032 1.48599H5.29999C4.5629 1.47745 3.85254 1.76165 3.32478 2.27628C2.79703 2.79091 2.495 3.49392 2.48499 4.23099V11.446C2.48499 11.6449 2.40597 11.8356 2.26532 11.9763C2.12467 12.1169 1.9339 12.196 1.73499 12.196C1.53607 12.196 1.3453 12.1169 1.20465 11.9763C1.064 11.8356 0.984985 11.6449 0.984985 11.446L0.98999 11.442ZM17.54 7.95096L16.824 7.26096C16.7562 7.19572 16.7019 7.11776 16.6642 7.03153C16.6266 6.94529 16.6063 6.85247 16.6045 6.75839C16.6027 6.66431 16.6195 6.57083 16.6539 6.48325C16.6883 6.39566 16.7397 6.31569 16.805 6.24796L16.824 6.22897C16.9655 6.09135 17.1551 6.01431 17.3525 6.01431C17.5499 6.01431 17.7395 6.09135 17.881 6.22897L18.596 6.918C18.6641 6.98306 18.7187 7.06089 18.7567 7.14707C18.7948 7.23324 18.8154 7.32603 18.8176 7.4202C18.8197 7.51436 18.8033 7.60802 18.7692 7.69583C18.7351 7.78364 18.6841 7.8639 18.619 7.93198L18.601 7.94998C18.4598 8.08758 18.2707 8.16499 18.0735 8.16593C17.8763 8.16686 17.6865 8.09125 17.544 7.95499L17.54 7.95096Z"
                  fill="#7A86A1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </SidebarStyles>
  );
};

export default Sidebar;
