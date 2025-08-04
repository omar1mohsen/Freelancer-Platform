"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";


import VisaIcon from "@/assets/images/stores/visa.svg";
import TamaraIcon from "@/assets/images/stores/tamara.svg";
import CardIcon from "@/assets/images/stores/card3.svg";
import MasterIcon from "@/assets/images/stores/mastercard.svg";
import SpayIcon from "@/assets/images/stores/spay.svg";



import "@/styles/layout/footer.scss";

interface Props {
  settings: any;
  categories: any;
}

const paymentIcons = [
  { src: SpayIcon, alt: "spay" },
  { src: MasterIcon, alt: "mastercard" },
  { src: CardIcon, alt: "card" },
  { src: TamaraIcon, alt: "tamara" },
  { src: VisaIcon, alt: "visa" },
];



export default function Footer() {

  return (
    <footer className="relative z-[9] mt-auto w-full bg-white overflow-hidden max-lg:pb-16">


      {/* Footer Bottom */}
      <div className="container py-4">
        <div className="md:flex justify-between items-center">
          <p className="text-sm font-normal leading-6 text-dark text-start">
            جميع الحقوق محفوظه © 2024
          </p>
          <div className="flex gap-3 items-center mt-4 md:mt-0">
            <div className="flex items-center gap-5">
              {paymentIcons.map((item, i) => (
                <Image key={`payment_method_${i}`} src={item.src} width={100} height={50} className="w-auto h-auto" alt={item.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
