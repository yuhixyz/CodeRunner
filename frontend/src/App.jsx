import CodeCard from './components/CodeCard';
import { Layout } from 'antd';

const { Footer } = Layout;

const App = () => {
    return (
        <div>
            <Layout>
                <CodeCard />
                <Footer style={{ textAlign: 'center' }}>
                    <a href='https://github.com/yuhixyz/CodeRunner'>Code Runner</a> ©{new Date().getFullYear()} Created by <a href='https://github.com/yuhixyz'>yuhixyz</a>
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
