import Header from "@/components/Header";
import Image from "next/image";
import Leading from "./leading.png";
import broker from "@/server/broker";

// font-[family-name:var(--font-geist-mono)]

export default async function Home() {
  const brokers = await broker.getBrokers();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-gray-100 items-center justify-items-center min-h-screen font-[family-name:var(--font-montserrat)]">
      <Header />
      <div className="w-full">
        <Image src={Leading} className="w-full" alt="" />
      </div>
    </div>
  );
}
