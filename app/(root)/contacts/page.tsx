import React from "react";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const ContactPage = () => {
  return (
    <div className="padding-container">
      <h1>Contacts</h1>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="text-3xl border-[1px] rounded-full inline-block p-2">
              <LuPhone />
            </div>

            <div>
              <p>Phone:</p>
              <p>+123 456 7890</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-3xl border-[1px] rounded-full inline-block p-2">
              <MdOutlineEmail />
            </div>
            <div>
              <p>Email:</p>
              <p>skeramika@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-3xl border-[1px] rounded-full inline-block p-2">
              <IoLocationOutline />
            </div>
            <div>
              <p>Physical location:</p>
              <p>vilniaus g. 11-11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
