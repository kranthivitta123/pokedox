import React, { useRef } from "react";
import classNames from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
  const inputRef = useRef("");

  const handleEvent = debounce(() => saveInput());

  /**
   * @method To delay key up event
   * @param {*} func
   * @param {number} [timeout=1000]
   * @return {*}
   */

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  /**
   * @method Emit text value
   */

  function saveInput() {
    props.click(inputRef.current.value);
  }

  return (
    <div className={classNames.form__field}>
      <input
        placeholder="Name or Number"
        ref={inputRef}
        type="text"
        className="d-block"
        id="search"
        name="search"
        onKeyUp={() => handleEvent()}
      />
      <div className={classNames.icon}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
