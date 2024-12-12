import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@/app/dashboard-components/modal"; // Import your custom Modal component
import { KeenIcon } from "@/app/dashboard-components";
import {
  cn,
  downPaymentSources,
  fetchCoordinates,
  formatCurrency,
  propertyTypes,
  toAbsoluteUrl,
} from "@/app/utils";
import { NavbarDropdown } from "@/app/partials/navbar";
import L from "leaflet";

import { CommunityBadges } from "@/app/pages/public-profile/profiles/default";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PurchaseData } from "@/types/general";
import ListItemView from "./modal/ListItemView";
import Uploads from "./Uploads";
import LeafletMap from "./LeafletMap";

interface IModalProfileProps {
  data: PurchaseData | null;
  onClose: () => void;
}

const ModalView = ({ data, onClose }: IModalProfileProps) => {
  const [coordinates, setCoordinates] = useState<
    Record<"lat" | "lon", number> | null | undefined
  >(null);

  function renderAboutSection() {
    return (
      <ListItemView
        title="About"
        tables={[
          {
            status: "Date of birth",
            info: data?.dob ? new Date(data.dob).toDateString() : "",
          },
          {
            status: "Address:",
            info: data?.location?.address || "",
          },
          { status: "City:", info: data?.location?.city || "" },
          {
            status: "Province:",
            info: data?.location?.province || "",
          },
          { status: "Postcode:", info: data?.postal_code || "" },
          { status: "Phone:", info: data?.phone || "" },
          {
            status: "Email:",
            info: `<a href="#" class="text-gray-800 hover:text-primary-active">${data?.email}</a>`,
          },
        ]}
      />
    );
  }

  function renderLeadsInformation() {
    return (
      <ListItemView
        title="Leads Information"
        tables={[
          {
            status: "Down payment amount:",
            info: formatCurrency(data?.down_payment),
          },
          {
            status: "Down payment source:",
            info: data?.down_payment_source
              ? downPaymentSources[
                  data?.down_payment_source as keyof typeof downPaymentSources
                ]
              : "",
          },
          {
            status: "Property price:",
            info: formatCurrency(data?.property_price),
          },
          {
            status: "Property type:",
            info: data?.property_type
              ? propertyTypes[data.property_type as keyof typeof propertyTypes]
              : "",
          },
          {
            status: "Property address:",
            info: data?.property_address || "",
          },

          {
            status: "Lead type:",
            info: `${data
              ?.lead_type!.slice(0, 1)
              .toUpperCase()}${data?.lead_type!.slice(1)}`,
          },
        ]}
      />
    );
  }

  function renderFinancialInformation() {
    return (
      <ListItemView
        title="Financial Information"
        tables={[
          {
            status: "Social insurance number:",
            info: data?.social_insurance_number || "",
          },
          {
            status: "Savings amount:",
            info: formatCurrency(data?.savings_amount),
          },
          {
            status: "Credit card balance:",
            info: formatCurrency(data?.credit_card_balance),
          },
          {
            status: "Other debt:",
            info: formatCurrency(data?.other_debt),
          },
          {
            status: "Credit score:",
            info: data?.credit_score || "",
          },
        ]}
      />
    );
  }

  function OtherInformation() {
    return (
      <ListItemView
        title="Other Information"
        tables={[
          {
            status: "Marital status:",
            info: data?.marital_status || "",
          },
          {
            status: "Number of dependents:",
            info: data?.number_of_dependents || "",
          },
          {
            status: "Residency status:",
            info: data?.residency_status || "",
          },
          {
            status: "Government ID type:",
            info: data?.government_id_type || "",
          },
          {
            status: "Government ID number:",
            info: data?.government_id_number || "",
          },
        ]}
      />
    );
  }

  if (!data) return null;

  return (
    <Fragment>
      {/* <style>
        {`
          .modal-bg {
            background-image: url('${toAbsoluteUrl(
              "/media/images/2600x1200/2.png"
            )}');
          }
          .dark .modal-bg  {
            background-image: url('${toAbsoluteUrl(
              "/media/images/2600x1200/2-dark.png"
            )}');
          }
        `}
      </style> */}
      {/* md:w-80 min-h-52 */}
      <Modal
        open={!!data}
        onClose={onClose}
        className="!flex interfont !h-screen"
      >
        <ModalContent className="container-fixed p-0 relative scrollable-y ">
          <ModalHeader
            className={cn(
              "modal-rounded-t p-0 border-0 relative min-h-[380px] flex flex-col items-stretch justify-end bg-center bg-cover bg-no-repeat mb-7 modal-bg",
              coordinates !== null &&
                !coordinates &&
                "bg-[url('/media/images/2600x1200/2.png')]"
            )}
          >
            <div className="flex flex-col justify-end border-b-0 grow px-9 bg-gradient-to-t from-light from-3% to-transparent">
              <button
                className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 me-5 mt-5 lg:mr-10 shadow-default z-10"
                onClick={onClose}
              >
                <KeenIcon icon="cross" />
              </button>

              {/* {coordinates === null ? (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 50 }} spin />
                    }
                  />
                </div>
              ) : coordinates ? (
                <div className="w-full absolute top-0 left-0">
                  <MapContainer
                    fadeAnimation={true}
                    center={[coordinates.lat, coordinates.lon]}
                    zoom={30}
                    className="rounded-xl !w-full h-80  bg-gradient-to-t from-light from-3% to-transparent !modal-bg"
                  >
                    <TileLayer
                      opacity={0.5}
                      // attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                      position={[coordinates.lat, coordinates.lon]}
                      icon={customIcon}
                    >
                      <Popup>
                        {data?.location?.address} {data?.location?.city}{" "}
                        {data?.location?.province}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : null} */}
              <div className="w-full absolute top-0 left-0">
                <LeafletMap
                  coordinates={coordinates}
                  setCoordinates={setCoordinates}
                  location={data.location}
                />
              </div>
              {!coordinates && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 50 }} spin />
                    }
                  />
                </div>
              )}

              <div className="flex flex-col gap-8">
                <div className="flex justify-center mb-5 z-10">
                  <img
                    src={data?.picture || "/media/avatars/300-1.png"}
                    className="rounded-full border-3 border-success max-h-[100px]"
                    alt=""
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-3 w-full items-center z-10">
                  <div></div>

                  <div className="flex items-center flex-col">
                    <div className="flex items-center gap-1.5 mb-2">
                      <a
                        href="#"
                        className="text-lg leading-5 font-semibold text-black hover:text-primary"
                      >
                        {data?.name}
                      </a>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        className="text-primary"
                      >
                        <path
                          d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1 lg:gap-3 text-sm">
                      {/* <div className="flex gap-1 items-center">
                      <KeenIcon
                        icon="abstract"
                        className="text-black text-base"
                      />
                      <a
                        href="https://keenthemes.com"
                        className="text-black hover:text-primary"
                        rel="noopener noreferrer"
                      >
                        Keenthemes
                      </a>
                    </div> */}
                      <div className="flex gap-1 items-center">
                        <KeenIcon icon="sms" className="text-black text-base" />
                        <a
                          href="mailto:jenny@kteam.com"
                          className="text-black hover:text-primary"
                        >
                          {data?.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button className="dropdown-toggle btn btn-sm btn-primary">
                      <KeenIcon icon="users" /> Connect
                    </button>
                    <button className="btn btn-sm btn-icon btn-light">
                      <KeenIcon icon="messages" />
                    </button>
                    <NavbarDropdown />
                  </div>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="py-0 mb-5 ps-6 pe-3 me-3">
            <CommunityBadges title="Community Badges" />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
              <div className="col-span-1">
                <div className="grid gap-5 lg:gap-7.5">
                  {/* <CommunityBadges title="Community Badges" /> */}

                  {/* <About data={data} /> */}

                  {renderAboutSection()}
                  {renderLeadsInformation()}
                  {/* <WorkExperience /> */}
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col gap-5 lg:gap-7.5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
                    {/* <Connections title="Contributors" /> */}
                    {/* <Contributions title="Assistance" /> */}
                    {renderFinancialInformation()}
                    {OtherInformation()}
                  </div>
                  <Uploads
                    title="User Documents"
                    username={data.name!}
                    items={[
                      {
                        image: "pdf.svg",
                        desc: "Project-pitch.pdf",
                        date: "4.7 MB 26 Sep 2024 3:20 PM",
                      },
                      {
                        image: "doc.svg",
                        desc: "Report-v1.docx",
                        date: "2.3 MB 1 Oct 2024 12:00 PM",
                      },
                      {
                        image: "ai.svg",
                        desc: "Framework-App.js",
                        date: "0.8 MB 17 Oct 2024 6:46 PM",
                      },
                      {
                        image: "js.svg",
                        desc: "Mobile-logo.ai",
                        date: "0.2 MB 4 Nov 2024 11:30 AM",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export { ModalView };
