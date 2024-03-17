import { FOOTER_QUICK_LINKS } from "@/constants";
import { getContacts } from "@/utils/server/settings/getContacts";
import Link from "next/link";
import React from "react";
import FacebookButton from "./socialMedia/FacebookButton";

const Footer = async () => {
  const contacts = (await getContacts()) ?? {
    physicalLocation: "",
    email: "",
    phone: "",
  };

  return (
    <footer className="bg-accent text-accent-foreground p-8">
      <div className="container mx-auto flex flex-wrap gap-5 md:gap-0">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Skomantes Keramika</p>
          <p>{contacts.physicalLocation}</p>
          <p>Email: {contacts.email}</p>
          <p>Phone: {contacts.phone}</p>
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            {FOOTER_QUICK_LINKS.map((val) => (
              <li key={val.label}>
                <Link className="hover:text-primary" href={val.href}>
                  {val.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex flex-col gap-3">
            <p>Connect with us on social media for updates and inspiration!</p>
            <FacebookButton />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Skomantes Keramika. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
