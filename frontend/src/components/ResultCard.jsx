import { Button, Card } from 'antd';
import InputArea from './InputArea';
import OutputArea from './OutputArea';
import runCode from '../services/code'
import { useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';

// eslint-disable-next-line react/prop-types
const ResultCard = ({ code, input, handleInputChange }) => {

    const [output, setOutput] = useState('');
    const [resultType, setResultType] = useState('');

    const [isRunDisabled, setIsRunDisabled] = useState(false);


    const handleRunClick = async () => {
        setResultType(<SyncOutlined spin twoToneColor="#52c41a"/>)
        setIsRunDisabled(true)
        try {
            const resp = await runCode(code, input)
            setIsRunDisabled(false)
            setResultType(resp['type'])
            setOutput(resp['data'])
        } catch (error) {
            setIsRunDisabled(false)
            setResultType(error.message)
        }
    }

    const CodeRunningStatus = () => {
        return (
            <div>代码运行状态：{resultType ? resultType : '未提交'}</div>
        );
    }
    return (
        <Card title={<CodeRunningStatus/>}
            extra={<Button type='primary' disabled={isRunDisabled} onClick={handleRunClick}>运行</Button>}>
            <InputArea
                input={input}
                handleInputChange={handleInputChange}
            />
            <OutputArea output={output} />
        </Card>
    )

}

export default ResultCard;