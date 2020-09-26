import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://hapi.fhir.org/baseR4",
});

export const getPatients = (name, dob) => {
  let requestUrl = "/Patient";
  if (name || dob) {
    requestUrl += "?name=" + name + "&birthdate=" + dob 
  }
  return axios.get(requestUrl);
};

export const getPractitioners = () => {
  return axios.get("/Practitioner");
};
