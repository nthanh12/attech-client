import React from "react";
import "./SearchModal.css";

const SearchModal = () => {
  return (
    <div
      className="modal fade"
      id="searchModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h4 className="modal-title mb-0" id="exampleModalLabel">
              Tìm kiếm
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex align-items-center">
            <div className="input-group w-75 mx-auto d-flex">
              <input
                type="search"
                className="form-control p-3"
                placeholder="Tìm kiếm"
                aria-describedby="search-icon-1"
              />
              <span id="search-icon-1" className="input-group-text p-3">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
