import axios from "axios";
import {ApiException} from "./ApiException";

export default class QueueClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }

    addTrackToQueue(token, trackId) {
        return this.client.request({
            method: "PATCH",
            url: "/queue/track",
            headers: {
                Accept: "text/plain",
                Token: token
            },
            params: {
                trackId: trackId
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

    getNextTrack(token) {
        return this.client.request({
            method: "GET",
            url: "/queue/next",
            headers: {
                Accept: "text/plain",
                Token: token
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

    getPreviousTrack(token) {
        return this.client.request({
            method: "GET",
            url: "/queue/previous",
            headers: {
                Accept: "text/plain",
                Token: token
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

    addPlaylistToQueue(token, playlistId) {
        return this.client.request({
            method: "PATCH",
            url: "/queue/playlist",
            headers: {
                Accept: "text/plain",
                Token: token
            },
            params: {
                playlistId: playlistId
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

    shuffleTracks(token) {
        return this.client.request({
            method: "PATCH",
            url: "/queue/shuffle",
            headers: {
                Accept: "text/plain",
                Token: token
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

    currentTrack(token) {
        return this.client.request({
            method: "GET",
            url: "/queue/current",
            headers: {
                Accept: "text/plain",
                Token: token
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

    purgeQueue(token) {
        return this.client.request({
            method: "DELETE",
            url: "/queue",
            headers: {
                Accept: "text/plain",
                Token: token
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