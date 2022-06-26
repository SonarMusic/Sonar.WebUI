import UserClient from "../api/UserClient";
import UserTracksClient from "../api/UserTracksClient";
import PlaylistClient from "../api/PlaylistClient";
import RelationshipsClient from "../api/RelationshipsClient";

export const TracksModuleUrl = "https://localhost:7153";

export const UserApiClient = new UserClient("https://localhost:7062");

export const RelationshipsApiClient = new RelationshipsClient("https://localhost:7062");

export const UserTracksApiClient = new UserTracksClient("https://localhost:7055");

export const PlaylistApiClient = new PlaylistClient("https://localhost:7055");