import { apiUrl } from "../helpers/constants";

async function putEmployee(newEmployee) {
  const updateModel = {
    id: newEmployee.id,
    name: newEmployee.name,
    age: newEmployee.age,
    addresses: newEmployee.addresses,
  };
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateModel),
    });
    if (!response.ok) {
      const { errors } = await response.json();
      throw errors;
    }
    const employee = await response.json();
    return employee;
  } catch (errors) {
    throw errors;
  }
}

export default putEmployee;
