import React, { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

function Header({ person, showPerson, setSearch }) {
  const [iconActive, setIconActive] = useState(true);

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
          {person.username?.charAt(0).toUpperCase() + person.username?.slice(1)}
        </p>
      </div>
      <div className="ms-auto">
        <OverlayTrigger
          trigger={"click"}
          key={"top"}
          placement={"bottom-end"}
          overlay={
            <Popover>
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder="Search Chat..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Popover>
          }
        >
          <div className="btn p-0 m-0">
            {iconActive ? (
              <AiOutlineSearch
                onClick={() => setIconActive(!iconActive)}
                style={{ cursor: "pointer" }}
                className="fs-4 ms-1 text-dark"
              />
            ) : (
              <AiOutlineCloseCircle
                onClick={() => {
                  setIconActive(!iconActive); setSearch("");
                }}
                style={{ cursor: "pointer" }}
                className="fs-4 ms-1 text-dark"
              />
            )}
          </div>
        </OverlayTrigger>

        <FiMoreVertical className="m-2 fs-5" />
      </div>
    </div>
  );
}

export default Header;
