import { useEffect, useState } from "react"
import axios from "axios";

const GetPost = () => {
    const [postList, setPostList] = useState([]);
    // useEffect(() => {
    //     axios.get('https://secondhandvinhome.herokuapp.com/api/post/limit?page=1').
    //         then(function (response) {
    //             console.log(response.data);
    //             const { rows } = response.data.response;
    //             setPostList(rows);
    //         })

    useEffect(() => {
        axios.get('https://secondhandvinhome.herokuapp.com/api/post').
            then(function (response) {
                console.log(response.data);
                const { post } = response.data;
                setPostList(post);
            })

    }, []);
    return [postList];
}

export default GetPost;

