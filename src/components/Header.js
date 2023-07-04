import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

function Header({ person, showPerson }) {
  return (
    <div
      className="d-flex p-2 ps-3 bg-dark bg-opacity-25 justify-content-center align-items-center rounded-top"
      style={{ height: "8%" }}
    >
      <div className="d-flex align-items-center">
        <BiArrowBack
          onClick={() => showPerson({})}
          className=""
          style={{ cursor: "pointer" }}
        />
        <p className="fs-5 ms-4 m-auto">
          {person.username.charAt(0).toUpperCase() + person.username.slice(1)}
        </p>
      </div>
      <div className="ms-auto">
        <AiOutlineSearch className="m-2 fs-5" />
        <FiMoreVertical className="m-2 fs-5" />
      </div>
    </div>
  );
}

export default Header;
