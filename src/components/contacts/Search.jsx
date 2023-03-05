import "./Search.css";

import React from "react";
import { GREEN, BACKGROUND } from "../../helpers/Colors";

import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Search = () => {
  const {contactSearch } = useContext(ContactContext);

  return (
    <>
      <div
        style={{ width: "75%" }}
        dir="ltr"
        className="input-group flex-nowrap "
      >
        <span
          dir="ltr"
          class="input-group-text"
          id="addon-wrapping"
          style={{
            cursor: "pointer",
            background: BACKGROUND,
            border: `1px solid ${GREEN}`,
          }}
        >
          <i class="fa fa-search" style={{ color: "white" }}></i>
        </span>
        <input
          dir="rtl"
          type="text"
          onChange={event => contactSearch(event.target.value)}
          placeholder="جستجوی مخاطب"
          aria-label="Search"
          aria-describedby="basic-addon1"
          className="w-100 p-2 rounded"
        />
      </div>
    </>
  );
};

export default Search;
