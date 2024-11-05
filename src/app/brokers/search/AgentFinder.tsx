"use client";
import { checkWordsInString } from "@/app/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Pagination, Select } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";
import {
  FaBuilding,
  FaChartLine,
  FaDollarSign,
  FaFilter,
  FaHandshake,
  FaRegClock,
} from "react-icons/fa6";

const agents = [
  {
    id: 1,
    name: "Jon Fonseca",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-handsome.png",
  },
  {
    id: 2,
    name: "Mulbury Smith",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-beauty.png",
  },
  {
    id: 3,
    name: "Jon Fonseca",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-handsome.png",
  },
  {
    id: 4,
    name: "Mulbury Smith",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-beauty.png",
  },
  {
    id: 5,
    name: "Jon Fonseca",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-handsome.png",
  },
  {
    id: 6,
    name: "Mulbury Smith",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-beauty.png",
  },
  {
    id: 7,
    name: "Jon Fonseca",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-handsome.png",
  },
  {
    id: 8,
    name: "Mulbury Smith",
    agency: "Jon Fonseca Real Estate",
    experience: "16 years in business",
    closings: 385,
    location: "Halifax, NS",
    closingsInArea: 22,
    avgDaysOnMarket: 47,
    soldToListRatio: "98%",
    profilePic: "/assets/images/smiling-beauty.png",
  },
];

export default function AgentFinder() {
  const [selectedFilter, setSelectedFilter] = useState("Buyer");
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const itemsPerPage = isDesktop ? 4 : 3;

  //   useEffect(() => {
  //     const lenderType = params.get("lenderType");
  //     const location = params.get("location");
  //     const rating = params.get("rating");

  //     const _filteredLenders = lenders.filter((lender) => {
  //       const lenderTypeCheck = lenderType
  //         ? checkWordsInString(lender.lenderType, lenderType)
  //         : true;
  //       const locationCheck = location
  //         ? checkWordsInString(lender.location, location)
  //         : true;
  //       const totalRating = lender.reviews.reduce(
  //         (acc, curr) => acc + curr.rating,
  //         0
  //       );
  //       const averageRating = totalRating / lender.reviews.length;
  //       const ratingCheck = rating ? parseInt(rating) >= averageRating : true;
  //       return lenderTypeCheck && locationCheck && ratingCheck;
  //     });

  //     setLenderList(_filteredLenders);
  //   }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = agents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex justify-center py-10 px-4 lg:px-2">
      <motion.div
        className="w-full flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Sidebar Filters */}
        <AgentFindSidebar
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {/* Agents List */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600 text-base">
              {" "}
              {agents.length} agents found
            </p>
            <Select
              size="large"
              style={{
                fontFamily: "Montserrat, sans-serif",
              }}
              className="!placeholder-black !text-black !font-[family-name:var(--font-montserrat)]"
              allowClear
              onChange={(value) => {}}
              placeholder="Search parameters..."
              options={[
                { label: "No. of closings in this area", value: "closings" },
                { label: "Average time on market", value: "market-time" },
                { label: "Sold-to-list price ratio", value: "price-ratio" },
              ]}
            />
          </div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={agents.length}
            onChange={(page) => setCurrentPage(page)}
            className="!my-12 !mx-auto"
          />
        </main>
      </motion.div>
    </div>
  );
}

type CardProps = {
  agent: (typeof agents)[0];
};

const AgentCard = ({ agent }: CardProps) => {
  return (
    <motion.div
      key={agent.id}
      className="relative flex flex-col items-center bg-white rounded-xl shadow-lg px-8 py-10 transform transition hover:shadow-2xl hover:-translate-y-2 border border-gray-300 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: agent.id * 0.08 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent rounded-xl opacity-20 pointer-events-none"></div>

      {/* Agent Image */}
      <motion.div
        className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Image
          src={agent.profilePic}
          alt={`${agent.name}'s profile picture`}
          width={144}
          height={144}
          className="object-cover w-full h-full rounded-full"
        />
      </motion.div>

      {/* Agent Info */}
      <div className="text-center mb-6 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{agent.name}</h2>
        <p className="text-sm font-medium text-gray-500">{agent.agency}</p>
        <p className="text-xs text-gray-600 italic">
          <FaHandshake className="inline mr-1 text-blue-500" />{" "}
          {agent.experience}
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-between w-full text-left gap-8 mb-6 text-gray-700">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-blue-500" /> Location
          </p>
          <p className="text-base font-semibold text-gray-800">
            {agent.location}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 flex items-center whitespace-nowrap">
            <FaRegClock className="mr-1 text-blue-500" /> Avg. on Market
          </p>
          <p className="text-base font-semibold text-gray-800">
            {agent.avgDaysOnMarket} days
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 flex items-center">
            <FaChartLine className="mr-1 text-blue-500" /> List Ratio
          </p>
          <p className="text-base font-semibold text-gray-800">
            {agent.soldToListRatio}
          </p>
        </div>
      </div>

      {/* Closings Info */}
      <p className="text-sm text-gray-600 mb-6">
        <span className="font-semibold text-blue-600">{agent.closings}</span>{" "}
        closings in the last 12 months
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <motion.button
          className="flex items-center justify-center border border-blue-500 text-blue-500 rounded-full px-6 py-2 font-semibold hover:bg-blue-500 hover:text-white transition"
          whileHover={{ scale: 1.05 }}
        >
          View Profile
        </motion.button>
        <motion.button
          className="flex items-center justify-center bg-blue-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Connect
        </motion.button>
      </div>
    </motion.div>
  );
};

type SidebarProps = {
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
};
const AgentFindSidebar = ({
  selectedFilter,
  setSelectedFilter,
}: SidebarProps) => {
  return (
    <motion.aside
      className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg px-6 py-8 border border-gray-200 lg:sticky top-0 z-20 lg:top-4 lg:mx-6 h-fit"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center lg:text-left mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center lg:justify-start">
          <FaFilter className="mr-2 text-blue-500" /> Broker Company
        </h1>
        <p className="text-gray-600">
          Use filters to find the right agent and start connecting.
        </p>
      </div>

      {/* Filter Fields */}
      <div className="space-y-6">
        {/* Zip Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 flex items-center">
            <FaSearchLocation className="mr-2 text-blue-500" /> Zip Code
          </label>
          <input
            type="text"
            placeholder="XXXXX"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* Works With */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 flex items-center">
            <FaHandshake className="mr-2 text-blue-500" /> Works with
          </label>
          <div className="flex space-x-3">
            {["Buyer", "Seller", "Both"].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedFilter(option)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === option
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 flex items-center">
            <FaDollarSign className="mr-2 text-blue-500" /> Price Range
          </label>
          <Select
            size="large"
            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Any"
            options={[
              { label: "$100k - $200k", value: "100k-200k" },
              { label: "$200k - $300k", value: "200k-300k" },
            ]}
          />
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className=" text-sm font-medium text-gray-600 flex items-center">
            <FaBuilding className="mr-2 text-blue-500" /> Property Type
          </label>
          <Select
            size="large"
            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Any"
            options={[
              { label: "Residential", value: "residential" },
              { label: "Commercial", value: "commercial" },
            ]}
          />
        </div>
      </div>
    </motion.aside>
  );
};
