import { apiUrl } from "../helpers/constants";

async function postEmployee(newEmployee) {
  const postModel = {
    name: newEmployee.name,
    age: newEmployee.age,
    addresses: newEmployee.addresses.map((address) => {
      return { description: address.description };
    }),
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postModel),
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

export default postEmployee;
