import React from "react";

const Footer = () => {
  return (
    <div className="text-sm text-center mt-[585px]  not-first: ml-[260px] bg-gray-50 py-4">
      <b>
        {" "}
        © Copyright {new Date().getFullYear()} | Designed & Developed By:
        Rahul Sah{" "}
      </b>
    </div>
  );
};

export default Footer;
