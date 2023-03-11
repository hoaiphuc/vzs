import axios from 'axios'


export const loginAPI = async (token) => {
    const res = await axios.post("https://secondhandvinhome.herokuapp.com/api/auth/login", {
        body: { token: "Bearer " + token }
    })
    return res.data
}