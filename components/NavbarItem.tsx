interface NavbarItemProps {
  label: String;
}

import React from "react";

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
