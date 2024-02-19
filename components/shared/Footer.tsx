import React from "react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground p-8">
      <div className="container mx-auto flex flex-wrap gap-5 md:gap-0">
        {/* Contact Information */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Skomantes Keramika</p>
          <p>123 Ceramics Street</p>
          <p>Email: skeramika@gmail.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>

        {/* Social Media */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <p>Connect with us on social media for updates and inspiration!</p>
          {/* Add social media icons or links */}
        </div>

        {/* Newsletter Signup */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p>
            Subscribe to our newsletter for the latest updates and promotions.
          </p>
          {/* Add a newsletter signup form or link */}
        </div>
      </div>

      {/* Copyright and Additional Information */}
      <div className="mt-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Skomantes Keramika. All rights
          reserved.
        </p>
        {/* Additional information or badges */}
      </div>
    </footer>
  );
};

export default Footer;
