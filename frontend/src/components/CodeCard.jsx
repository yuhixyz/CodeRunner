import { Card } from 'antd';
import { Button } from 'antd/es/radio';
import { useEffect, useState } from 'react';
import TabsPage from './TabsPage';

// eslint-disable-next-line react/prop-types
const CodeCard = () => {
    const [keyboardHandler, setKeyboardHandler] = useState('')

    useEffect(() => {
        const localKeyboardHandler = localStorage.getItem('keyboardHandler');
        setKeyboardHandler(localKeyboardHandler);
    }, []);

    const inputModeSwitch = () => {
        if (keyboardHandler === 'vim') {
            setKeyboardHandler('')
            localStorage.setItem('keyboardHandler', '')
        } else {
            setKeyboardHandler('vim')
            localStorage.setItem('keyboardHandler', 'vim')
        }
    }
    return (
        <Card title="Code Runner"
            extra={
                <Button onClick={inputModeSwitch}>{keyboardHandler ? keyboardHandler : 'Standard'}</Button>
            }>
            <TabsPage keyboardHandler={keyboardHandler} />
        </Card>
    )
}

export default CodeCard
