import { KeenIcon } from "@/app/dashboard-components";
import { CommonRating } from "@/app/partials/common";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  job_title: string;
  picture: string;
  property_type: string;
  lead_type: string;
  email: string;
  phone: string;
  location: Record<"address" | "city" | "province", string>;
  property_price: number;
  openModal: () => void;
}

const Card = ({
  id,
  name,
  job_title,
  picture,
  property_type,
  lead_type,
  email,
  phone,
  location,
  property_price,
  openModal,
}: Props) => {
  const labels = [];
  if (property_type) labels.push(property_type);
  if (lead_type) labels.push(lead_type);

  const renderItem = (label: string, index: number) => {
    return (
      <span key={index} className="badge badge-sm badge-outline">
        {label}
      </span>
    );
  };

  return (
    <div className="card shadow-md !border-gray-300 py-3">
      <div className="card-body grid gap-7 py-4">
        <div className="grid place-items-center gap-4">
          <div className="flex justify-center items-center size-14 rounded-full ring-1 ring-gray-300 bg-gray-100">
            <img src={picture} alt="" />
            {/* <KeenIcon icon={icon} className="text-2xl text-gray-600" /> */}
          </div>

          <div className="grid place-items-center">
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-primary-active mb-px"
            >
              {name}
            </a>
            <p className="text-2sm text-gray-700 text-center">
              {job_title} {job_title && " | "}{" "}
              <small className="text-2xs">{email}</small>
            </p>
          </div>
        </div>

        <div className="grid">
          <div className="flex items-center justify-between flex-wrap mb-2 gap-2">
            <span className="text-2xs text-gray-600 uppercase">Labels</span>
            <div className="flex flex-wrap gap-1.5">
              {labels.map((label, index) => {
                return renderItem(label, index);
              })}
            </div>
          </div>

          <div className="border-t border-gray-300 border-dashed my-1.5"></div>

          <div className="flex items-center justify-between flex-wrap mt-2.5 mb-3 gap-2">
            <span className="text-2xs text-gray-600 uppercase">Phone No.</span>
            <a className="text-2xs text-gray-800" href={`tel:${phone}`}>
              {phone}
            </a>
          </div>

          <div className="border-t border-gray-300 border-dashed mb-2"></div>

          <div className="flex items-center justify-between flex-wrap my-2.5 gap-2">
            <span className="text-2xs text-gray-600 uppercase">Location</span>
            <span className="text-2xs text-gray-800">
              {location.city} {location.province}
            </span>
          </div>

          <div className="border-t border-gray-300 border-dashed my-2"></div>

          <div className="flex items-center justify-between flex-wrap mt-2.5 gap-2">
            <span className="text-2xs text-gray-600 uppercase">
              Property price
            </span>
            <span className="text-2xs text-gray-800">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
              }).format(property_price)}
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer justify-center flex gap-4">
        <button className="btn btn-sm btn-primary" onClick={openModal}>
          <KeenIcon icon="people" className="" /> View in modal
        </button>
        <Link
          href={`/dashboard/broker/leads/purchased/${id}`}
          className="btn btn-light btn-sm"
        >
          <KeenIcon icon="check-circle" className="" /> View in full page
        </Link>
        {/* {connected ? (
          <a className="btn btn-light btn-sm">
            <KeenIcon icon="check-circle" className="" /> Joined
          </a>
        ) : (
          <a className="btn btn-sm btn-primary">
            <KeenIcon icon="people" className="" /> Join
          </a>
        )} */}
      </div>
    </div>
  );
};

export { Card };
