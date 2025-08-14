"use client";
import { useEffect, useState } from "react";

type Bill =  {
    "congress": number;
    "latestAction": {
      "actionDate": string;
      "text": string;
    },
    "number": string;
    "originChamber": string;
    "originChamberCode": string;
    "title": string;
    "type": string;
    "updateDate": string;
    "updateDateIncludingText": string;
    "url": string;
  }

export default function BillList(){
    const [bills, setBills] = useState<Bill[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/bills")
            .then((res) => res.json())
            .then((bills) =>{
                setBills(bills);
            })
    }, []);

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="grid grid-cols-1 gap-[10px]">
                {bills.map((bill) => (
                    <div
                        key={bill.number}
                        className="rounded-2xl border-2 border-white bg-gray-800 transition-all duration-200 hover:scale-105 hover:border-purple-600 flex items-center justify-center h-32"
                        style={{ fontFamily: "Arial", fontSize: "24px" }}
                    >
                        <span className="text-white text-center w-full">{bill.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};