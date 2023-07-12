import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Layout>
        <div className="flex justify-between">
          <h1>{`Hello,  ${session?.user?.name}`}</h1>
          <div className="flex bg-gray-200 text-black overflow-hidden rounded-lg">
            <img src={session?.user?.image} className="w-9 h-9"></img>
            <span className="py-1 px-2">{session?.user?.name}</span>
          </div>
        </div>
      </Layout>
    </div>
  );
}
