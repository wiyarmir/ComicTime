export class NetworkError {}
export class UnknownError {
  constructor(statusCode) {
    this.statusCode = statusCode;
  }
}
export class NotFound {}
