import TextArea from "antd/es/input/TextArea"

// eslint-disable-next-line react/prop-types
const OutputArea = ({ output }) => {

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
                value={output}
            />
            <div
                style={{
                    margin: '24px 0',
                }}
            />
        </>
    );
};
export default OutputArea