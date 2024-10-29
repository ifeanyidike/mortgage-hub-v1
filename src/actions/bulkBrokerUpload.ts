"use server";

import user from "@/server/user";
import { NewBroker, NewUser } from "@/types/db";

const data: Omit<NewBroker & NewUser, "user_id" | "created_at">[] = [
  {
    email: "manpreet.pabla@mtgarc.ca",
    name: "MPS Pabla",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Agent",
    lic: "12728",
    description: `Manpriit Pabla is an award-winning mortgage Adviser in Calgary with years of experience in the financial sector. He is well-versed in residential mortgages and business lending. Including First Time Homebuyers, Investment Properties, Second Homes/Vacation Properties, Renewals, Refinances, and everything in between.
    Pabla is highly professional and efficient; in finding the right mortgage solution to fit your needs. He will provide guidance and professional advice through each stage of the mortgage process.`,
    location: {
      address: "1245-3730 108 Avenue NE Calgary, AB., T3N 1V9",
      city: "Calgary",
      province: "Alberta",
    },
    website: "https://www.manpreetpabla.com",
    phone: "403-423-2222",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/384cdb04-7e8e-4cb4-b628-a4547932c7b7.PNG",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/manpreetsinghpabla",
    },
  },
  {
    email: "carlos.monteiro@mtgarc.ca",
    name: "Carlos Monteiro",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Planner",
    location: {
      address: "5675 Whittle Road, Mississauga ON L4Z 3P8",
      city: "Mississauga",
      province: "Ontario",
    },
    description: `For the last 20 years, I have worked in the finance field managing professionals in accounting. I pride myself on providing professional ethical and honest advice with a very high level of customer service to all of my clients. Whether you are purchasing, looking to renovate a home, transferring a mortgage or re-finance an existing mortgage, my role is to find the most suitable mortgage product for your particular circumstance. 
My previous experience helps me provide solid advice that can help determine the right fit for you and your family today and for tomorrow.
On a personal side I love spending time with my 3 boys. I enjoy the outdoors and staying active.

I look forward to helping you out.

Carlos`,
    phone: "(403) 464-1872",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/50bfdcf2-142d-4eed-82e3-c9664cfe3603.jpg",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/carlosmonteiro",
    },
  },
  {
    email: "waheed.mayell@mtgarc.ca",
    name: "Waheed Mayell",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Agent",
    lic: "12728",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/3debba62-15b2-4a0c-9536-8a4dfc8253653e57fffe-82cb-4da6-9fd9-d4a73e5fc2f3.jpg",
    location: {
      address: "12 Hebert Rd, St. Albert AB",
      city: "AB",
      province: "Alberta",
    },
    phone: "780-937-8670",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/waheedmayell",
    },
  },
  {
    email: "stacey.scott@mtgarc.ca",
    name: "Stacey Scott",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Planner",
    description: `Serving Cochrane & Area 
I am a Mortgage Planner with Mortgage Architects - Unbeatable Mortgage Team.  
I have been in the industry since 2006 and have dedicated myself to educating my clients on the best products available to them.  
Rates are big part of the picture when mortgage shopping BUT, it is just as important to choose a mortgage that is uniquely tailored to your individual needs.  There are many options out there and being able to confidently decide what is best for you, completes the puzzle.  
Best of all......The Advice is FREE!  
Please feel free to contact me for a no obligation mortgage assessment.  Phone 403-850-7738 or email at stacey.scott@mtgarc.ca`,
    location: {
      address: "# 17, 205 1st East Cochrane Alberta",
      city: "East Cochrane",
      province: "Alberta",
    },
    phone: "4038507738",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/65aaa66d-45c2-4b64-bc61-ea63709da088c30939e9-87b2-4190-b828-1ae5c8fb904b.jpg",
    social_links: { custom_link: "https://www.mortgagearchitects.ca/sscott" },
  },
  {
    email: "lisa.lafrance@mtgarc.ca",
    name: "Lisa Lafrance",
    role: "broker",
    company: "Independently Owned & Operated",
    title: "Mortgage Agent",
    description: `Thank you for considering my mortgage planning services, where objective advice and great rates are just the beginning. A mortgage is one of the most important financial decisions you may ever make, and with so many choices and ongoing decisions, the right advice can have a huge financial impact. You need a mortgage solution that meets your unique requirements now, and ongoing strategies to help you become mortgage free faster.
With access to more than 50 financial institutions - including major banks, credit unions, trusts and other national and regional lenders - my goal is to design the right mortgage solution for you - with features and options that meet your needs. What does such expertise and access to a vast financial network cost? It costs you nothing. There are no arranging fees (oac). Instead, the lender we decide on together pays compensation for the services and solution provided, and only after your mortgage has closed. And since my business is built primarily through referrals from satisfied customers, your positive mortgage experience is essential!
Your mortgage is a big decision and a powerful financial tool. I look forward to helping you achieve your financial and homeownership goals.`,
    lic: "Lic.12176",
    location: {
      address: "529 Wilson Ave, North York, ON M3H 1V1",
      city: "North York",
      province: "Alberta",
    },
    phone: "403.519.1218",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/85b29c66-53aa-4c1c-9f60-d1cd66921ba7.jpg",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/lisalafrance",
    },
  },
  {
    email: "margaret.amangyen@mtgarc.ca",
    name: "Margaret Amangyen",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Agent",
    lic: "Brokerage #12728",
    location: {
      address: "725 Hardy Pt NW Edmonton, AB",
      city: "Edmonton",
      province: "Alberta",
    },
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/f0219a7e-a8d4-433c-9fef-553bd1c5bb01.jpeg",
    phone: "587-888-2260",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/margaretamangyen",
    },
  },
  {
    email: "zhijuan.cheung@mtgarc.ca",
    name: "Zhi Juan (Jane) Cheung",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Planner",
    lic: "12728",
    location: {
      address: "5675 Whittle Road Mississauga ON, L4Z 3P8",
      city: "Mississauga",
      province: "Ontario",
    },
    phone: "587-718-8083",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/38d11e0d-b322-4032-b191-073c1113733a.jpg",
    website: "http://janecheung.ca",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/zhijuancheung",
    },
  },
  {
    email: "lea.legassick@mtgarc.ca",
    name: "Lea Legassick",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Associate",
    location: {
      address: "St. Albert | Edmonton | Alberta",
      city: "Edmonton",
      province: "Alberta",
    },
    phone: "780-717-7971",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/6e273a30-12ad-4c28-8259-14d070430cceefaf57c7-e954-411b-9319-f384fc132bc7.jpg",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/lealegassick",
    },
  },
  {
    email: "prashant.mahay@mtgarc.ca",
    name: "Prashant Mahay",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Planner",
    lic: "12728",
    location: {
      address: "12 Hebert Rd. St. Albert AB, T8N 0B7",
      city: "St. Albert",
      province: "Alberta",
    },
    phone: "780-803-0202",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/bbe8f123-d2cf-4b9a-b0f8-ef970bc2e814350b2074-f568-45d2-9f96-439d405383c5.jpg",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/prashantmahay",
    },
  },
  {
    email: "nick.bains@mtgarc.ca",
    name: "Nick Bains",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Planner",
    lic: "12728",
    location: {
      address: "12 Hebert Rd St. Albert, AB T8N 5T8",
      city: "St. Albert",
      province: "Alberta",
    },
    phone: "(780) 200-2800",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/8cc1e26c-ee7e-4302-bd57-af5ce8833da0.jpg",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/nickbains",
    },
  },
  {
    email: "mortgagesbyleah@outlook.com",
    name: "Leah Prokopiw",
    role: "broker",
    title: "Mortgage Planner",
    location: {
      address: "5675 Whittle Road, Mississauga, ON, L4Z 3P8",
      city: "Mississauga",
      province: "Ontario",
    },
    description: `As a Mortgage Architects professional, I can provide you with the options and expertise to get the right mortgage for your immediate and future needs.
As a mortgage professional I have access to many competing lending institutions, including banks, pension funds, trust companies and even private funds. I do not work for any one financial institution but instead I work independently and deal with several lending institutions, which will allow me to offer my clients more choices and the best competitive rates. In this role I am the person who liaises between the borrower and the lender and best of all there is no cost to the borrower for this service, instead the lender is the one who reimburses me for my services.
If you have been thinking about purchasing a home, renewing a mortgage, investing in a property, purchasing a vacation home, refinancing/consolidating debt, considering home improvements, etc... I would be very happy to explore these options with you.
Allow me to take away the stress of finding the right mortgage for you, relax and enjoy the freedom of knowing that you made the right decision!
You are not obligated to use my services however I would like the opportunity to help save you money by getting you a lower interest rate then what you are currently being offered through other financial institutions. I believe a strong and successful career in the mortgage business is based off of trust with each and every individual client. Which also means offering them the best products with the lowest rates for their needs.`,
    phone: "7809946225",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/230b220d-5172-4c9a-becd-87b9cc030e02b4883366-58fd-430a-a7d5-66f4d15197d9.JPG",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/leahprokopiw",
    },
  },
  {
    email: "stephlk44@gmail.com",
    name: "Stephanie Kirby",
    role: "broker",
    company: "Mortgageline Mortgage Architects",
    title: "Mortgage Associate",
    location: {
      address: "500, 609 – 14 Street N.W., Calgary, Alberta, T2N 2A1",
      city: "Calgary",
      province: "Alberta",
    },
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/dad1b384-5755-4f57-93b3-b0a2f9ff9245472eddb8-85b2-410f-9506-03bfc99bde56.jpg",
    phone: "403.629.2655",
    description: `Let me introduce myself, my name is Stephanie Kirby and I am a Mortgage Associate with Mortgageline.
My extensive work experience has included public relations, finance, marketing, start up and operation of a small business and several years in Real Estate.
As a self motivated individual, I thrive on responsibility and customer service.  Using my professional expertise, I will provide options to you so that you may strategically implement your mortgage/refinance towards safely and consistently building wealth.  This valuable service is done under my professional guidance with the "best interests of the client" being both our goals.
I am 100% committed to being an asset to you.  My ethics and business practices are the base of my successful business and there is never any doubt as to the "right" thing to do.  I ensure communication with you throughout the entire purchase/mortgage process and you can count on me at all times to keep you informed.  I will ensure your home purchase/refinance in completed smoothly and efficiently.`,
    website: "http://www.mymortgageline.ca/",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/stephaniekirby",
    },
  },
  {
    email: "caylie.verity@mtgarc.ca",
    name: "Caylie Verity",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Agent",
    lic: "12728",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/9cdfb257-78f9-436f-992e-769a93dc05d0.jpg",
    phone: "403-803-4187",
    location: {
      address: "14567 118 Avenue NW, Edmonton",
      city: "Edmonton",
      province: "Alberta",
    },
    description: `Thank you for considering my mortgage planning services. For most people, their mortgage represents their largest and lowest-cost debt obligation, and their home is generally their most significant asset. That's why a mortgage plan is so important. The right mortgage plan can protect you from a financial downturn, save you thousands of dollars, and help build your wealth over time.

With access to a vast network of over 50 lending institutions - including major banks, credit unions, trusts and other national and regional lenders, I have the tools to build a customized mortgage plan, with the features and options that meet your needs, whether you are:

- purchasing your first or next home;
- investing in property or buying a vacation/second home;
- refinancing to boost cash flow and drive down debt; or,
- looking at options for your mortgage renewal.

Since my business is built primarily through referrals from satisfied customers, your positive mortgage experience is essential! Your mortgage is a big decision and a powerful financial tool.

I look forward to helping you achieve your financial and homeownership goals.`,
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/caylieverity",
    },
  },
  {
    email: "anshul.goyal@mtgarc.ca",
    name: "Anshul Goyal",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Associate",
    lic: "12728",
    phone: "(780) 802-5206",
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/8bbce334-27b5-4c3f-b169-b40af6d54e7eb4196e34-292c-4047-862b-2a2b23fc0774.JPG",
    location: {
      address: "12 Hebert Rd. St. Albert, AB T8N 5T8",
      city: "Edmonton",
      province: "Alberta",
    },
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/anshulgoyal",
    },
    description: `Hello and welcome! I've been a mortgage planner and broker for over 20 years, helping people achieve their dreams of home ownership and financial security. I've helped many people build their own mortgage plans, including first-time buyers, refinancing, and buying a second home. I've also helped people build their own refinancing plans, including buying a home, refinancing to boost cash flow and drive down debt, and
    refinancing to refinance a home that has been downgraded or delinquent.`,
  },
  {
    email: "simratpal.singh@mtgarc.ca",
    name: "Simrat Singh",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Planner",
    lic: "12728",
    location: {
      address: "12 Hebert RD St, St Albert, Alberta, T8N 5P4",
      city: "Edmonton",
      province: "Alberta",
    },
    phone: "587-973-0509",
    picture:
      "https://www.mortgagearchitects.ca/Content/MACOR/Site/Content/Images/default_broker_photo.jpg",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/simratpalsingh",
    },
    description: `Hello and welcome! I've been a mortgage planner and broker for over 20 years, helping people achieve their dreams of home ownership and financial security. I've helped many people build their own mortgage plans, including first-time buyers, refinancing, and buying a second home. I've also
    helped people build their own refinancing plans, including buying a home, refinancing to boost cash flow and drive down debt, and refinancing to refinance a home that has been downgraded or delinquent.`,
  },
  {
    email: "candace@mymortgageline.ca",
    name: "Candace LeClair",
    role: "broker",
    company: "Mortgageline Mortgage Architects",
    title: "Mortgage Planner",
    location: {
      address: "#409 - 9945 50th Street, Edmonton, AB, T6A 0L4",
      city: "Edmonton",
      province: "Alberta",
    },
    phone: "780.970.2141",
    description: `Hello and welcome! Throughout my years in the mortgage industry, I have helped many people achieve their dreams of home ownership and financial security. I develop mortgage plans for my clients that often begin with their first purchase and carries them to their next mortgage need, whether itâ€™s for a trade up home, real estate investing, vacation property, or debt consolidation. And thatâ€™s probably why my business is built primarily through referrals from satisfied clients.

With access to more than 50 financial institutions â€“ including major banks, credit unions, trusts and other national and regional lenders â€“ I can get mortgage financing for almost any situation, although my service is more than just placing your mortgage with a lender. There are no fees for my consultations, planning and mortgage placement (oac). The lender we decide on pays compensation for the services and solution provided, and only after your mortgage has closed.

Your mortgage is a big decision and a powerful financial tool. I look forward to helping you achieve your financial and homeownership goals!`,
    picture:
      "https://storage.malink.ca:4004/BROKER_PROFILE/f3fecf50-45ad-4287-be38-c2e8b68d93e4.jpg",
    website: "http://www.mortgagesbycandace.com",
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/candaceleclair",
    },
  },
  {
    email: "sundeep.mann@mtgarc.ca",
    name: "Sundeep Mann",
    role: "broker",
    company: "Mortgage Architects",
    title: "Mortgage Agent Level 1",
    location: {
      address: "5675 Whittle Rd., Mississauga, ON., L4Z3P8",
      city: "Mississauga",
      province: "Ontario",
    },
    social_links: {
      custom_link: "https://www.mortgagearchitects.ca/sundeepmann",
    },
    picture:
      "https://www.mortgagearchitects.ca/Content/MACOR/Site/Content/Images/default_broker_photo.jpg",
    phone: "416-558-3194",
  },
];

export async function upload_brokers() {
  await user.bulkUploadBroker(data as any);
}
