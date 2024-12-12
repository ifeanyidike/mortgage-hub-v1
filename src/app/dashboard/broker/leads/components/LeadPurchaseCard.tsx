import { KeenIcon } from "@/app/dashboard-components";
import { IAvatar } from "@/app/partials/cards";
import { LeadDataMore } from "@/app/store/leadStore";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import Link from "next/link";

type PurchaseProps = LeadDataMore & { avatar?: IAvatar; bgImage: string };

const LeadPurchaseCard = (props: PurchaseProps) => {
  const {
    id,
    user,
    down_payment,
    down_payment_source,
    property_type,
    property_address,
    property_price,
  } = props;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7 px-6 space-y-8 relative overflow-hidden transform transition-all duration-500 ease-out"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {/* Close Button */}
        <button className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 focus:outline-none transition-all duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content Section */}
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar Image */}
          <div className="w-40 h-40 rounded-full border-4 border-gray-200 overflow-hidden shadow-xl">
            <Image
              src={user.picture}
              alt="User Avatar"
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Property Details Section */}
          <div className="w-full text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {property_address}
            </h2>
            <p className="font-medium text-sm text-gray-600">
              {" "}
              <KeenIcon icon="home" /> {property_type}
            </p>

            {/* Property Price */}
            <div className="mt-4 text-3xl font-extrabold text-gray-900">
              {property_price}
            </div>

            <div className="bg-gray-50 py-8 px-4 border border-gray-300 rounded-xl shadow-lg mt-6 space-y-6">
              {/* Down Payment Section */}
              <div className="flex items-center justify-between text-gray-800">
                <div className="flex items-center space-x-2">
                  <FiDollarSign className="w-6 h-6 text-gray-600" />
                  <span className=" font-semibold">Down Payment</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mr-5">
                  {down_payment}
                </p>
              </div>

              {/* Down Payment Source Section */}
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center space-x-3">
                  <KeenIcon icon="abstract" />
                  {/* <FaPiggyBank className="w-6 h-6 text-gray-600" /> */}
                  <p className="text-sm font-medium flex items-center space-x-4">
                    <span>Source:</span> <span>{down_payment_source}</span>
                  </p>
                </div>
              </div>

              {/* Property Type Section */}
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center space-x-3">
                  <KeenIcon icon="home-3" />
                  {/* <FiHome className="w-6 h-6 text-gray-600" /> */}
                  <p className="text-sm font-medium flex items-center space-x-4">
                    <span>Type:</span> <span>{property_type}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 text-sm">
              <motion.button
                className="w-full py-4 text-white bg-blue-600 rounded-2xl shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/dashboard/broker/leads/${id}/purchase?type=shared`}
                  className="space-x-2  flex items-center justify-center"
                >
                  {" "}
                  {/* <FiUser className="inline-block mr-3" /> */}
                  <KeenIcon icon="handcart" />
                  <span className="font-bold">Purchase as Shared</span>
                </Link>
              </motion.button>
              <motion.button
                className="w-full py-4 text-white  bg-green-600  rounded-2xl shadow-xl hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/dashboard/broker/leads/${id}/purchase?type=exclusive`}
                  className="space-x-2  flex items-center justify-center"
                >
                  {/* <FiUser className="inline-block mr-3" /> */}
                  <KeenIcon icon="price-tag" />
                  <span className="font-bold">Purchase as Exclusive</span>
                </Link>
              </motion.button>
            </div>

            {/* Descriptions */}
            <div className="text-gray-600 text-xs mt-4 space-y-4">
              <div className="flex items-start space-x-2">
                {/* <FiUser className="w-5 h-5 text-blue-600" /> */}
                <KeenIcon icon="handcart" />
                <p className="text-left">
                  <strong>Shared Purchase:</strong> This option allows for joint
                  ownership, making it more affordable while sharing the
                  responsibility of the property.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                {/* <FiUser className="w-5 h-5 text-green-600" /> */}
                <KeenIcon icon="price-tag" />
                <p className="text-left">
                  <strong>Exclusive Purchase:</strong> Opt for full ownership of
                  the property, ensuring control and privacy without shared
                  responsibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadPurchaseCard;

export { LeadPurchaseCard };
