const express = require('express');
const codeRouter = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path')

codeRouter.post('/run', (req, res) => {
    const code = req.body.code ? req.body.code : '';
    const inputText = req.body.inputText ? req.body.inputText : '';
    const baseUrl = path.join('source_cpp_codes');
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

            exec(`g++ ${sourceCodePath} -o ${baseUrl}/${filename}`, (error, stdout, stderr) => {
                if (error) {
                    res.send({ "success": false, "type": "Compile Error", "data": stderr }); // 编译错误时返回错误信息
                } else {
                    // 运行编译后的可执行文件
                    exec(`${baseUrl}/${filename} < ${inputTextPath}`, (runError, runStdout, runStderr) => {
                        if (runError) {
                            console.log(runError);
                            res.send({ "success": false, "type": runStderr, "data": stderr }); // 运行错误时返回错误信息
                        } else {
                            res.send({ "success": true, "type": "Finished", "data": runStdout });
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
