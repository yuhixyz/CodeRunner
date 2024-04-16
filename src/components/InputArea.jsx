import TextArea from "antd/es/input/TextArea"

const InputArea = (props) => {
    // eslint-disable-next-line react/prop-types
    const { inputText, handleInputChange } = props
    return (
        <>
            <h3>输入</h3>
            <TextArea
                placeholder="数据输入"
                autoSize={{
                    minRows: 1,
                    maxRows: 6,
                }}
                value={inputText}
                onChange={handleInputChange}
            />
            <div
                style={{
                    margin: '24px 0',
                }}
            />
        </>
    );
};
export default InputArea