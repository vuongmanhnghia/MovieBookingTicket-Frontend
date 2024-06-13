import axios from "../axios";

const createNewScreenService = (data) => {
	return axios.post("/api/create-new-screen", data);
};

const getAllScreensService = () => {
	return axios.get("/api/get-all-screens");
};

export { createNewScreenService, getAllScreensService };
