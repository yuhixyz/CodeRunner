import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const initalDropdownItems = [
    
];

const DropdownItem = () => {
    const [dropdownItems, setDropdownItems] = useState(initalDropdownItems);

    // const handleLogout = () => {

    // };

    return (
        <Dropdown
            menu={{ dropdownItems }}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Click me
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropdownItem;