import axios from 'axios'


export const loginAPI = async (token) => {
    const res = await axios.get("http://localhost:5000/signin", {
        headers: { Authorizaion: "Bearer " + token }
    })
    return res.data
}