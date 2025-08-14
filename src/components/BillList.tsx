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
    const [pdf, setPdf] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8000/bills")
            .then((res) => res.json())
            .then((bills) =>{
                setBills(bills);
            })
    }, []);

    // Remove the initial /pdf fetch

    const handleBillClick = async (bill: Bill, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent default navigation
        const params = new URLSearchParams({
            bill_congress: bill.congress.toString(),
            bill_type: bill.type.toLowerCase(),
            bill_number: bill.number,
        });
        const res = await fetch(`http://localhost:8000/pdf?${params.toString()}`);
        const pdfData = await res.json();
        setPdf(pdfData); // Or handle as needed
        console.log(pdfData); // Log the PDF data for debugging

        // Example: open PDF URL if returned
        if (pdfData && pdfData.url) {
            window.open(pdfData.url, "_blank");
        }
    };

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="grid grid-cols-1 gap-[10px]">
                {bills.map((bill) => (
                    <a
                        key={bill.number}
                        href={bill.url}
                        onClick={(e) => handleBillClick(bill, e)}
                        className="rounded-2xl border-2 border-white bg-gray-800 transition-all duration-200 hover:scale-105 hover:border-purple-600 flex items-center justify-center h-32"
                        style={{ fontFamily: "Arial", fontSize: "24px" }}
                    >
                        <span className="text-white text-center w-full">{bill.title}</span>
                    </a>
                ))}
            </div>
        </div>
    )
};