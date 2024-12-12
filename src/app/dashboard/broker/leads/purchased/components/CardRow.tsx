import { KeenIcon } from "@/app/dashboard-components";
import { CommonAvatars, CommonRating } from "@/app/partials/common";
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
const CardRow = ({
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
    <div className="card p-7.5 shadow-md !border-gray-300">
      <div className="flex flex-wrap justify-between items-center gap-7">
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center size-14 shrink-0 rounded-full ring-1 ring-gray-300 bg-gray-100">
            <img src={picture} alt="" />
            {/* <KeenIcon icon={icon} className="text-2xl text-gray-600" /> */}
          </div>
          <div className="grid grid-col gap-1">
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:text-primary-active mb-px"
            >
              {name}
            </a>
            <span className="text-2sm text-gray-700">
              {job_title} {job_title && " | "}{" "}
              <small className="text-2xs">{email}</small>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 lg:gap-12">
          <div className="grid gap-5 justify-end lg:text-end">
            <span className="text-2xs font-normal text-gray-500 uppercase">
              Labels
            </span>
            <div className="flex gap-1.5">
              {labels.map((label, index) => {
                return renderItem(label, index);
              })}
            </div>
          </div>

          {phone && (
            <div className="grid justify-end gap-6 lg:text-end">
              <div className="text-2xs text-gray-600 uppercase">Phone No.</div>
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          )}

          {location && (
            <div className="grid justify-end gap-6 lg:text-end">
              <div className="text-2xs text-gray-600 uppercase">Location</div>
              <span className="text-2xs text-gray-800">
                {location.city} {location.province}
              </span>
            </div>
          )}

          <div className="grid justify-end gap-6 lg:text-end">
            <div className="text-2xs text-gray-600 uppercase">
              Property Price
            </div>
            <span className="text-2xs text-gray-800">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
              }).format(property_price)}
            </span>
          </div>

          <div className="grid justify-end min-w-20 gap-2">
            <button className="btn btn-sm btn-primary" onClick={openModal}>
              <KeenIcon icon="people" className="" /> View in modal
            </button>
            <Link
              href={`/dashboard/broker/leads/purchased/${id}`}
              className="btn btn-light btn-sm"
            >
              <KeenIcon icon="check-circle" className="" /> View in full page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardRow };
