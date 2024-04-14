import { Button, Card } from 'antd';
import InputArea from './InputArea';
import OutputArea from './OutputArea';

// eslint-disable-next-line react/prop-types
const ResultCard = ({ inputText, outputText, handleInputChange }) => (
    <Card title="代码运行状态" extra={<Button type='primary'>运行</Button>}>
        <InputArea
            inputText={inputText}
            handleInputChange={handleInputChange}
        />
        {outputText}
        <OutputArea />
    </Card>
);
export default ResultCard;