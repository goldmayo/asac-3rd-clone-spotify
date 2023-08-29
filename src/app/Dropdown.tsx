import React from "react";
import { BiLinkExternal } from "react-icons/bi";
function Dropdown() {
  return (
    <>
      <div className="font-sans w-[196px] h-[248px] rounded-md bg-[#282828]  content-center text-white">
        <li>
          <button className="flex py-3 pr-2 pb-3 pl-3">
            <span>계정</span>
            <BiLinkExternal />
          </button>
        </li>
        <li>
          <button className="flex py-3 pr-2 pb-3 pl-3">
            <span>프로필 </span>
          </button>
        </li>
        <li>
          <button className="flex py-3 pr-2 pb-3 pl-3">
            <span>지원</span> <BiLinkExternal />
          </button>
        </li>
        <li>
          <button className="flex py-3 pr-2 pb-3 pl-3">
            <span>다운로드하기</span>
            <BiLinkExternal />
          </button>
        </li>
        <li>
          <button className="py-3 pr-2 pb-3 pl-3">설정</button>
        </li>
        <li>
          <button className="py-3 pr-2 pb-3 pl-3">로그아웃</button>
        </li>
      </div>
    </>
  );
}

export default Dropdown;
