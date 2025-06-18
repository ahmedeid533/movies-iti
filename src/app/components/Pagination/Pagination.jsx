import React from 'react';
import { Container } from 'react-bootstrap';

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <Container className="w-100 d-flex justify-content-center my-5">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => page > 1 ? setPage((prev) => prev - 1) : setPage(1)}
            aria-label="Previous"
            role="button"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {[1, 2, 3].map((p) => (
          <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
            <a className="page-link" onClick={() => setPage(p)} role="button">
              {p}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a
            className="page-link"
            onClick={() =>
              page < totalPages ? setPage((prev) => prev + 1) : setPage(totalPages)
            }
            aria-label="Next"
            role="button"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </Container>
  );
};

export default Pagination;
