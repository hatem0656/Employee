import "../styles/table.css";
import Form from "../components/Form";
import { useRef, useState } from "react";
import deleteEmpolyee from "../services/deleteEmpolyee";
function Table({ allEmployees, updateEmployees }) {
  const [formVisible, setFormVisible] = useState(false);
  const data = useRef({});
  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th className="col1">Name</th>
              <th className="col2">Age</th>
              <th className="col3">Address</th>
              <th className="col4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEmployees.map((employee, index) => {
              return (
                <tr key={`employee${index}`}>
                  <td className="col1">{employee.name}</td>
                  <td className="col2">{employee.age}</td>
                  <td className="col3">
                    <ul>
                      {employee.addresses.map((address, index) => {
                        return (
                          <li key={`address${index}`}>{address.description}</li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className="col4">
                    <div className="actions">
                      <button
                        className="btn update"
                        onClick={() => {
                          data.current = employee;
                          setFormVisible(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => {
                          deleteEmpolyee(employee.id);
                          updateEmployees(
                            allEmployees.filter((e) => e.id !== employee.id)
                          );
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {formVisible && (
        <Form
          employeesData={allEmployees}
          updateEmployees={updateEmployees}
          setVisibility={setFormVisible}
          updatedData={data.current}
        />
      )}
    </>
  );
}

export default Table;
