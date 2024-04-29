import axios from "axios";

const baseUrl = process.env.NODE_ENV == 'dev' ?
    'http://localhost:3001/api/code/run'
    : '/api/code/run';

const runCode = async (code, inputText) => {
    const token = localStorage.getItem('userToken');
    // console.log(token);
    if (!token) {
        return {
            'success': 'false',
            'type': '未登录或登录已过期',
            'data': null
        };
    }

    const requestParam = {
        "code": code,
        "inputText": inputText
    };
    // console.log(requestParam);
    const response = await axios.post(baseUrl, requestParam, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        timeout: 5000
    });
    return response.data;
};


export default runCode;