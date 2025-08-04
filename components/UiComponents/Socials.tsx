import Link from "next/link";
import React from "react";
import { FaLinkedin, FaSnapchat, FaTwitter } from "react-icons/fa";

import { FaTiktok,FaWhatsapp,FaYoutube,FaInstagram} from "react-icons/fa6";

interface SocialsProps {
  className?: string;
  settings?: any;
}
const Socials = ({ className,settings }: SocialsProps) => {

  return (
    <div className={`icons  ${className ? className : ""}`}>
      {settings?.whatsapp && (
      <Link href={`https://wa.me/${settings?.whatsapp}`}>
        <FaWhatsapp size={30} />
      </Link>
      )}
      {settings?.instagram && (
      <Link href={`${settings?.instagram}`}>
        <FaInstagram size={30} />
      </Link>
      )}
      {settings?.twitter && (
        <Link href={`${settings?.twitter}`}>
          <FaTwitter size={30} />
        </Link>
      )}
      {settings?.youtube && (
        <Link href={`${settings?.youtube}`}>
          <FaYoutube size={30} />
        </Link>
      )}
      {settings?.facebook && (
        <Link href={`${settings?.facebook}`}>
          <FaLinkedin  size={30} />
        </Link>
      )}
      {settings?.snapchat && (
        <Link href={`${settings?.snapchat}`}>
          <FaSnapchat size={30} />
        </Link>
      )}
    </div>
  );
};

export default Socials;
