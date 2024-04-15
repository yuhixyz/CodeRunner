import { Button, Card } from 'antd';
import InputArea from './InputArea';
import OutputArea from './OutputArea';
import runCode from '../services/code'
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ResultCard = ({ code, inputText, handleInputChange }) => {

    const [outputText, setOutputText] = useState('');
    const [resultType, setResultType] = useState('');


    const handleRunClick = async () => {
        const resp = await runCode(code, inputText)
        setResultType(resp['type'])
        setOutputText(resp['data'])
        console.log(resp);
    }

    return (
        <Card title={`代码运行状态：${resultType}`} extra={<Button type='primary' onClick={handleRunClick}>运行</Button>}>
            <InputArea
                inputText={inputText}
                handleInputChange={handleInputChange}
            />
            <OutputArea outputText={outputText} />
        </Card>
    )

}

export default ResultCard;