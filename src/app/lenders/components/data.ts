import b2bBank from "../lenders_logo/b2b-bank.png";
import canadianWesternBank from "../lenders_logo/canadian-western-bank.jpg";
import coastCapitalSavings from "../lenders_logo/coast-capital-savings.png";
import conexusCreditUnion from "../lenders_logo/conexus-credit-union.png";
import dominonLendingCenters from "../lenders_logo/dominion-lending-centers.jpeg";
import equitableBank from "../lenders_logo/equitable-bank.jpg";
import firstOntarioCreditUnion from "../lenders_logo/first-ontario-credit-union.png";
import mcanFinancial from "../lenders_logo/mcan-financial.png";
import metrixBank from "../lenders_logo/metrix.png";
import mortgageCompanyOfCanada from "../lenders_logo/mortgage-company-of-canada.png";
import streetCapitalBank from "../lenders_logo/street-capital-bank.png";
import trueNorthMortgage from "../lenders_logo/true-north-mortgage.png";
import HomeTrust from "@/app/assets/icons/home-trust.svg";
import firstNationalBank from "@/app/assets/icons/first-national-logo-color.svg";

export const lenders = [
  {
    id: "1",
    name: "Mortgage Company of Canada",
    image: mortgageCompanyOfCanada,
    location: "Calgary, AB",
    lenderType: "Private Mortgage Lender",
    reviews: [
      {
        reviewer: "Sarah L.",
        rating: 5,
        reviewText: "Amazing service, very professional.",
      },
      {
        reviewer: "Tom W.",
        rating: 4,
        reviewText: "Quick and reliable, highly recommend!",
      },
      {
        reviewer: "Lily A.",
        rating: 5,
        reviewText: "Couldn't have asked for better support.",
      },
    ],
  },
  {
    id: "2",
    name: "True North Mortgage",
    image: trueNorthMortgage,
    location: "Vancouver, BC",
    lenderType: "Direct Lender",
    reviews: [
      {
        reviewer: "James B.",
        rating: 5,
        reviewText: "Excellent rates and service.",
      },
      {
        reviewer: "Emily S.",
        rating: 4,
        reviewText: "Quick and easy process.",
      },
      {
        reviewer: "Grace H.",
        rating: 5,
        reviewText: "Very knowledgeable team.",
      },
    ],
  },
  {
    id: "3",
    name: "Dominion Lending Centres",
    image: dominonLendingCenters,
    location: "Ottawa, ON",
    lenderType: "Mortgage Broker",
    reviews: [
      {
        reviewer: "Steve J.",
        rating: 4,
        reviewText: "Very transparent and helpful.",
      },
      {
        reviewer: "Claire V.",
        rating: 5,
        reviewText: "Really helped me find the best deal.",
      },
      {
        reviewer: "Alex P.",
        rating: 4,
        reviewText: "Great experience, will return!",
      },
    ],
  },
  {
    id: "4",
    name: "Canadian Western Bank",
    image: canadianWesternBank,
    location: "Edmonton, AB",
    lenderType: "Bank",
    reviews: [
      {
        reviewer: "Rachel F.",
        rating: 4,
        reviewText: "Friendly staff, good rates.",
      },
      { reviewer: "Leo M.", rating: 5, reviewText: "Top-notch experience!" },
      {
        reviewer: "Nina G.",
        rating: 4,
        reviewText: "Smooth and easy process.",
      },
    ],
  },
  {
    id: "5",
    name: "First National Financial",
    image: firstNationalBank,
    location: "Montreal, QC",
    lenderType: "Private Mortgage Lender",
    reviews: [
      {
        reviewer: "Max L.",
        rating: 5,
        reviewText: "Couldn't be happier with their service.",
      },
      {
        reviewer: "Emma P.",
        rating: 4,
        reviewText: "Highly efficient and friendly.",
      },
      {
        reviewer: "Zoe C.",
        rating: 4,
        reviewText: "Smooth process, great rates.",
      },
    ],
  },
  {
    id: "6",
    name: "Merix Financial",
    image: metrixBank,
    location: "Winnipeg, MB",
    lenderType: "Mortgage Investment Corporation",
    reviews: [
      {
        reviewer: "Daniel R.",
        rating: 5,
        reviewText: "Fantastic team, very supportive.",
      },
      {
        reviewer: "Sophie L.",
        rating: 4,
        reviewText: "Got a great rate, thanks!",
      },
      {
        reviewer: "Ben K.",
        rating: 4,
        reviewText: "Friendly service, no hassle.",
      },
    ],
  },
  {
    id: "7",
    name: "Street Capital Bank",
    image: streetCapitalBank,
    location: "Hamilton, ON",
    lenderType: "Bank",
    reviews: [
      {
        reviewer: "Kate E.",
        rating: 4,
        reviewText: "Quick and seamless process.",
      },
      { reviewer: "Ian G.", rating: 5, reviewText: "Great customer support." },
      { reviewer: "Lily T.", rating: 4, reviewText: "Easy to work with." },
    ],
  },
  {
    id: "8",
    name: "Home Trust Company",
    image: HomeTrust,
    location: "Calgary, AB",
    lenderType: "Trust Company",
    reviews: [
      {
        reviewer: "Harry W.",
        rating: 4,
        reviewText: "Affordable rates and great service.",
      },
      {
        reviewer: "Chloe M.",
        rating: 5,
        reviewText: "Very helpful and patient.",
      },
      { reviewer: "Sam D.", rating: 4, reviewText: "Good overall experience." },
    ],
  },
  {
    id: "9",
    name: "Equitable Bank",
    image: equitableBank,
    location: "Toronto, ON",
    lenderType: "Bank",
    reviews: [
      {
        reviewer: "Oliver H.",
        rating: 4,
        reviewText: "Nice and simple process.",
      },
      { reviewer: "Sophia Y.", rating: 5, reviewText: "Fast and efficient." },
      {
        reviewer: "Liam B.",
        rating: 4,
        reviewText: "Professional and courteous.",
      },
    ],
  },
  {
    id: "10",
    name: "MCAN Mortgage Corporation",
    image: mcanFinancial,
    location: "Regina, SK",
    lenderType: "Mortgage Investment Corporation",
    reviews: [
      {
        reviewer: "Fiona Z.",
        rating: 5,
        reviewText: "Great support and rates!",
      },
      {
        reviewer: "Julia V.",
        rating: 4,
        reviewText: "Knowledgeable and friendly team.",
      },
      {
        reviewer: "Noah R.",
        rating: 4,
        reviewText: "Solid choice for mortgages.",
      },
    ],
  },
  {
    id: "11",
    name: "First Ontario Credit Union",
    image: firstOntarioCreditUnion,
    location: "Burlington, ON",
    lenderType: "Credit Union",
    reviews: [
      {
        reviewer: "Karen C.",
        rating: 4,
        reviewText: "Good experience overall.",
      },
      { reviewer: "Oliver W.", rating: 5, reviewText: "Excellent service!" },
      { reviewer: "Amy T.", rating: 4, reviewText: "Friendly and efficient." },
    ],
  },
  {
    id: "12",
    name: "Coast Capital Savings",
    image: coastCapitalSavings,
    location: "Victoria, BC",
    lenderType: "Credit Union",
    reviews: [
      {
        reviewer: "George N.",
        rating: 4,
        reviewText: "Very good rates and service.",
      },
      {
        reviewer: "Emma Q.",
        rating: 5,
        reviewText: "They really helped me through the process.",
      },
      { reviewer: "Jason L.", rating: 4, reviewText: "Quick and easy!" },
    ],
  },
  {
    id: "13",
    name: "Conexus Credit Union",
    image: conexusCreditUnion,
    location: "Saskatoon, SK",
    lenderType: "Credit Union",
    reviews: [
      {
        reviewer: "Natalie B.",
        rating: 4,
        reviewText: "Great customer support.",
      },
      { reviewer: "Dylan R.", rating: 5, reviewText: "Friendly and helpful." },
      { reviewer: "Emily S.", rating: 4, reviewText: "Would recommend!" },
    ],
  },
  {
    id: "14",
    name: "Home Trust",
    image: HomeTrust,
    location: "Mississauga, ON",
    lenderType: "Trust Company",
    reviews: [
      {
        reviewer: "Evan W.",
        rating: 5,
        reviewText: "Fantastic service and staff!",
      },
      {
        reviewer: "Lucas G.",
        rating: 4,
        reviewText: "Helpful through the whole process.",
      },
      {
        reviewer: "Laura P.",
        rating: 4,
        reviewText: "Good rates and smooth service.",
      },
    ],
  },
  {
    id: "15",
    name: "B2B Bank",
    image: b2bBank,
    location: "Montreal, QC",
    lenderType: "Bank",
    reviews: [
      {
        reviewer: "Samantha J.",
        rating: 4,
        reviewText: "Great experience with their team.",
      },
      {
        reviewer: "Mike T.",
        rating: 5,
        reviewText: "Very friendly and knowledgeable.",
      },
      {
        reviewer: "Olivia R.",
        rating: 4,
        reviewText: "Would work with them again.",
      },
    ],
  },
];
