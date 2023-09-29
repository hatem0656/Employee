import { apiUrl } from "../helpers/constants";

async function getEmployees(page) {
  try {
    const response = await fetch(apiUrl + "page/" + page);
    if (!response.ok) {
      throw new Error("");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export default getEmployees;
