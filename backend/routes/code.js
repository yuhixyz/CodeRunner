const express = require('express');
const codeRouter = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { clearTimeout } = require('timers');
const jwt = require('jsonwebtoken');

const getToken = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
};

codeRouter.post('/run', (req, res) => {
    const token = getToken(req);
    console.log(token);
    const secretKey = process.env.SECRET;
    try {
        const decodedToken = jwt.verify(token, secretKey);
        if (!decodedToken.id) {
            res.status(401).json({ error: "invalid token1" });
            // res.redirect('/api/user/login');
            return;
        }
    } catch (exception) {
        // console.log(exception.message);
        res.status(401).json({ error: "invalid token2" });
        // res.redirect('/api/user/login');
        return;
    }

    const code = req.body.code ? req.body.code : '';
    const inputText = req.body.inputText ? req.body.inputText : '';
    const baseUrl = path.join('source_cpp_codes');
    if (!fs.existsSync(baseUrl)) fs.mkdirSync(baseUrl);
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    const filename = ip.toString();
    const sourceCodePath = path.join(baseUrl, filename + '.cpp')
    const inputTextPath = path.join(baseUrl, filename + '.txt')

    const fileObjects = {}
    fileObjects[sourceCodePath] = code;
    fileObjects[inputTextPath] = inputText

    // 异步写入多个文件
    const promises = []

    Object.entries(fileObjects).forEach(([filePath, fileContent]) => {
        const promise = new Promise((resolve, reject) => {
            fs.writeFile(filePath, fileContent, 'utf-8', (err) => {
                if (err) {
                    reject(`写入文件 ${filePath} 时出错: ${err}`);
                } else {
                    resolve(`文件 ${filePath} 写入成功`);
                }
            });
        });
        promises.push(promise);
    });

    Promise.all(promises)
        .then((successMessage) => {
            console.log('所有文件写入成功');
            successMessage.forEach(msg => {
                console.log(msg);
            });

            let isResponseSent = false;

            // 限制编译2s
            const compileTimer = setTimeout(() => {
                compileChild.kill('SIGKILL');
                res.json({ "success": false, "type": "Compile Error", "data": "Compiler exceeded time limit" });
                isResponseSent = true
            }, 2000);

            // 编译
            const compileChild = exec(`g++ ${sourceCodePath} -o ${baseUrl}/${filename}`, (error, stdout, stderr) => {
                clearTimeout(compileTimer);
                if (error) {
                    if (!isResponseSent) {
                        res.json({ "success": false, "type": "Compile Error", "data": error.message }); // 编译错误时返回错误信息
                    }
                } else {
                    // 限制运行3s
                    const runTimer = setTimeout(() => {
                        runChild.kill('SIGKILL');
                        if (!isResponseSent) {
                            isResponseSent = true;
                            res.json({ "success": false, "type": "Time Limit Exceeded", "data": "" })
                        }
                    }, 3000);

                    // 运行
                    const runChild = exec(`${baseUrl}/${filename} < ${inputTextPath}`, (runError, runStdout, runStderr) => {
                        clearTimeout(runTimer);
                        if (runError) {
                            console.log(runError);
                            let errorType = 'Runtime Error'
                            if (runError.message == 'stdout maxBuffer length exceeded') {
                                errorType = 'Output Limit Exceeded'
                            }
                            if (!isResponseSent) {
                                res.json({ "success": false, "type": errorType, "data": runStderr }); // 运行错误时返回错误信息
                            }
                        } else {
                            if (!isResponseSent) {
                                res.json({ "success": true, "type": "Finished", "data": runStdout });
                            }
                        }
                    });
                }
            });
        })
        .catch((err) => {
            console.error('写入文件出错', err);
        })
});

module.exports = codeRouter;
