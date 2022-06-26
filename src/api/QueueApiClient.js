import axios from "axios";

export default class QueueApiClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }
}