import { apiUrl } from "../helpers/constants";

async function deleteEmpolyee(id) {
  await fetch(apiUrl + id, {
    method: "DELETE",
  });
}

export default deleteEmpolyee;
