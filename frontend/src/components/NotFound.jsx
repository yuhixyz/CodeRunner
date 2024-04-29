import { Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <Result
        status="404"
        title="404"
        subTitle="页面不存在"
        extra={<Link to='/' >回到主页</Link>}
    />
);
export default NotFound;