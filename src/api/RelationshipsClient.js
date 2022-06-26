import axios from "axios";
import {ApiException} from "./ApiException";

export default class RelationshipsClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }

    sendFriendRequest(token, userEmail) {
        return this.client.request({
            method: "POST",
            url: "/relationship/send-friendship-request",
            params: {
                targetUserEmail: userEmail
            },
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

    acceptFriendRequest(token, userEmail) {
        return this.client.request({
            method: "PATCH",
            url: "/relationship/accept-friendship-request",
            params: {
                requestedEmail: userEmail
            },
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

    rejectFriendRequest(token, userEmail) {
        return this.client.request({
            method: "PATCH",
            url: "/relationship/reject-friendship-request",
            params: {
                requestedEmail: userEmail
            },
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

    getFriends(token) {
        return this.client.request({
            method: "GET",
            url: "/relationship/get-friends",
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

    getRequestsFromMe(token) {
        return this.client.request({
            method: "GET",
            url: "/relationship/get-requests-from-me",
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

    getRequestsToMe(token) {
        return this.client.request({
            method: "GET",
            url: "/relationship/get-requests-to-me",
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