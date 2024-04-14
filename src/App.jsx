import { useEffect, useState } from 'react'
import ResultCard from './components/ResultCard'
import CodeCard from './components/CodeCard'
import { Divider } from 'antd'

const App = () => {
    const [code, setCode] = useState('')
    const [inputText, setInputText] = useState('')
    const [ouputText, setOutputText] = useState('')

    useEffect(() => {
        setCode(localStorage.getItem('code'))
        setInputText(localStorage.getItem('inputText'))
    }, [])

    const handleCodeChange = (newValue) => {
        setCode(newValue)
        localStorage.setItem('code', newValue)
    }

    const handleInputChange = e => {
        setInputText(e.target.value)
        localStorage.setItem('inputText', e.target.value)
    }

    return (
        <div>
            <CodeCard
                code={code}
                handleCodeChange={handleCodeChange}
            />
            <Divider />
            <ResultCard
                inputText={inputText}
                ouputText={ouputText}
                handleInputChange={handleInputChange}
            />
        </div>
    )
}

export default App
