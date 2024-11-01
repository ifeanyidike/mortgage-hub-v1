"use client";
import React, { useEffect, useState } from "react";
import { lenders } from "../components/data";
import Image from "next/image";
import Header from "@/components/Header";
import { Button, Pagination } from "antd";
import { GoStarFill } from "react-icons/go";
import { checkWordsInString, cn } from "@/app/utils";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSearchParams } from "next/navigation";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";

const Page = () => {
  // Helper function to limit review text to 5 words with ellipsis
  const truncateReviewText = (text: string, length = 5) => {
    const words = text.split(" ");
    return words.length > length
      ? words.slice(0, length).join(" ") + "..."
      : text;
  };
  const [lenderList, setLenderList] = useState<typeof lenders>([]);
  const params = useSearchParams();

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

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Define items per page based on screen size (5 for mobile, 10 for desktop)
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const itemsPerPage = isDesktop ? 6 : 3;

  // Calculate the displayed items based on current page and itemsPerPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLenders = lenderList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Header bgColor="bg-transparent" />
      <div className="lg:px-32 flex flex-col mb-8">
        <Link href="/lenders" className="lg:px-0 px-8">
          <Button
            size="small"
            shape="round"
            className="!uppercase !bg-black !text-white !w-32 !mt-8"
          >
            New search
          </Button>
        </Link>
        <div className="lg:rounded-3xl bg-[#F2F2F2] px-8 lg:px-16 py-6 w-full my-8">
          Your Lender Search results
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block rounded-[60px] px-16 py-8 shadow-[rgba(0,0,15,0.2)_0px_1px_0px_2px] border border-[rgba(0,0,15,0.2)]">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-4 border-b border-gray-300 pb-4 mb-8">
            <h5 className="font-bold text-lg text-left">Lender</h5>
            <h5 className="font-bold text-lg text-left">Location</h5>
            <h5 className="font-bold text-lg text-left">Lender Type</h5>
            <h5 className="font-bold text-lg text-left">Reviews</h5>
          </div>

          {/* Lender Entries */}
          <div className="space-y-6">
            {Boolean(!lenderList.length) && (
              <div className="text-2xl py-16 text-center font-semibold">
                {" "}
                The search query does not match any lender in the system..{" "}
              </div>
            )}
            {paginatedLenders.map((lender, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 items-start border-b border-gray-200 py-8"
              >
                {/* Image Column */}
                <div className="flex items-start">
                  <Image
                    src={lender.image}
                    alt={lender.name}
                    width={150}
                    className={cn(
                      "object-cover rounded-lg",
                      (lender.name.includes("Home Trust") ||
                        lender.name === "MCAN Mortgage Corporation") &&
                        "bg-gray-500"
                    )}
                  />
                </div>

                {/* Location Column */}
                <div className="text-left">
                  <p className="text-gray-700 font-semibold">
                    {lender.location}
                  </p>
                </div>

                {/* Lender Type Column */}
                <div className="text-left">
                  <p className="text-gray-700 font-semibold">
                    {lender.lenderType}
                  </p>
                </div>

                {/* Reviews Column */}
                <div className="flex flex-col text-left">
                  {lender.reviews.map((review, reviewIndex) => (
                    <div
                      key={reviewIndex}
                      className="flex items-center space-x-2 mb-1"
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <GoStarFill
                            key={i}
                            color={review.rating - i > 0 ? "#FE621D" : "#000"}
                            size={14}
                          />
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm overflow-hidden">
                        {truncateReviewText(review.reviewText)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="px-8 block lg:hidden">
          {Boolean(!lenderList.length) && (
            <div className="text-2xl py-16 text-center font-semibold">
              {" "}
              The search query does not match any lender in the system.{" "}
            </div>
          )}
          {paginatedLenders.map((lender, index) => (
            <div
              key={lender.id}
              className="grid grid-cols-2 items-start border-b border-gray-800 py-8 gap-8"
            >
              <div className="flex items-start">
                <Image
                  src={lender.image}
                  alt={lender.name}
                  width={150}
                  className={cn(
                    "object-cover rounded-lg",
                    (lender.name.includes("Home Trust") ||
                      lender.name === "MCAN Mortgage Corporation") &&
                      "bg-gray-500"
                  )}
                />
              </div>
              <div>
                <h4 className="text-base text-[#FE621D] font-semibold gap-4">
                  Location
                </h4>
                <p className="text-[17px] font-semibold">{lender.location}</p>
              </div>

              <div>
                <h4 className="text-base text-[#FE621D] font-semibold gap-4">
                  Lender type
                </h4>
                <p className="text-[17px] font-normal">{lender.lenderType}</p>
              </div>

              <div className="flex flex-col text-left gap-4">
                <h4 className="text-base text-[#FE621D] font-semibold">
                  Reviews
                </h4>
                {lender.reviews.map((review, reviewIndex) => (
                  <div
                    key={reviewIndex}
                    className="flex flex-col items-start mb-1"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <GoStarFill
                          key={i}
                          color={review.rating - i > 0 ? "#FE621D" : "#000"}
                          size={12}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
                      {truncateReviewText(review.reviewText, 2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}

        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={lenderList.length}
          onChange={(page) => setCurrentPage(page)}
          className="!my-12 !mx-auto"
        />
      </div>

      <section>
        <BlogHighlights />
        <HomeAIPane />
        <CustomerServicePane />
      </section>
    </>
  );
};

export default Page;