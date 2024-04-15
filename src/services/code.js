import axios from "axios"

const baseUrl = 'http://localhost:3001/api/code/run'

const runCode = async (code, inputText) => {
    const requestParam = {
        "code" : code,
        "inputText": inputText
    }
    const response = await axios.post(baseUrl, requestParam)
    return response.data
}


export default runCode