import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "../../styles/Table.css";

const Table = ({
  data,
  headers,
  handleSort,
  sortBy,
  sortDesc,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const headerStyle = {
    fontWeight: "bold",
  };

  return (
    <div className="container">
      <table className="table table-striped">
        <thead style={headerStyle}>
          <tr className="header-row">
            {headers.map((header) => (
              <th
                key={header.key}
                onClick={() => handleSort(header.key)} // Sort function
                className="col"
              >
                <div className="header-content">
                  {header.label}
                  <i
                    className={`fa ${
                      sortBy === header.key && !sortDesc
                        ? "fa-sort-up"
                        : "fa-sort"
                    }`}
                  ></i>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                {headers.map((header) => (
                  <td key={header.key} className="data-row">
                    {/* Render custom content based on the header */}
                    {header.render ? header.render(item) : item[header.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <div className="pagination-controls">
          <button
            className="previous"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <LeftOutlined />
          </button>
          <span>
            &nbsp;{currentPage} of {totalPages}&nbsp;
          </span>
          <button
            className="next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDesc: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Table;
