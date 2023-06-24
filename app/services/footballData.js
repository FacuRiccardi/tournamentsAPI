const axios = require("axios");

const axiosOptions = {
  headers: {
    "X-Auth-Token": process.env.API_KEY,
  },
};

const getCompetitions = async () => {
  const response = await axios.get(
    `${process.env.URL}/v4/competitions`,
    axiosOptions
  );

  return response.data;
};

const getMatchesByCompetitionCode = async (code) => {
  const response = await axios.get(
    `${process.env.URL}/v4/competitions/${code}/matches`,
    axiosOptions
  );

  return response.data;
};

module.exports = { getCompetitions, getMatchesByCompetitionCode };
