import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.REACT_APP_URL_BACKEND
