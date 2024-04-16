import { Card } from 'antd';
import AceEditor from 'react-ace'
import { Button } from 'antd/es/radio';
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/keybinding-vim'
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const CodeCard = ({ code, handleCodeChange }) => {
    const [keyboardHandler, setKeyboardHandler] = useState('vim')

    useEffect(() => {
       setKeyboardHandler(localStorage.getItem('keyboardHandler'))
    }, [])

    const inputModeSwitch = () => {
        if (keyboardHandler == 'vim') {
            setKeyboardHandler('standard')
            localStorage.setItem('keyboardHandler', 'standard')
        } else {
            setKeyboardHandler('vim')
            localStorage.setItem('keyboardHandler', 'vim')
        }
    }
    return (
        <Card title="Code Runner" extra={<Button onClick={inputModeSwitch}>{keyboardHandler}</Button>}>
            <AceEditor
                width='92vw'
                height='60vh'
                mode="c_cpp"
                name="my-editor"
                fontSize={14}
                value={code}
                onChange={handleCodeChange}
                keyboardHandler={keyboardHandler}
            />
        </Card>
    )
}

export default CodeCard