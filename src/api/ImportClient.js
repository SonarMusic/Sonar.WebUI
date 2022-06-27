import axios from "axios";
import {ApiException} from "./ApiException";

export default class ImportClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }

    importFromYoutube(token, url, name) {
        return this.client.request({
            method: "POST",
            url: "/import/youtube",
            headers: {
                Accept: "text/plain",
                Token: token
            },
            data: {
                Url: url,
                Name: name
            }
        }).catch(error => {
            if (error.isAxiosError)
                throw new ApiException(error.response.data, error.status, error);
            throw error;
        }).then(result => {
            if (result.status === 200) {
                return result.data;
            }

            throw ApiException(result.data, result.status, result);
        })
    }
}