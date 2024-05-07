import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Result
            status="404"
            title="404"
            subTitle="页面不存在"
            extra={<Link to='/' >回到主页</Link>}
        />
    );
};

export default NotFound;