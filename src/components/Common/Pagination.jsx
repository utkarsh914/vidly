import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const renderList = () => {
    return pages.map((page) => {
      let listClasses = "page-item clickable";
      if (page === currentPage) listClasses += " active";
      return (
        <li
          className={listClasses}
          key={page}
          onClick={() => onPageChange(page)}
        >
          <span href="#" className="page-link">
            {page}
          </span>
        </li>
      );
    });
  };

  return (
    <nav>
      <ul className="pagination">{renderList()}</ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
