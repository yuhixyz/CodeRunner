import axios from "axios"

const baseUrl = process.env.NODE_ENV == 'dev' ?
    'http://localhost:3001/api/code/run'
    : '/api/code/run';

const runCode = async (code, inputText) => {
    const requestParam = {
        "code": code,
        "inputText": inputText
    }
    const response = await axios.post(baseUrl, requestParam, {
        timeout: 5000
    })
    return response.data
}


export default runCode