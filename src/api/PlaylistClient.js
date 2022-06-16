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