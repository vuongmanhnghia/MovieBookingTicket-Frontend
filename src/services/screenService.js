import axios from "../axios";

const createNewScreenService = (data) => {
	return axios.post("/api/create-new-screen", data);
};

const getAllScreensService = (cinemaId) => {
	return axios.get(`/api/get-detail-screen?cinemaId=${cinemaId}`);
};

export { createNewScreenService, getAllScreensService };
