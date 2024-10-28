import Header from "@/components/Header";
import Image from "next/image";
import Leading from "./assets/Images/hero-image.jpg";
import { auth } from "@/auth";
import Logout from "./login/Logout";
import HomeChatBubble from "@/components/HomeChatBubble";
import HeroDesktop from "@/app/assets/Images/hero-transparent.png";
import { Button } from "antd";
import HomeCarousel from "@/components/HomeCarousel";
import BlogHighlights from "@/components/BlogHighlights";
import HouseTransfer from "@/components/HouseTransfer";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import StatPane from "@/components/StatPane";
import SelectLender from "@/components/SelectLender";
import FurtherStat from "@/components/FurtherStat";
import ToolsHighlight from "@/components/ToolsHighlight";
import NewImmigrantHighlight from "@/components/NewImmigrantHighlight";

// font-[family-name:var(--font-geist-mono)]
//grid grid-rows-[20px_1fr_20px] bg-gray-100 items-center justify-items-center

export default async function Home() {
  // const brokers = await broker.getBrokers();
  // const session = await getSession();
  // console.log("session", session);
  // const session = await auth();

  // if (!session?.user) redirect("/login");
  return (
    <>
      <Header bgColor="bg-[#e0e0e2]" />
      <main className="min-h-screen font-[family-name:var(--font-montserrat)]">
        <section className="bg-[#e0e0e2] w-full h-[1000px] overflow-hidden relative max-[1300px]:flex max-[1300px]:flex-col gap-5">
          <div className="w-full pt-2 ml-32 relative max-2xl:ml-8 max-[1300px]:-ml-10 order-2 max-[1300px]:mt-auto">
            <Image
              src={HeroDesktop}
              alt="hero image"
              className="h-full max-[1300px]:h-auto max-[1300px]:w-[450px] max-[800px]:w-[350px] max-sm:w-72"
              style={{ transform: "rotateY(180deg)" }}
            />
            <div
              className=" absolute top-[8%] left-6 z-10 w-[700px] max-[1300px]:w-[450px] max-[1300px]:top-0
          aspect-square border-2 border-white rounded-full pointer-events-none max-sm:w-64"
            ></div>

            <div className="absolute top-[580px] left-[680px] max-[1300px]:top-0 max-[1300px]:left-64 max-sm:left-28">
              <div className=" absolute">
                <HomeChatBubble
                  text="You are approved for Home"
                  color="#3EBA97"
                  time="09:37"
                  hasHeart={true}
                  hasShadow={true}
                />
              </div>

              <div className="absolute left-24 top-36">
                <HomeChatBubble
                  text="Mom i got appoved!"
                  color="#3185FC"
                  time="09:38"
                  hasHeart={true}
                  hasHappy={true}
                />
              </div>

              <div className="absolute left-24 top-64 max-sm:left-0">
                <HomeChatBubble
                  text="WOW! u weren't kidding about AI"
                  color="#FFFFFF"
                  time="09:40"
                  hasHeart={false}
                  hasHappy={false}
                />
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 flex p-0 m-0 max-[1300px]:static order-1 ">
            <div className="flex flex-col max-[1550px]:px-20 max-[1360px]:px-14 max-[500px]:px-4 w-1/2 max-[1300px]:w-full max-[1300px]:pt-16 pt-32 px-32 box-border ml-auto gap-14 leading-tight">
              <h2
                className={`text-[70px] max-[1360px]:text-6xl max-[1300px]:text-7xl max-sm:text-5xl max-[1300px]:font-medium`}
              >
                Mortgage Hub Makes Home Possible
              </h2>
              <p className="text-2xl max-[1300px]:text-xl">
                Discover personalized mortgage solutions and financial tools
                designed to make homeownership more accessible.
              </p>
            </div>
          </div>

          {/* {session?.user && (
          <div className="text-black">
            {JSON.stringify(session.user, null, 2)}
            <Logout />
          </div>
        )} */}
        </section>

        <section className="lg:pt-24 pb-16 pt-16 flex flex-col gap-16 overflow-hidden">
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <h2 className="text-4xl max-md:text-3xl max-sm:text-2xl">
              Designed to Make Your Mortgage Journey Easy
            </h2>
            <div>
              <p className="uppercase text-lg max-md:text-base max-sm:text-xs">
                Designed to Make Your Mortgage Journey Easy
              </p>
              <small>
                Explore a range of mortgage options tailored to your financial
                goals.
              </small>
            </div>
            <Button
              type="primary"
              shape="round"
              size="small"
              className="!uppercase"
            >
              Get started
            </Button>
          </div>
          <div className="w-full flex flex-col justify-center items-center text-center">
            <HomeCarousel />
          </div>
          <BlogHighlights />
        </section>
        <section className="overflow-hidden">
          <HouseTransfer />
        </section>
        <section className="overflow-hidden">
          <HomeAIPane />
        </section>
        <section className="bg-gray-200 pb-32 overflow-hidden">
          <CustomerServicePane />
          <StatPane />
        </section>
        <section>
          <SelectLender />
        </section>
        <section>
          <FurtherStat />
        </section>
        <section>
          <ToolsHighlight />
        </section>
        <section>
          <NewImmigrantHighlight />
        </section>
      </main>
    </>
  );
}
