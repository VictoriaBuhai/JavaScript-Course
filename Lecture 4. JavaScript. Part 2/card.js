import { dataWorker } from "./requests.js";
import Display from "./display.js";

export default class WorkWithCard {
  createCard({ id, title, body }) {
    let card = document.createElement("div");
    let cardTitle = document.createElement("h3");
    let description = document.createElement("p");
    let deleteButton = document.createElement("button");
    let actionButton = document.createElement("button");
    let comments = document.createElement("div");

    cardTitle.innerText = title;
    description.innerText = body;
    deleteButton.innerText = "X";
    actionButton.innerText = "Open";

    deleteButton.addEventListener("click", this.deleteCard);
    actionButton.onclick = this.openComments;

    card.className = "card";
    comments.className = "comments-container";
    deleteButton.className = "delete-button";
    actionButton.className = "action-button";
    card.id = id;

    card.append(cardTitle, description, deleteButton, comments, actionButton);

    document.getElementById("result").append(card);
  }
  async deleteCard(event) {
    const card = event.target.parentElement;
    const cardId = card.id;
    await dataWorker.deleteData(cardId);
    document.getElementById("result").removeChild(card);
  }

  closeComments(event) {
    const button = event.target;
    const comments = button.parentElement.children[3];
    button.innerText = "Open";
    const cardWorker = new WorkWithCard();
    button.onclick = cardWorker.openComments;
    comments.classList.remove("open");
  }

  async openComments(event) {
    const button = event.target;
    const comments = button.parentElement.children[3];
    button.innerText = "Close";
    const cardWorker = new WorkWithCard();
    button.onclick = cardWorker.closeComments;
    const displayComments = new Display();
    if (comments.children.length === 0) {
      displayComments.getAndDisplayComments(button.parentElement.id, comments);
    }

    comments.classList.add("open");
  }
}
