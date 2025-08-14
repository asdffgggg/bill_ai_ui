import Image from "next/image";
import BillList from "@/components/BillList";
export default function Home() {
  return (
    <div className="bg-blue-900 min-h-screen">
      <BillList/>
    </div>
  );
}