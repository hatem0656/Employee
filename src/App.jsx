import "./styles/global.css";
import Table from "./components/Table";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import getEmployees from "./services/getEmployees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    getEmployees(currentPage)
      .then((data) => {
        setTotalPages(data.totalPages);
        setEmployees(data.employees);
      })
      .catch((_) => {
        setError("500 ! Internal Server Error !");
      });
  }, [currentPage]);

  return (
    <div className="App">
      {error === null ? (
        <>
          <button className="add btn" onClick={() => setFormVisible(true)}>
            add employee
          </button>
          <div className="arrows container">
            {currentPage !== 1 && (
              <button
                className="btn prev"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <i></i>
              </button>
            )}

            <button
              className={
                currentPage !== totalPages ? "btn next" : "btn next hide"
              }
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <i></i>
            </button>
          </div>

          <Table allEmployees={employees} updateEmployees={setEmployees} />
          {formVisible && (
            <Form
              employeesData={employees}
              updateEmployees={setEmployees}
              setVisibility={setFormVisible}
            />
          )}
        </>
      ) : (
        <div className="serverError">{error}</div>
      )}
    </div>
  );
}

export default App;
