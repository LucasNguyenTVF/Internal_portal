import React, { memo } from "react";
import logo from "../../assets/techvify_logo.svg";
const Header = () => {
  return (
    <div className="flex justify-between items-center py-2 md:py-5 px-2 md:px-10 sticky top-0 z-1 border-b-2 border-border-color bg-[#00000000] backdrop-blur-md">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="lg:h-12 md:h-10 h-8 lg:w-50 md:w-40 w-30 "
        />
      </div>
    </div>
  );
};

export default memo(Header);
