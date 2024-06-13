import axios from "../axios";

const createNewCinemaService = (data) => {
	return axios.post("/api/create-new-cinema", data);
};

const getAllCinemasService = () => {
	return axios.get("/api/get-all-cinemas");
};

const getDetailCinemaService = (id) => {
	return axios.get(`/api/get-detail-cinema?id=${id}`);
};

export { createNewCinemaService, getDetailCinemaService, getAllCinemasService };
