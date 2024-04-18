import { Button, Card } from 'antd';
import InputArea from './InputArea';
import OutputArea from './OutputArea';
import runCode from '../services/code'
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ResultCard = ({ code, inputText, handleInputChange }) => {

    const [outputText, setOutputText] = useState('');
    const [resultType, setResultType] = useState('');

    const [isRunDisabled, setIsRunDisabled] = useState(false);


    const handleRunClick = async () => {
        setResultType('运行中')
        setIsRunDisabled(true)
        try {
            const resp = await runCode(code, inputText)
            setIsRunDisabled(false)
            setResultType(resp['type'])
            setOutputText(resp['data'])
        } catch (error) {
            setIsRunDisabled(false)
            setResultType(error.message)
        }
    }

    return (
        <Card title={`代码运行状态：${resultType ? resultType : '--'}`}
            extra={<Button type='primary' disabled={isRunDisabled} onClick={handleRunClick}>运行</Button>}>
            <InputArea
                inputText={inputText}
                handleInputChange={handleInputChange}
            />
            <OutputArea outputText={outputText} />
        </Card>
    )

}

export default ResultCard;