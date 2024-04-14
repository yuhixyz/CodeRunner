import { useState } from "react"
import TextArea from "antd/es/input/TextArea"

const OutputArea = () => {
    const [outputText, setOutputText] = useState('')
    return (
        <>
            <h3>输出</h3>
            <TextArea
                placeholder=""
                autoSize={{
                    minRows: 1,
                    maxRows: 6,
                }}
                readOnly
                value={outputText}
                onChange={e => setOutputText(e.target.value)}
            />
            <div
                style={{
                    margin: '24px 0',
                }}
            />
            {outputText}
        </>
    );
};
export default OutputArea