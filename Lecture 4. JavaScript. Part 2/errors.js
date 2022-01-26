export class EmptyError extends Error {
  constructor(property) {
    super(`${property} data is empty`);
    this.name = "EmptyError";
    this.property = property;
  }
}
export class StatusError extends Error {
  constructor(message) {
    super(message);
    this.name = "StatusError";
  }
}
