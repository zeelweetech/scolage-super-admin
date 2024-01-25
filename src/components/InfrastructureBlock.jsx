import styled from "styled-components";
import SmartClassIcon from "../Icons/SmartClassIcon";
import LibraryIcon from "../Icons/LibraryIcon";
import HostelIcon from "../Icons/HostelIcon";
import MedicalIcon from "../Icons/MedicalIcon";
import StaffroomIcon from "../Icons/StaffroomIcon";
import ElevatorIcon from "../Icons/ElevatorIcon";
import BusIcon from "../Icons/BusIcon";
import FiresafetyIcon from "../Icons/FiresafetyIcon";
import AuditoriumIcon from "../Icons/AuditoriumIcon";
import PowerbackupIcon from "../Icons/PowerbackupIcon";
import ParkingIcon from "../Icons/ParkingIcon";
import EmExitIcon from "../Icons/EmExitIcon";
import LabIcon from "../Icons/LabIcon";
import CanteenIcon from "../Icons/CanteenIcon";
import CCTVIcon from "../Icons/CCTVIcon";
import PlaygroundIcon from "../Icons/PlaygroundIcon";

const Wrapper = styled.div`
   .infra-items-main {
      ul {
         display: grid;
         grid-template-columns: repeat(4, 1fr);
         gap: 46px;
      }
   }

   .more-info {
      padding-top: 70px;
      .title {
         padding-bottom: 40px;
         h4 {
            font-weight: 700;
            font-size: 20px;
            line-height: 27px;
            color: #60269e;
         }
      }

      .info {
         p {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #7a86a1;
            padding-bottom: 70px;

            &:last-child {
               padding: 0px;
            }
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1024px) {
      .infra-items-main {
         ul {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
         }
      }

      .more-info {
         padding-top: 50px;

         .info {
            p {
               padding-bottom: 50px;
            }
         }
      }
   }

   @media (min-width: 1025px) and (max-width: 1280px) {
      .infra-items-main {
         ul {
            grid-template-columns: repeat(3, 1fr);
         }
      }
      .more-info {
         padding-top: 50px;

         .info {
            p {
               padding-bottom: 50px;
            }
         }
      }
   }
`;

const InfraItemStyle = styled.li`
   display: flex;
   align-items: center;
   gap: 28px;

   .infra-title {
      p {
         font-weight: 400;
         font-size: 20px;
         line-height: 27px;
         color: #000000;
      }
   }
`;

const InfraItem = ({ icon, title }) => {
   return (
      <InfraItemStyle>
         <div className="icon">{icon}</div>
         <div className="infra-title">{title}</div>
      </InfraItemStyle>
   );
};

const InfrastructureBlock = ({ data }) => {

   const tempArray = [];
   for (var key in data?.[0]) {
      if (data?.[0][key] === true) {
         tempArray.push(key)
      }
   }
   const Infra = [
      {
         key: "smartclass",
         icon: <SmartClassIcon />,
         title: "Smart Class",
      },
      {
         key: "library",
         icon: <LibraryIcon />,
         title: "Library",
      },
      {
         key: "hostel",
         icon: <HostelIcon />,
         title: "Hostel",
      },
      {
         key: "medicalsupport",
         icon: <MedicalIcon />,
         title: "Medical Support",
      },
      {
         key: "staffroom",
         icon: <StaffroomIcon />,
         title: "Staff Room",
      },
      {
         key: "elevator",
         icon: <ElevatorIcon />,
         title: "Elevator",
      },
      {
         key: "bustransport",
         icon: <BusIcon />,
         title: "Bus Transport",
      },
      {
         key: "firesafety",
         icon: <FiresafetyIcon />,
         title: "Fire Safety",
      },
      {
         key: "auditorium",
         icon: <AuditoriumIcon />,
         title: "Auditorium",
      },
      {
         key: "powerbackup",
         icon: <PowerbackupIcon />,
         title: "Power Backup",
      },
      {
         key: "parking",
         icon: <ParkingIcon />,
         title: "Parking",
      },
      {
         key: "emergencyexit",
         icon: <EmExitIcon />,
         title: "Emergency Exit",
      },
      {
         key: "computerlab",
         icon: <LabIcon />,
         title: "Computer lab",
      },
      {
         key: "canteen",
         icon: <CanteenIcon />,
         title: "Canteen",
      },
      {
         key: "cctv",
         icon: <CCTVIcon />,
         title: "CCTV",
      },
      {
         key: "playground",
         icon: <PlaygroundIcon />,
         title: "Play Ground",
      },
   ];

   const finalArray = [];

   tempArray.map(value => {
      const selected = Infra.filter(infra => infra.key === value)
      finalArray.push(selected[0]);
   })

   return (
      <Wrapper>
         <div className="infra-items-main">
            <ul>
               {finalArray.map((item, index) => (
                  <InfraItem key={index} title={item.title} icon={item.icon} />
               ))}
            </ul>
         </div>

         <div className="more-info">
            <div className="title">
               <h4>More Info...</h4>
            </div>
            <div className="info">
               <p>{data?.[0]?.moreinfo}</p>
            </div>
         </div>
      </Wrapper>
   );
};

export default InfrastructureBlock;
