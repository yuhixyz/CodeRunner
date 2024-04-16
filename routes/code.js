const express = require('express');
const codeRouter = express.Router();
const { exec } = require('child_process');

codeRouter.post('/run', (req, res) => {
    const code = req.body.code;
    const inputText = req.body.inputText;
    exec(`echo '${code}' > test.cpp && g++ test.cpp -o test`, (error, stdout, stderr) => {
        if (error) {
            res.send({ "success": false, "type": "Compile Error", "data": stderr }); // 编译错误时返回错误信息
        } else {
            // 运行编译后的可执行文件
            exec(`echo '${inputText}' > input.txt && ./test < input.txt`, (runError, runStdout, runStderr) => {
                if (runError) {
                    res.send({ "success": false, "type": runStderr, "data": stderr }); // 运行错误时返回错误信息
                } else {
                    res.send({ "success": true, "type": "Finished", "data": runStdout });
                }
            });
        }
    });
});

module.exports = codeRouter;
