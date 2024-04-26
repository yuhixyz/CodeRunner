import { Divider, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import ResultCard from './ResultCard';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/keybinding-vim';

const initialContents = [
    {
        id: "1",
        label: "Tab 1",
        code: "",
        input: ""
    },
    {
        id: "2",
        label: "Tab 2",
        code: "",
        input: ""
    },
    {
        id: "3",
        label: "Tab 3",
        code: "",
        input: ""
    },
    {
        id: "4",
        label: "Tab 4",
        code: "",
        input: ""
    },
    {
        id: "5",
        label: "Tab 5",
        code: "",
        input: ""
    },
];

// eslint-disable-next-line react/prop-types
const TabsPage = ({ keyboardHandler }) => {
    const [activeKey, setActiveKey] = useState('1');
    const [items, setItems] = useState();

    const [tabContents, setTabContents] = useState(initialContents);

    const handleInputChange = (newInput, id) => {
        // const newInput = e.target.value;
        const newTabContents = tabContents.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    input: newInput
                };
            }
            return item;
        });
        setTabContents(newTabContents);
        localStorage.setItem('tabContents', JSON.stringify(newTabContents));
    };

    const handleCodeChange = (newCode, id) => {
        const newTabContents = tabContents.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    code: newCode
                };
            }
            return item;
        }
        );
        setTabContents(newTabContents);
        localStorage.setItem('tabContents', JSON.stringify(newTabContents));
    };

    useEffect(() => {
        const localActiveKey = localStorage.getItem('activeKey');
        if (localActiveKey) setActiveKey(localActiveKey);

        const localTabContens = JSON.parse(localStorage.getItem('tabContents'));
        if (localTabContens) setTabContents(localTabContens);
        else setTabContents(initialContents);
    }, []);

    useEffect(() => {
        const newTabContents = tabContents.map(item => {
            const code = item.code;
            const input = item.input;
            const id = item.id;

            const children = (
                <>
                    <AceEditor
                        keyboardHandler={keyboardHandler}
                        value={code}
                        onChange={(newCode) => handleCodeChange(newCode, id)}
                        width='100%'
                        height='60vh'
                        mode="c_cpp"
                        name="my-editor"
                        fontSize={14}
                    />
                    <Divider />
                    <ResultCard code={code} input={input} handleInputChange={e => handleInputChange(e, id)} />
                </>
            );

            return {
                label: item.label,
                key: item.id,
                children: children
            };
        });

        setItems(newTabContents);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabContents, keyboardHandler]);


    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
        localStorage.setItem('activeKey', newActiveKey);
    };

    return (
        <Tabs
            type="line"
            activeKey={activeKey}
            onChange={onChange}
            items={items}
        />
    );
};

export default TabsPage;