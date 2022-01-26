export default class WorkWithComments {
  createComment({ id, email, body }, container) {
    let comment = document.createElement("div");
    let commentEmail = document.createElement("h4");
    let commentBody = document.createElement("p");

    commentEmail.innerText = email;
    commentBody.innerText = body;
    comment.id = id;

    comment.className = "comment";

    comment.append(commentEmail, commentBody);
    container.append(comment);
  }
}
