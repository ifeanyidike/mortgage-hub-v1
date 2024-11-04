import Header from "@/components/Header";
import { auth } from "@/auth";
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
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeCarouselSection from "@/components/HomeCarouselSection";

// font-[family-name:var(--font-geist-mono)]
//grid grid-rows-[20px_1fr_20px] bg-gray-100 items-center justify-items-center

export default async function Home() {
  // const brokers = await broker.getBrokers();
  // const session = await getSession();  max-w-screen-xl mx-auto
  // console.log("session", session);
  const session = await auth();

  // if (!session?.user) redirect("/login");
  return (
    <main className="bg-[#e0e0e2]">
      <Header bgColor="bg-[#e0e0e2]" />
      <main className="font-[family-name:var(--font-montserrat)] max-w-screen-xl mx-auto">
        <HomeHeroSection />
        <HomeCarouselSection />
        <section className="py-16 px-8 overflow-hidden">
          <BlogHighlights />
        </section>
        <section className="overflow-hidden">
          <HouseTransfer />
        </section>
        <section className="overflow-hidden">
          <HomeAIPane />
        </section>
        <section className="bg-gray-200 pb-8 overflow-hidden">
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
        <section className="overflow-hidden">
          <NewImmigrantHighlight />
        </section>
      </main>
    </main>
  );
}
