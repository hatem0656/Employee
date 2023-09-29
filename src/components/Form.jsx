import { useEffect, useState } from "react";
import "../styles/form.css";
import postEmployee from "../services/postEmployee";
import putEmployee from "../services/putEmployee";

const initialData = {
  id: "0",
  name: "",
  age: 20,
  addresses: [
    {
      description: "",
    },
  ],
};
const initialError = {
  Name: [],
};

function Form({ employeesData, updateEmployees, setVisibility, updatedData }) {
  const [formData, setFormData] = useState(initialData);
  const [apiErrors, setApiErrors] = useState(initialError);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!updatedData) {
      try {
        const newEmployee = await postEmployee(formData);
        updateEmployees([...employeesData, newEmployee]);
        setApiErrors(initialError);
        setVisibility(false);
      } catch (errors) {
        setApiErrors(errors);
      }
    } else {
      try {
        const updated = await putEmployee(formData);
        updateEmployees(
          employeesData.map((employee) => {
            if (employee.id === updated.id) {
              return updated;
            }
            return employee;
          })
        );
        setApiErrors(initialError);
        setVisibility(false);
      } catch (errors) {
        setApiErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (updatedData) {
      setFormData(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [apiErrors]);

  return (
    <>
      <div className="shadow-bk" onClick={() => setVisibility(false)}></div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="enter your name..."
          required
          value={formData.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />
        {apiErrors.Name.map((error, index) => {
          return (
            <div className="error" key={`nameError${index}`}>
              {error}
            </div>
          );
        })}

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          placeholder="enter your age..."
          required
          min={20}
          max={100}
          value={formData.age}
          onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value,
            })
          }
        />

        {formData.addresses.map((address, index) => {
          return (
            <div key={`address${index + 1}`}>
              <label htmlFor={`address${index + 1}`}>Address {index + 1}</label>
              <input
                type="text"
                name={`address${index + 1}`}
                id={`address${index + 1}`}
                placeholder="enter your address..."
                required
                value={address.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addresses: formData.addresses.map((address, i) => {
                      if (i === index) {
                        return { ...address, description: e.target.value };
                      }
                      return address;
                    }),
                  })
                }
              />
            </div>
          );
        })}

        <button
          className="btn add-address"
          onClick={() =>
            setFormData({
              ...formData,
              addresses: [
                ...formData.addresses,
                { id: "00000000-0000-0000-0000-000000000000", description: "" },
              ],
            })
          }
        >
          add address
        </button>

        <input className="btn submit" type="submit" />
      </form>
    </>
  );
}

export default Form;
