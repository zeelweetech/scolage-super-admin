import styled from "styled-components";

const Wrapper = styled.div`
   display: flex;
   gap: 20px;

   .clg-details-left {
      flex: 2;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 36px;

      .clg-location {
         grid-column: 1 / 3;
         display: flex;
         .label {
            width: 134px;
            p {
               font-weight: 700;
               font-size: 18px;
               line-height: 27px;
               color: #000000;
               text-transform: capitalize;
            }
         }
         .location-map-main {
            padding-left: 30px;
            width: calc(100% - 134px);

            .location-map-in {
               max-width: 428px;
               border: 1px solid #707070;
               border-radius: 20px;
               overflow: hidden;
               height: 104px;
            }
         }
      }
   }
   .clg-details-right {
      flex: 1;
      .timing-block {
         display: flex;

         .label {
            /* width: 134px; */
            p {
               font-weight: 700;
               font-size: 18px;
               line-height: 27px;
               color: #000000;
               text-transform: capitalize;
            }
         }

         .info {
            padding-left: 30px;
            /* width: calc(100% - 134px); */
            p {
               font-weight: 400;
               font-size: 15px;
               line-height: 20px;
               color: #7a86a1;
               padding-bottom: 10px;

               &:last-child {
                  padding: 0px;
               }
            }
         }
      }

      .more-info {
         padding-top: 50px;

         h4 {
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            color: #60269e;
            padding-bottom: 18px;
         }

         p {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #7a86a1;
         }
      }
   }

   @media (min-width: 768px) and (max-width: 1280px) {
      flex-direction: column;

      .clg-details-left {
         flex: 1;
         width: 100%;
         grid-template-columns: repeat(1, 1fr);
         gap: 20px;

         .clg-location {
            grid-column: 1 / 2;
         }
      }
   }
   @media (min-width: 1025px) and (max-width: 1280px) {
      .clg-details-left {
         grid-template-columns: repeat(2, 1fr);
         .clg-location {
            grid-column: 1 / 3;
         }
      }
   }

   @media (min-width: 1281px) and (max-width: 1440px) {
      flex-direction: column;
   }
`;

const InfoItemStyle = styled.div`
   display: flex;
   align-items: center;

   .label {
      width: 134px;
      p {
         font-weight: 700;
         font-size: 18px;
         line-height: 27px;
         color: #000000;
         text-transform: capitalize;
      }
   }

   .info {
      padding-left: 30px;
      width: calc(100% - 134px);
      p {
         font-weight: 400;
         text-transform: capitalize;
         font-size: 15px;
         line-height: 20px;
         color: #7a86a1;
      }
   }
`;

const InfoItem = ({ title, info }) => {
   return (
      <InfoItemStyle>
         <div className="label">
            <p>{title}</p>
         </div>
         <div className="info">
            <p>{info}</p>
         </div>
      </InfoItemStyle>
   );
};

const ClgDetailsBlock = ({ data }) => {
   const city = data?.address.split(", ")[1];
   const area = data?.address.split(", ")[2];
   return (
      <Wrapper>
         <div className="clg-details-left">
            <InfoItem title={"college name"} info={data?.collegename} />
            <InfoItem title={"Academic Type"} info={data?.academic_type} />
            <InfoItem title={"Email"} info={data?.email} />
            <InfoItem title={"Affiliated"} info={data?.affiliated} />
            <InfoItem title={"Phone"} info={data?.phone[0]?.phone} />
            <InfoItem title={"Class Rooms"} info={data?.class_rooms} />
            <InfoItem title={"Address"} info={data?.address} />
            <InfoItem title={"Total Seats"} info={data?.total_seats} />
            <InfoItem title={"City"} info={city} />
            <InfoItem title={"Class Type"} info={data?.class_type} />
            <InfoItem title={"Area"} info={area} />
            <InfoItem title={"College Code"} info={data?.college_code} />
            <InfoItem title={"College Type"} info={data?.college_type} />
            <InfoItem title={"College Area"} info={`${data?.college_area} sft`} />
            <InfoItem title={"System Type"} info={data?.system_type} />
            <InfoItem title={"No. of Floors"} info={data?.no_of_floors} />

            <div className="clg-location">
               <div className="label">
                  <p>Location</p>
               </div>
               <div className="location-map-main">
                  <div className="location-link">
                     <a href={data?.location} target="_blank" className="underline underline-offset-2">
                        Click here to open Map
                     </a>
                  </div>
               </div>
               {/* <div className="location-map-main">
                  <div className="location-map-in">
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.1654212487304!2d78.50663079248724!3d17.44387211831329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a3a7d6c32f3%3A0x3914ae52024acff4!2sMarredpally%2C%20Teachers%20Colony%2C%20East%20Nehru%20Nagar%2C%20Secunderabad%2C%20Telangana%20500026!5e0!3m2!1sen!2sin!4v1686722486313!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                     />
                  </div>
               </div>*/}
            </div>
         </div>
         <div className="clg-details-right">
            <div className="timing-block">
               <div className="label">
                  <p>Timings</p>
               </div>
               <div className="info">
                  <p>open | {data?.timings[0]?.open}</p>
                  <p>close | {data?.timings[0]?.close}</p>
                  <p>{data?.timings[0]?.Mon_to_Sat}</p>
               </div>
            </div>

            <div className="more-info">
               <h4>More Info...</h4>
               <p>{ data?.more_info }</p>
            </div>
         </div>
      </Wrapper>
   );
};

export default ClgDetailsBlock;
