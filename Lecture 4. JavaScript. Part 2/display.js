import { dataWorker } from "./requests.js";
import WorkWithCard from "./card.js";
import WorkWithComments from "./comment.js";

export default class Display {
  async getAndDisplayPosts() {
    let cardWorker = new WorkWithCard();
    let data = await dataWorker.requestData();
    data.map((post) => cardWorker.createCard(post));
  }
  async getAndDisplayComments(cardId, container) {
    let commentWorker = new WorkWithComments();
    let data = await dataWorker.getComments(cardId);

    data.map((comment) => commentWorker.createComment(comment, container));
  }
}
