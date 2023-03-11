import axios from 'axios'


export const loginAPI = async (token) => {
    const res = await axios.get("https://secondhandvinhome.herokuapp.com/api/auth/login", {
        headers: { Authorizaion: "Bearer " + token }
    })
    return res.data
}