"use client";

import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { MdOutlinePersonOutline } from "react-icons/md";

import Dropdown from "./Dropdown";

function Header() {
  const back = () => {
    window.history.back();
  };
  const forward = () => {
    window.history.forward();
  };
  const [open, setopen] = useState(false);

  return (
    <div>
      <div className="flex justify-between relative  bg-[#121212] rounded-lg">
        <div className="ml-1.5 flex gap-x-2">
          <button
            className="rounded-full bg-black w-8 h-8 flex justify-center items-center"
            onClick={back}
          >
            <BsChevronLeft fontSize="16px;" color="white" />{" "}
          </button>
          <button
            className="rounded-full bg-black w-8 h-8 flex justify-center items-center"
            onClick={forward}
          >
            {" "}
            <BsChevronRight fontSize="16px;" color="white" />
          </button>
        </div>
        <ul
          className="relative"
          onClick={() => {
            setopen(!open);
          }}
        >
          <button className="rounded-full bg-black w-8 h-8 flex justify-center items-center">
            <MdOutlinePersonOutline color="#fff" fontSize="large" />
          </button>
          {open && (
            <div className="absolute top full" style={{ marginLeft: "-180px" }}>
              {<Dropdown />}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
