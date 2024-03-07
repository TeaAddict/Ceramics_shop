import { getContacts } from "@/utils/server/settings/getContacts";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const contacts = await getContacts();

  if (contacts)
    return (
      <footer className="bg-accent text-accent-foreground p-8">
        <div className="container mx-auto flex flex-wrap gap-5 md:gap-0">
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>Skomantes Keramika</p>
            <p>{contacts.physicalLocation}</p>
            <p>Email: {contacts.email}</p>
            <p>Phone: {contacts.phone}</p>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link className="hover:text-primary" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/privacyPolicy">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <p>Connect with us on social media for updates and inspiration!</p>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p>
              Subscribe to our newsletter for the latest updates and promotions.
            </p>
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
