import CodeCard from './components/CodeCard';
import { Layout } from 'antd';

const { Footer, Content } = Layout;

const App = () => {
    return (
        <div>
            <Layout>
                <Content style={{ padding: '20px 20px 0 20px', }}>
                    <CodeCard />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <a href='https://github.com/yuhixyz/CodeRunner'>Code Runner</a> ©{new Date().getFullYear()} Created by <a href='https://github.com/yuhixyz'>yuhixyz</a>
                </Footer>
            </Layout>
        </div >
    );
};

export default App;
