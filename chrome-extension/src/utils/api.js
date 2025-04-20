import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // Update if needed

export const postVideoUrl = async (url) => {
    return axios.post(`${BASE_URL}/summarize`, {
        youtubeUrl: url,
    }, {
        responseType: "blob", // Important to receive PDF
    });
};
