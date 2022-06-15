import {UserClient} from "../api/UserClient.ts";
import {PlaylistClient, UserTracksClient} from "../api/UserTracksClient.ts";

export const TracksModuleUrl = "https://127.0.0.1:7153";

export const UserApiClient = new UserClient("https://127.0.0.1:7062");

export const UserTracksApiClient = new UserTracksClient("https://127.0.0.1:7055");

export const PlaylistApiClient = new PlaylistClient("https://127.0.0.1:7055");