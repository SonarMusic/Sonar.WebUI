import axios from "axios";
import {ApiException} from "./ApiException";

export default class UserTracksClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }

    getAllTacks(token) {
        return this.client.request({
            method: "GET",
            url: "/tracks/all",
            headers: {
                Accept: "text/plain",
                Token: token
            }
        })
        .catch(error => {
            throw error;
        })
        .then(result => {
            if (result.status === 200) {
                return result.data;
            }

            throw ApiException(result.data, result.status, result);
        })
    }
}