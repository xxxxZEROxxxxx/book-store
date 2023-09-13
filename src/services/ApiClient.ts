import axios from "axios";
export const baseUrl: string = "http://wfatairreact-001-site1.ctempurl.com";

export default axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    Authorization: "bearer " + localStorage.getItem("access_token"),
  },
});
