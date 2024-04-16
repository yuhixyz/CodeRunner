import { Card } from 'antd';
import AceEditor from 'react-ace'
import { Button } from 'antd/es/radio';
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/keybinding-vim'
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const CodeCard = ({ code, handleCodeChange }) => {
    const [keyboardHandler, setKeyboardHandler] = useState('vim')
    const [mode, setMode] = useState('Vim')

    useEffect(() => {
        const localKeyboardHandler = localStorage.getItem('keyboardHandler')
        setKeyboardHandler(localKeyboardHandler ? localKeyboardHandler : 'vim')
    }, [])

    const inputModeSwitch = () => {
        if (keyboardHandler == 'vim') {
            console.log(keyboardHandler)
            setKeyboardHandler('')
            setMode('Standard')
            localStorage.setItem('keyboardHandler', '')
        } else {
            console.log(keyboardHandler)
            setKeyboardHandler('vim')
            setMode('Vim')
            localStorage.setItem('keyboardHandler', 'vim')
        }
    }
    return (
        <Card title="Code Runner" extra={<Button onClick={inputModeSwitch}>{mode}</Button>}>
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