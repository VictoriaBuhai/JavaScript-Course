import { EmptyError } from "./errors.js";
import { StatusError } from "./errors.js";

class WorkWithData {
  constructor(url) {
    this.url = url;
  }
  requestData() {
    return fetch(this.url)
      .then(function (response) {
        if (!response.ok) {
          throw new StatusError("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.length) throw new EmptyError("Posts");

        return data;
      })
      .catch((error) => alert(error.message));
  }

  deleteData(id) {
    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
    }).then(function (response) {
      if (!response.ok) {
        throw new StatusError("Something went wrong");
      }
      return response.json();
    });
  }

  getComments(postId) {
    return fetch(`${this.url}/${postId}/comments`)
      .then(function (response) {
        if (!response.ok) {
          throw new StatusError("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.length) throw new EmptyError("Comments");

        return data;
      })
      .catch((error) => alert(error.message));
  }
}
export const dataWorker = new WorkWithData(
  "https://jsonplaceholder.typicode.com/posts"
);
