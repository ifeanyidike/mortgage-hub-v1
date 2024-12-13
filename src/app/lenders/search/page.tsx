"use client";
import React, { useEffect, useState } from "react";
import { lenders } from "../components/data";
import Image from "next/image";
import Header from "@/components/Header";
import { Pagination } from "antd";
import { GoStarFill } from "react-icons/go";
import { checkWordsInString, cn } from "@/app/utils/";
import { useMediaQuery } from "@/hooks/";
import { useSearchParams } from "next/navigation";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import { motion } from "framer-motion";
import { FaTh, FaList } from "react-icons/fa";
import CtaButton from "@/components/CtaButton";

const Page = () => {
  const [lenderList, setLenderList] = useState<typeof lenders>([]);
  const [isGridView, setIsGridView] = useState(true); // View toggle state
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const itemsPerPage = isDesktop ? 6 : 3;

  useEffect(() => {
    const lenderType = params.get("lenderType");
    const location = params.get("location");
    const rating = params.get("rating");

    const _filteredLenders = lenders.filter((lender) => {
      const lenderTypeCheck = lenderType
        ? checkWordsInString(lender.lenderType, lenderType)
        : true;
      const locationCheck = location
        ? checkWordsInString(lender.location, location)
        : true;
      const totalRating = lender.reviews.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      const averageRating = totalRating / lender.reviews.length;
      const ratingCheck = rating ? parseInt(rating) >= averageRating : true;
      return lenderTypeCheck && locationCheck && ratingCheck;
    });

    setLenderList(_filteredLenders);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLenders = lenderList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle between grid and table views
  const handleToggleView = () => setIsGridView((prev) => !prev);

  return (
    <>
      <Header bgColor="bg-transparent" />
      <main className="max-w-screen-xl mx-auto ">
        <div className="flex flex-col  px-8 py-4 gap-8">
          <div className="flex-col lg:flex-row flex  items-start gap-4 lg:items-center justify-between mb-4">
            {/* Sidebar for filters */}
            <aside className="sidebar bg-gray-100 p-4 rounded-lg shadow-md">
              <CtaButton
                classes="!bg-gray-800 !text-white !font-bold hover:!bg-[#266ace] !py-6 !text-base !mr-auto"
                bodyStyle="justify-start"
                text="New search"
                href="/lenders"
              />
            </aside>

            {/* Hero section */}
            <motion.section
              className="hero-section flex-1 bg-gradient-to-r from-blue-500 to-blue-300 p-4 rounded-lg shadow-lg text-white text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold">Explore Trusted Lenders</h1>
              <p className="text-sm mt-2">
                Find the right lender tailored to your needs
              </p>
            </motion.section>
          </div>

          {/* Main content area */}
          <div className="flex-1 space-y-4">
            {/* View Toggle Button */}
            <div className="hidden md:flex justify-end mb-4">
              <button
                onClick={handleToggleView}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
              >
                {isGridView ? (
                  <>
                    <FaList className="text-base" />
                    <span>Switch to Table View</span>
                  </>
                ) : (
                  <>
                    <FaTh className="text-base" />
                    <span>Switch to Grid View</span>
                  </>
                )}
              </button>
            </div>

            {/* Lender display */}
            {isGridView ? (
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {paginatedLenders.map((lender, index) => (
                  <motion.div
                    key={lender.id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Image
                      src={lender.image}
                      alt={lender.name}
                      width={150}
                      height={100}
                      className={cn(
                        "object-contain  rounded-lg shadow-md mb-4 w-full h-24",
                        (lender.name.includes("Home Trust") ||
                          lender.name === "MCAN Mortgage Corporation") &&
                          "bg-gray-500"
                      )}
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      {lender.name}
                    </h3>
                    <p className="text-gray-500 mb-2">{lender.location}</p>
                    <p className="text-gray-700 font-semibold">
                      {lender.lenderType}
                    </p>
                    <div className="flex items-center mb-2 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <GoStarFill
                          key={i}
                          color={
                            lender.reviews[0]?.rating - i > 0
                              ? "#FE621D"
                              : "#D1D5DB"
                          }
                          size={14}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
                      {lender.reviews[0]?.reviewText.length <= 150
                        ? lender.reviews[0]?.reviewText
                        : lender.reviews[0]?.reviewText.slice(0, 150) + "..."}
                    </p>
                  </motion.div>
                ))}
              </section>
            ) : (
              <div className="rounded-lg shadow-lg border border-gray-200">
                <div className="grid grid-cols-4 gap-6 border-b border-gray-300 pb-4 p-4">
                  <h5 className="font-bold text-lg">Lender</h5>
                  <h5 className="font-bold text-lg">Location</h5>
                  <h5 className="font-bold text-lg">Lender Type</h5>
                  <h5 className="font-bold text-lg">Reviews</h5>
                </div>
                {paginatedLenders.map((lender) => (
                  <div
                    key={lender.id}
                    className="grid grid-cols-4 gap-6 items-center p-8 border-b border-gray-200"
                  >
                    <Image
                      src={lender.image}
                      alt={lender.name}
                      width={100}
                      height={60}
                      className="object-cover rounded-lg"
                    />
                    <p className="text-gray-800 font-semibold">
                      {lender.location}
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {lender.lenderType}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <GoStarFill
                          key={i}
                          color={
                            lender.reviews[0]?.rating - i > 0
                              ? "#FE621D"
                              : "#D1D5DB"
                          }
                          size={14}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={lenderList.length}
              onChange={(page) => setCurrentPage(page)}
              className="!my-12 !mx-auto"
            />
          </div>
        </div>

        <section className="flex flex-col pb-8">
          <div className="px-8">
            <BlogHighlights />
          </div>
          <HomeAIPane />
          <CustomerServicePane />
        </section>
      </main>
    </>
  );
};

export default Page;
