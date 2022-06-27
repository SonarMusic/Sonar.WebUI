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
            method: "POST",
            url: "/user/login",
            data: {
                Email: email,
                Password: password
            }
        })
        .catch(error => {
            if (error.isAxiosError)
                throw new ApiException(error.response.data, error.status, error);
            throw error;
        })
        .then(result => {
            if (result.status === 200) {
                return result.data;
            }

            throw new ApiException(result.data.response, result.status, result);
        });
    }

    register(email, password) {
        return this.client.request({
            method: "POST",
            url: "/user/register",
            data: {
                Email: email,
                Password: password
            }
        })
        .catch(error => {
            if (error.isAxiosError)
                throw new ApiException(error.response.data, error.status, error);
            throw error;
        })
        .then(result => {
            if (result.status === 200) {
                return result.data;
            }

            throw ApiException(result.data, result.status, result);
        });
    }

    getUser(token) {
        return this.client.request({
            method: "GET",
            url: "/user/get",
            headers: {
                Accept: "text/plain",
                Token: token
            }
        })
        .catch(error => {
            if (error.isAxiosError)
                throw new ApiException(error.response.data, error.status, error);
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