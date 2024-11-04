// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { lenders } from "../components/data";
// // import Image from "next/image";
// // import Header from "@/components/Header";
// // import { Button, Pagination } from "antd";
// // import { GoStarFill } from "react-icons/go";
// // import { checkWordsInString, cn } from "@/app/utils";
// // import Link from "next/link";
// // import useMediaQuery from "@/hooks/useMediaQuery";
// // import { useSearchParams } from "next/navigation";
// // import BlogHighlights from "@/components/BlogHighlights";
// // import HomeAIPane from "@/components/HomeAIPane";
// // import CustomerServicePane from "@/components/CustomerServicePane";

// // const Page = () => {
// //   // Helper function to limit review text to 5 words with ellipsis
// //   const truncateReviewText = (text: string, length = 5) => {
// //     const words = text.split(" ");
// //     return words.length > length
// //       ? words.slice(0, length).join(" ") + "..."
// //       : text;
// //   };
// //   const [lenderList, setLenderList] = useState<typeof lenders>([]);
// //   const params = useSearchParams();

// //   useEffect(() => {
// //     const lenderType = params.get("lenderType");
// //     const location = params.get("location");
// //     const rating = params.get("rating");
// //     const _filteredLenders = lenders.filter((lender) => {
// //       const lenderTypeCheck = lenderType
// //         ? checkWordsInString(lender.lenderType, lenderType)
// //         : true;
// //       const locationCheck = location
// //         ? checkWordsInString(lender.location, location)
// //         : true;
// //       const totalRating = lender.reviews.reduce(
// //         (acc, curr) => acc + curr.rating,
// //         0
// //       );
// //       const averageRating = totalRating / lender.reviews.length;
// //       const ratingCheck = rating ? parseInt(rating) >= averageRating : true;
// //       return lenderTypeCheck && locationCheck && ratingCheck;
// //     });
// //     setLenderList(_filteredLenders);
// //   }, []);

// //   // State for pagination
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Define items per page based on screen size (5 for mobile, 10 for desktop)
// //   const isDesktop = useMediaQuery("(min-width: 1024px)");
// //   const itemsPerPage = isDesktop ? 6 : 3;

// //   // Calculate the displayed items based on current page and itemsPerPage
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedLenders = lenderList.slice(
// //     startIndex,
// //     startIndex + itemsPerPage
// //   );

// //   return (
// //     <>
// //       <Header bgColor="bg-transparent" />
// //       <div className="lg:px-32 flex flex-col mb-8">
// //         <Link href="/lenders" className="lg:px-0 px-8">
// //           <Button
// //             size="small"
// //             shape="round"
// //             className="!uppercase !bg-black !text-white !w-32 !mt-8"
// //           >
// //             New search
// //           </Button>
// //         </Link>
// //         <div className="lg:rounded-3xl bg-[#F2F2F2] px-8 lg:px-16 py-6 w-full my-8">
// //           Your Lender Search results
// //         </div>

// //         {/* Desktop View */}
// //         <div className="hidden lg:block rounded-[60px] px-16 py-8 shadow-[rgba(0,0,15,0.2)_0px_1px_0px_2px] border border-[rgba(0,0,15,0.2)]">
// //           {/* Header Row */}
// //           <div className="grid grid-cols-4 gap-4 border-b border-gray-300 pb-4 mb-8">
// //             <h5 className="font-bold text-lg text-left">Lender</h5>
// //             <h5 className="font-bold text-lg text-left">Location</h5>
// //             <h5 className="font-bold text-lg text-left">Lender Type</h5>
// //             <h5 className="font-bold text-lg text-left">Reviews</h5>
// //           </div>

// //           {/* Lender Entries */}
// //           <div className="space-y-6">
// //             {Boolean(!lenderList.length) && (
// //               <div className="text-2xl py-16 text-center font-semibold">
// //                 {" "}
// //                 The search query does not match any lender in the system..{" "}
// //               </div>
// //             )}
// //             {paginatedLenders.map((lender, index) => (
// //               <div
// //                 key={index}
// //                 className="grid grid-cols-4 gap-4 items-start border-b border-gray-200 py-8"
// //               >
// //                 {/* Image Column */}
// //                 <div className="flex items-start">
// //                   <Image
// //                     src={lender.image}
// //                     alt={lender.name}
// //                     width={150}
// //                     className={cn(
// //                       "object-cover rounded-lg",
// //                       (lender.name.includes("Home Trust") ||
// //                         lender.name === "MCAN Mortgage Corporation") &&
// //                         "bg-gray-500"
// //                     )}
// //                   />
// //                 </div>

// //                 {/* Location Column */}
// //                 <div className="text-left">
// //                   <p className="text-gray-700 font-semibold">
// //                     {lender.location}
// //                   </p>
// //                 </div>

// //                 {/* Lender Type Column */}
// //                 <div className="text-left">
// //                   <p className="text-gray-700 font-semibold">
// //                     {lender.lenderType}
// //                   </p>
// //                 </div>

// //                 {/* Reviews Column */}
// //                 <div className="flex flex-col text-left">
// //                   {lender.reviews.map((review, reviewIndex) => (
// //                     <div
// //                       key={reviewIndex}
// //                       className="flex items-center space-x-2 mb-1"
// //                     >
// //                       <div className="flex">
// //                         {[...Array(5)].map((_, i) => (
// //                           <GoStarFill
// //                             key={i}
// //                             color={review.rating - i > 0 ? "#FE621D" : "#000"}
// //                             size={14}
// //                           />
// //                         ))}
// //                       </div>
// //                       <p className="text-gray-500 text-sm overflow-hidden">
// //                         {truncateReviewText(review.reviewText)}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Mobile View */}
// //         <div className="px-8 block lg:hidden">
// //           {Boolean(!lenderList.length) && (
// //             <div className="text-2xl py-16 text-center font-semibold">
// //               {" "}
// //               The search query does not match any lender in the system.{" "}
// //             </div>
// //           )}
// //           {paginatedLenders.map((lender, index) => (
// //             <div
// //               key={lender.id}
// //               className="grid grid-cols-2 items-start border-b border-gray-800 py-8 gap-8"
// //             >
// //               <div className="flex items-start">
// //                 <Image
// //                   src={lender.image}
// //                   alt={lender.name}
// //                   width={150}
// //                   className={cn(
// //                     "object-cover rounded-lg",
// //                     (lender.name.includes("Home Trust") ||
// //                       lender.name === "MCAN Mortgage Corporation") &&
// //                       "bg-gray-500"
// //                   )}
// //                 />
// //               </div>
// //               <div>
// //                 <h4 className="text-base text-[#FE621D] font-semibold gap-4">
// //                   Location
// //                 </h4>
// //                 <p className="text-[17px] font-semibold">{lender.location}</p>
// //               </div>

// //               <div>
// //                 <h4 className="text-base text-[#FE621D] font-semibold gap-4">
// //                   Lender type
// //                 </h4>
// //                 <p className="text-[17px] font-normal">{lender.lenderType}</p>
// //               </div>

// //               <div className="flex flex-col text-left gap-4">
// //                 <h4 className="text-base text-[#FE621D] font-semibold">
// //                   Reviews
// //                 </h4>
// //                 {lender.reviews.map((review, reviewIndex) => (
// //                   <div
// //                     key={reviewIndex}
// //                     className="flex flex-col items-start mb-1"
// //                   >
// //                     <div className="flex">
// //                       {[...Array(5)].map((_, i) => (
// //                         <GoStarFill
// //                           key={i}
// //                           color={review.rating - i > 0 ? "#FE621D" : "#000"}
// //                           size={12}
// //                         />
// //                       ))}
// //                     </div>
// //                     <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
// //                       {truncateReviewText(review.reviewText, 2)}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Pagination Component */}

// //         <Pagination
// //           current={currentPage}
// //           pageSize={itemsPerPage}
// //           total={lenderList.length}
// //           onChange={(page) => setCurrentPage(page)}
// //           className="!my-12 !mx-auto"
// //         />
// //       </div>

// //       <section>
// //         <BlogHighlights />
// //         <HomeAIPane />
// //         <CustomerServicePane />
// //       </section>
// //     </>
// //   );
// // };

// // export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import { lenders } from "../components/data";
// import Image from "next/image";
// import Header from "@/components/Header";
// import { Button, Pagination } from "antd";
// import { GoStarFill } from "react-icons/go";
// import { checkWordsInString, cn } from "@/app/utils";
// import Link from "next/link";
// import useMediaQuery from "@/hooks/useMediaQuery";
// import { useSearchParams } from "next/navigation";
// import BlogHighlights from "@/components/BlogHighlights";
// import HomeAIPane from "@/components/HomeAIPane";
// import CustomerServicePane from "@/components/CustomerServicePane";
// import { motion } from "framer-motion";

// const Page = () => {
//   const truncateReviewText = (text: string, length = 5) => {
//     const words = text.split(" ");
//     return words.length > length
//       ? words.slice(0, length).join(" ") + "..."
//       : text;
//   };
//   const [lenderList, setLenderList] = useState<typeof lenders>([]);
//   const params = useSearchParams();

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

//   const [currentPage, setCurrentPage] = useState(1);
//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const itemsPerPage = isDesktop ? 6 : 3;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedLenders = lenderList.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <>
//       <Header bgColor="bg-transparent" />
//       <main className="max-w-screen-xl mx-auto">
//         <motion.div
//           className="lflex flex-col mb-8 max-w-screen-xl mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Link href="/lenders" className="lg:px-0 px-8">
//             <Button
//               size="small"
//               shape="round"
//               className="!uppercase !bg-black !text-white !w-32 !mt-8 hover:bg-[#FE621D] transition-all duration-300"
//             >
//               New search
//             </Button>
//           </Link>

//           <motion.div
//             className="lg:rounded-3xl bg-gradient-to-r from-[#F2F2F2] to-[#E0E7FF] px-8 lg:px-16 py-6 w-full my-8 shadow-md"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <h3 className="text-xl font-semibold text-gray-800">
//               Your Lender Search Results
//             </h3>
//           </motion.div>

//           {/* Desktop View */}
//           <div className="hidden lg:block rounded-[60px] px-16 py-8 shadow-lg border border-gray-300 bg-white/90 backdrop-blur-md">
//             <div className="grid grid-cols-4 gap-4 border-b border-gray-300 pb-4 mb-8">
//               <h5 className="font-bold text-lg text-left">Lender</h5>
//               <h5 className="font-bold text-lg text-left">Location</h5>
//               <h5 className="font-bold text-lg text-left">Lender Type</h5>
//               <h5 className="font-bold text-lg text-left">Reviews</h5>
//             </div>

//             <div className="space-y-6">
//               {Boolean(!lenderList.length) && (
//                 <div className="text-2xl py-16 text-center font-semibold text-gray-600">
//                   No lenders match your search criteria.
//                 </div>
//               )}
//               {paginatedLenders.map((lender, index) => (
//                 <motion.div
//                   key={index}
//                   className="grid grid-cols-4 gap-4 items-start border-b border-gray-200 py-8"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <Image
//                     src={lender.image}
//                     alt={lender.name}
//                     width={150}
//                     className={cn(
//                       "object-cover rounded-lg shadow-lg",
//                       (lender.name.includes("Home Trust") ||
//                         lender.name === "MCAN Mortgage Corporation") &&
//                         "bg-gray-500"
//                     )}
//                   />

//                   <div className="text-left">
//                     <p className="text-gray-700 font-semibold">
//                       {lender.location}
//                     </p>
//                   </div>

//                   <div className="text-left">
//                     <p className="text-gray-700 font-semibold">
//                       {lender.lenderType}
//                     </p>
//                   </div>

//                   <div className="flex flex-col text-left">
//                     {lender.reviews.map((review, reviewIndex) => (
//                       <div
//                         key={reviewIndex}
//                         className="flex items-center space-x-2 mb-1"
//                       >
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <GoStarFill
//                               key={i}
//                               color={review.rating - i > 0 ? "#FE621D" : "#000"}
//                               size={14}
//                             />
//                           ))}
//                         </div>
//                         <p className="text-gray-500 text-sm overflow-hidden">
//                           {truncateReviewText(review.reviewText)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Mobile View */}
//           <div className="px-8 block lg:hidden">
//             {Boolean(!lenderList.length) && (
//               <div className="text-2xl py-16 text-center font-semibold text-gray-600">
//                 No lenders match your search criteria.
//               </div>
//             )}
//             {paginatedLenders.map((lender, index) => (
//               <motion.div
//                 key={lender.id}
//                 className="grid grid-cols-2 items-start border-b border-gray-200 py-8 gap-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Image
//                   src={lender.image}
//                   alt={lender.name}
//                   width={150}
//                   className="object-cover rounded-lg shadow-md"
//                 />

//                 <div>
//                   <h4 className="text-base text-[#FE621D] font-semibold gap-4">
//                     Location
//                   </h4>
//                   <p className="text-[17px] font-semibold">{lender.location}</p>
//                 </div>

//                 <div>
//                   <h4 className="text-base text-[#FE621D] font-semibold gap-4">
//                     Lender type
//                   </h4>
//                   <p className="text-[17px] font-normal">{lender.lenderType}</p>
//                 </div>

//                 <div className="flex flex-col text-left gap-4">
//                   <h4 className="text-base text-[#FE621D] font-semibold">
//                     Reviews
//                   </h4>
//                   {lender.reviews.map((review, reviewIndex) => (
//                     <div
//                       key={reviewIndex}
//                       className="flex flex-col items-start mb-1"
//                     >
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <GoStarFill
//                             key={i}
//                             color={review.rating - i > 0 ? "#FE621D" : "#000"}
//                             size={12}
//                           />
//                         ))}
//                       </div>
//                       <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
//                         {truncateReviewText(review.reviewText, 2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <Pagination
//             current={currentPage}
//             pageSize={itemsPerPage}
//             total={lenderList.length}
//             onChange={(page) => setCurrentPage(page)}
//             className="!my-12 !mx-auto"
//           />
//         </motion.div>
//         <BlogHighlights />
//         <HomeAIPane />
//         <CustomerServicePane />
//       </main>
//     </>
//   );
// };

// export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import { lenders } from "../components/data";
// import Image from "next/image";
// import Header from "@/components/Header";
// import { Button, Pagination } from "antd";
// import { GoStarFill } from "react-icons/go";
// import { checkWordsInString, cn } from "@/app/utils";
// import Link from "next/link";
// import useMediaQuery from "@/hooks/useMediaQuery";
// import { useSearchParams } from "next/navigation";
// import BlogHighlights from "@/components/BlogHighlights";
// import HomeAIPane from "@/components/HomeAIPane";
// import CustomerServicePane from "@/components/CustomerServicePane";
// import { motion } from "framer-motion";

// const Page = () => {
//   const [lenderList, setLenderList] = useState<typeof lenders>([]);
//   const params = useSearchParams();
//   const [currentPage, setCurrentPage] = useState(1);
//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const itemsPerPage = isDesktop ? 6 : 3;

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

//   // Calculate displayed items based on current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedLenders = lenderList.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <>
//       <Header bgColor="bg-transparent" />
//       <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto p-8 lg:p-16 gap-8">
//         {/* Sidebar for filters */}
//         <aside className="sidebar lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md sticky top-20 h-full self-start">
//           <h3 className="text-xl font-bold mb-4">Filter Lenders</h3>
//           <Link href="/lenders">
//             <Button
//               size="small"
//               shape="round"
//               className="!uppercase !bg-black !text-white !w-32 !mt-8"
//             >
//               New search
//             </Button>
//           </Link>
//         </aside>

//         {/* Main content area */}
//         <main className="flex-1 space-y-8">
//           {/* Hero section */}
//           <motion.section
//             className="hero-section w-full bg-gradient-to-r from-blue-500 to-blue-300 p-8 rounded-lg shadow-lg text-white text-center mb-8"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl font-bold">Explore Trusted Lenders</h1>
//             <p className="text-lg mt-2">
//               Find the right lender tailored to your needs
//             </p>
//           </motion.section>

//           {/* Lender cards grid */}
//           <section className="lender-cards grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
//             {Boolean(!lenderList.length) && (
//               <div className="text-2xl py-16 text-center font-semibold col-span-full">
//                 No results match your search criteria.
//               </div>
//             )}
//             {paginatedLenders.map((lender, index) => (
//               <motion.div
//                 key={lender.id}
//                 className="lender-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Image
//                   src={lender.image}
//                   alt={lender.name}
//                   width={150}
//                   height={100}
//                   className="object-cover rounded-lg shadow-md mb-4 w-full h-36"
//                 />
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {lender.name}
//                 </h3>
//                 <p className="text-gray-500 mb-2">{lender.location}</p>
//                 <p className="text-gray-700 font-semibold">
//                   {lender.lenderType}
//                 </p>

//                 <div className="flex items-center mb-2 mt-4">
//                   {[...Array(5)].map((_, i) => (
//                     <GoStarFill
//                       key={i}
//                       color={
//                         lender.reviews[0]?.rating - i > 0
//                           ? "#FE621D"
//                           : "#D1D5DB"
//                       }
//                       size={14}
//                     />
//                   ))}
//                 </div>

//                 <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
//                   {lender.reviews[0]?.reviewText.slice(0, 100)}...
//                 </p>
//               </motion.div>
//             ))}
//           </section>

//           {/* Pagination */}
//           <Pagination
//             current={currentPage}
//             pageSize={itemsPerPage}
//             total={lenderList.length}
//             onChange={(page) => setCurrentPage(page)}
//             className="!my-12 !mx-auto"
//           />
//         </main>
//       </div>

//       <section>
//         <BlogHighlights />
//         <HomeAIPane />
//         <CustomerServicePane />
//       </section>
//     </>
//   );
// };

// export default Page;

// "use client";
// import React, { useEffect, useState } from "react";
// import { lenders } from "../components/data";
// import Image from "next/image";
// import Header from "@/components/Header";
// import { Button, Pagination } from "antd";
// import { GoStarFill } from "react-icons/go";
// import { checkWordsInString, cn } from "@/app/utils";
// import Link from "next/link";
// import useMediaQuery from "@/hooks/useMediaQuery";
// import { useSearchParams } from "next/navigation";
// import BlogHighlights from "@/components/BlogHighlights";
// import HomeAIPane from "@/components/HomeAIPane";
// import CustomerServicePane from "@/components/CustomerServicePane";
// import { motion } from "framer-motion";
// import { FaTh, FaList } from "react-icons/fa";
// import CtaButton from "@/components/CtaButton";

// const Page = () => {
//   const [lenderList, setLenderList] = useState<typeof lenders>([]);
//   const [isGridView, setIsGridView] = useState(true); // View toggle state
//   const params = useSearchParams();
//   const [currentPage, setCurrentPage] = useState(1);
//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const itemsPerPage = isDesktop ? 6 : 3;

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

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedLenders = lenderList.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Toggle between grid and table views
//   const handleToggleView = () => setIsGridView((prev) => !prev);

//   return (
//     <>
//       <Header bgColor="bg-transparent" />
//       <div className="flex flex-col max-w-screen-xl mx-auto px-8 py-4 gap-8">
//         {/* Sidebar for filters */}
//         <aside className="sidebar bg-gray-100 p-4 rounded-lg shadow-md sticky top-20 h-full self-start">
//           {/* <Link href="/lenders">
//             <Button
//               size="small"
//               shape="round"
//               className="!uppercase !bg-black !text-white !w-32 !mt-8"
//             >
//               New search
//             </Button>
//           </Link> */}
//           <CtaButton
//             classes="!bg-gray-800 !text-white hover:!bg-[#266ace] !py-6 !text-base !mr-auto"
//             bodyStyle="justify-start"
//             text="New search"
//             href="/lenders"
//           />
//         </aside>

//         {/* Main content area */}
//         <main className="flex-1 space-y-4">
//           {/* Hero section */}
//           <motion.section
//             className="hero-section w-full bg-gradient-to-r from-blue-500 to-blue-300 p-4 rounded-lg shadow-lg text-white text-center mb-8"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-2xl font-bold">Explore Trusted Lenders</h1>
//             <p className="text-sm mt-2">
//               Find the right lender tailored to your needs
//             </p>
//           </motion.section>

//           {/* View Toggle Button */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={handleToggleView}
//               className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
//             >
//               {isGridView ? (
//                 <>
//                   <FaList className="text-base" />
//                   <span>Switch to Table View</span>
//                 </>
//               ) : (
//                 <>
//                   <FaTh className="text-base" />
//                   <span>Switch to Grid View</span>
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Lender display */}
//           {isGridView ? (
//             <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
//               {paginatedLenders.map((lender, index) => (
//                 <motion.div
//                   key={lender.id}
//                   className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Image
//                     src={lender.image}
//                     alt={lender.name}
//                     width={150}
//                     height={100}
//                     className="object-cover rounded-lg shadow-md mb-4 w-full h-36"
//                   />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {lender.name}
//                   </h3>
//                   <p className="text-gray-500 mb-2">{lender.location}</p>
//                   <p className="text-gray-700 font-semibold">
//                     {lender.lenderType}
//                   </p>
//                   <div className="flex items-center mb-2 mt-4">
//                     {[...Array(5)].map((_, i) => (
//                       <GoStarFill
//                         key={i}
//                         color={
//                           lender.reviews[0]?.rating - i > 0
//                             ? "#FE621D"
//                             : "#D1D5DB"
//                         }
//                         size={14}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-gray-500 text-sm overflow-hidden text-ellipsis">
//                     {lender.reviews[0]?.reviewText.slice(0, 100)}...
//                   </p>
//                 </motion.div>
//               ))}
//             </section>
//           ) : (
//             <div className="rounded-lg shadow-lg border border-gray-200">
//               <div className="grid grid-cols-4 gap-4 border-b border-gray-300 pb-4 p-4">
//                 <h5 className="font-bold text-lg">Lender</h5>
//                 <h5 className="font-bold text-lg">Location</h5>
//                 <h5 className="font-bold text-lg">Lender Type</h5>
//                 <h5 className="font-bold text-lg">Reviews</h5>
//               </div>
//               {paginatedLenders.map((lender) => (
//                 <div
//                   key={lender.id}
//                   className="grid grid-cols-4 gap-4 items-center p-4 border-b border-gray-200"
//                 >
//                   <Image
//                     src={lender.image}
//                     alt={lender.name}
//                     width={100}
//                     height={60}
//                     className="object-cover rounded-lg"
//                   />
//                   <p className="text-gray-800 font-semibold">
//                     {lender.location}
//                   </p>
//                   <p className="text-gray-700 font-semibold">
//                     {lender.lenderType}
//                   </p>
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <GoStarFill
//                         key={i}
//                         color={
//                           lender.reviews[0]?.rating - i > 0
//                             ? "#FE621D"
//                             : "#D1D5DB"
//                         }
//                         size={14}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           <Pagination
//             current={currentPage}
//             pageSize={itemsPerPage}
//             total={lenderList.length}
//             onChange={(page) => setCurrentPage(page)}
//             className="!my-12 !mx-auto"
//           />
//         </main>
//       </div>

//       <section>
//         <BlogHighlights />
//         <HomeAIPane />
//         <CustomerServicePane />
//       </section>
//     </>
//   );
// };

// export default Page;

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
                classes="!bg-gray-800 !text-white hover:!bg-[#266ace] !py-6 !text-base !mr-auto"
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
                        "object-contain  rounded-lg shadow-md mb-4 w-full h-28",
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
                      {lender.reviews[0]?.reviewText.slice(0, 100)}...
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
