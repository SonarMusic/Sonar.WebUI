import {ApiException} from "./ApiException";
import axios from "axios";

export default class PlaylistClient {
    constructor(baseUrl) {
        this.client = axios.create({
            baseURL: baseUrl
        });
    }

    getUserPlaylists(token) {
        return this.client.request({
            method: "GET",
            url: "/playlist/all",
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

    getPlaylist(token, playlistId) {
        return this.client.request({
            method: "GET",
            url: `/playlist/`,
            params: {
                playlistId: playlistId
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

    createPlaylist(token, playlistName) {
        return this.client.request({
            method: "POST",
            url: "/playlist/",
            headers: {
                Accept: "text/plain",
                Token: token
            },
            params: {
                name: playlistName
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

    addTrackToPlaylist(token, playlistId, trackId) {
        return this.client.request({
            method: "POST",
            url: `/playlist/track/`,
            headers: {
                Accept: "text/plain",
                Token: token
            },
            params: {
                playlistId: playlistId,
                trackId: trackId
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

    removeTrackFromPlaylist(token, playlistId, trackId) {
        return this.client.request({
            method: "DELETE",
            url: `/playlist/track/`,
            headers: {
                Accept: "text/plain",
                Token: token
            },
            params: {
                playlistId: playlistId,
                trackId: trackId
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