import axios from "axios";
import {ApiException} from "./ApiException";

export default class UserClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }

    login(email, password) {
        return this.client.request({
            method: "PATCH",
            url: "/user/login",
            data: {
                email: email,
                password: password
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
        });
    }

    register(username, password) {
        return this.client.request({
            method: "POST",
            url: "/user/register",
            data: {
                username: username,
                password: password
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
        });
    }
}