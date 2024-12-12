"use client";
import React, { useState } from "react";
import { Spin } from "antd";
import { Upgrade } from "@/app/pages/account/billing/enterprise";
import { MiscHelp } from "@/app/partials/misc";
import Account from "./Account";
import { PurchaseData } from "@/types/general";
import LeafletMap from "../../components/LeafletMap";
import { LoadingOutlined } from "@ant-design/icons";
import FileUploadsStatus from "./FileUploadsStatus";
import { downPaymentSources, formatCurrency, propertyTypes } from "@/app/utils";
import ListDetails from "./ListDetails";
import Uploads from "../../components/Uploads";
import SingleFileViewer from "./SingleFileView";
import { Documents } from "@/types/db";
import UploadedDocuments from "./UploadedDocuments";

type Props = {
  data: PurchaseData;
};

function getFileExt(filename: string): string {
  const ext = filename.split(".").pop();
  if (!ext) return "pdf";
  const image_types = ["jpg", "png", "jpeg", "gif", "bmp"];
  const excel_types = ["xlsx", "xls"];
  const word_types = ["docx", "doc"];
  if (image_types.includes(ext)) return "image";
  if (excel_types.includes(ext)) return "excel";
  if (word_types.includes(ext)) return "word";

  return ext || "pdf";
}

const FullPageContent = ({ data }: Props) => {
  const [coordinates, setCoordinates] = useState<
    Record<"lat" | "lon", number> | null | undefined
  >(null);
  const [selectedDocument, setSelectedDocument] = useState<Documents | null>(
    null
  );

  function renderLeadsInformation() {
    return (
      <ListDetails
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
      <ListDetails
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

  function renderOtherInformation() {
    return (
      <ListDetails
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
      <div className="w-full col-span-2 relative">
        <LeafletMap
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          location={data?.location}
          opacity={0.8}
          height="!h-48"
          zoom={25}
        />
        {!coordinates && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          </div>
        )}
      </div>

      <div className="col-span-2">
        <Upgrade />
      </div>
      <div className="col-span-2">
        <FileUploadsStatus documents={data.documents} username={data.name} />
      </div>

      <div className="col-span-2 lg:col-span-1 flex">
        <Account
          email="ifeanyidike@gmail.com"
          is_email_verified={!!data?.is_email_verified}
          is_phone_verified={!!data?.is_phone_verified}
          phone={data?.phone}
          picture={data?.picture}
          location={data?.location}
          dob={data?.dob}
          postal_code={data?.postal_code}
        />
      </div>

      <div className="col-span-2 lg:col-span-1 flex">
        {renderLeadsInformation()}
      </div>

      <div className="col-span-2 lg:col-span-1 flex">
        {renderFinancialInformation()}
      </div>

      <div className="col-span-2 lg:col-span-1 flex">
        {renderOtherInformation()}
      </div>

      <div className="col-span-2">
        {/* <UploadedDocuments documents={data.documents} /> */}
        <Uploads
          title="User Documents"
          username={data.name!}
          items={
            data.documents?.map((d) => ({
              id: d.id,
              src: d.url,
              image: `${getFileExt(d.url)}.svg`,
              desc: d.name,
              date: `${d.size}MB ${new Date(
                d.created_at as unknown as Date
              ).toDateString()}`,
            })) || []
          }
          documents={data.documents}
          setSelectedDocument={setSelectedDocument}
        />
      </div>

      <div className="col-span-2">
        <MiscHelp />
      </div>
      {selectedDocument && (
        <SingleFileViewer
          selectedDocument={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default FullPageContent;
