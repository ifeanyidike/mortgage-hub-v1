import Header from "@/components/Header";
import Image from "next/image";
import Leading from "./leading.png";
import broker from "@/server/broker";
import { getSession } from "@auth0/nextjs-auth0";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logout from "./login/Logout";
import Verification from "@/server/Verification";

// font-[family-name:var(--font-geist-mono)]

export default async function Home() {
  // const brokers = await broker.getBrokers();
  // const session = await getSession();
  // console.log("session", session);
  const session = await auth();
  const cipher = Verification.encrypt(text);

  const decipher = Verification.decrypt(cipher);

  if (!session?.user) redirect("/login");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-gray-100 items-center justify-items-center min-h-screen font-[family-name:var(--font-montserrat)]">
      <Header />
      <div className="w-full">
        <Image src={Leading} className="w-full" alt="" />
        <div className="text-black">
          {JSON.stringify(session.user, null, 2)}
          <Logout />
        </div>
      </div>
    </div>
  );
}
