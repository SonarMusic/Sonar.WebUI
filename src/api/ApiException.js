export class ApiException extends Error {
    constructor(message, status, response) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
    }
}