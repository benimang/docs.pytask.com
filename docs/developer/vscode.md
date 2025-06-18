# VSCode

## settings.json

``` json
{
    // only user settings
    "window.menuBarVisibility": "classic", // 顶部中间
    "window.restoreWindows": "none",
    // "http.proxy": "http://localhost:15236",
    // common ------------------------------------------------------------------------------------
    // "breadcrumbs.enabled": false, // 代码顶部导航
    "security.workspace.trust.enabled": false,
    "redhat.telemetry.enabled": false,
    "workbench.startupEditor": "none",
    "files.eol": "\n",
    "explorer.autoReveal": false, // 取消文件自动定位跟踪
    "editor.renderWhitespace": "none", // 不高亮显示空白
    "editor.unicodeHighlight.allowedLocales": { 
        // 注释里的全角符号不提示警告
        "zh-hans": true,
        "zh-hant": true,
    },
    "git.openRepositoryInParentFolders": "never",
    "workbench.colorTheme": "Default Dark+",
    "editor.stickyScroll.enabled": false,
    "workbench.editor.enablePreview": false,
    "window.commandCenter": false,
    "editor.inlineSuggest.enabled": true,
    "[markdown]": {
        "editor.defaultFormatter": "yzhang.markdown-all-in-one",
        "editor.wordWrap": "off",
    },
    // github.copilot -----------------------------------------------------------------------------
    "github.copilot.nextEditSuggestions.enabled": true,
    "github.copilot.editor.enableAutoCompletions": true,
    "github.copilot.chat.localeOverride": "zh-CN",
    "github.copilot.enable": {
        "*": true,
        "plaintext": true,
        "markdown": true,
        "scminput": false,
        "yaml": true
    },
    // python -------------------------------------------------------------------------------------
    "python.languageServer": "Pylance",
    "python.analysis.autoImportCompletions": true,
    "python.analysis.diagnosticMode": "workspace", // 针对整个workspace做检查提示
    "python.analysis.typeCheckingMode": "strict",
    "[python]": {
        "editor.defaultFormatter": "ms-python.autopep8",
    },
    "autopep8.args": [
        "--ignore=E501",
    ],
    "python.testing.pytestArgs": [
        "test", // 指定单元测试查找的目录
        "-s" // 支持print输出
    ],
    "python.testing.unittestEnabled": false,
    "python.testing.pytestEnabled": false,
    "python.analysis.diagnosticSeverityOverrides": {
        "reportMissingTypeStubs": "none",
        "reportUnknownMemberType": "none",
        "reportUnknownParameterType": "none",
        "reportUnknownVariableType": "none",
        "reportUnknownArgumentType": "none",
        "reportMatchNotExhaustive": "none", // match 没有匹配所有，会提示添加一个 _
        // "reportUnusedCallResult": "warning",
        "reportUnusedClass": "warning",
        "reportUnusedCoroutine": "warning",
        "reportUnusedFunction": "warning",
        "reportUnusedImport": "warning",
        "reportUnusedVariable": "warning",
        "reportImportCycles": "warning",
    },
    // go -----------------------------------------------------------------------------------------
    "[go]": {
        "editor.formatOnSave": false,
        "editor.codeActionsOnSave": {
            "source.organizeImports": "never"
        }
    },
    "go.formatTool": "gofmt",
    "go.toolsEnvVars": {
        "GOPROXY": "https://goproxy.cn,direct",
        "GONOPROXY": "none;"
    },
    // ts
    "typescript.tsserver.experimental.enableProjectDiagnostics": true,
    // vue ----------------------------------------------------------------------------------------
    "[vue]": {
        "editor.defaultFormatter": "Vue.volar"
    },
}
```


## keybindings.json

``` json
// Place your key bindings in this file to override the defaultsauto[]
[
    {
        "key": "alt+/",
        "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && textInputFocus && !editorReadonly"
    },
    {
        "key": "ctrl+shift+f",
        "command": "workbench.action.findInFiles"
    },
    {
        "key": "ctrl+; c",
        "command": "testing.clearTestResults"
    },
    {
        "key": "ctrl+shift+alt+u",
        "command": "editor.action.transformToUppercase"
    },
    {
        "key": "ctrl+shift+alt+l",
        "command": "editor.action.transformToLowercase"
    },
    {
        "key": "ctrl+alt+r",
        "command": "workbench.action.tasks.runTask"
    },
    {
        "key": "alt+delete",
        "command": "workbench.output.action.clearOutput"
    },
    // {
    //     "key": "alt+d",
    //     "command": "workbench.action.tasks.showTasks"
    // },
    {
        "key": "alt+d",
        "command": "workbench.action.terminal.kill"
    }
    // {
    //     "key": "ctrl+enter",
    //     "command": "workbench.action.tasks.runTask",
    //     "args": "compile2"
    // },
    // {
    //     "key": "ctrl+shift+enter",
    //     "command": "workbench.action.tasks.runTask",
    //     "args": "compile"
    // }
]
```


## 插件

``` shell
# 打印当前所有安装的插件
code --list-extensions
```

``` text:line-numbers
alibaba-cloud.tongyi-lingma
antfu.unocss
bmewburn.vscode-intelephense-client
cipchk.cssrem
dbaeumer.vscode-eslint
egretengine.coder
esbenp.prettier-vscode
golang.go
gruntfuggly.todo-tree
leechaojiang.px-to-vw
mechatroner.rainbow-csv
ms-dotnettools.vscode-dotnet-runtime
ms-python.autopep8
ms-python.debugpy
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-toolsai.jupyter
ms-toolsai.jupyter-keymap
ms-toolsai.jupyter-renderers
ms-toolsai.vscode-jupyter-cell-tags
ms-toolsai.vscode-jupyter-slideshow
ms-vscode.powershell
ms-vscode.vscode-speech
redhat.vscode-yaml
rvest.vs-code-prettier-eslint
tamasfe.even-better-toml
vue.volar
xdebug.php-debug
yzhang.markdown-all-in-one
zxh404.vscode-proto3
```


## snippets

### python.json
``` json
{
    // Place your snippets for python here. Each snippet is defined under a snippet name and has a prefix, body and
    // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
    // same ids are connected.
    // Example:
    // "Print to console": {
    //   "prefix": "log",
    //   "body": [
    //     "console.log('$1');",
    //     "$2"
    //   ],
    //   "description": "Log output to console"
    // }
    "test code": {
        "prefix": "teststart",
        "body": [
            "# test start",
            "$1",
            "# test end",
        ],
        "description": "生成一个测试代码段"
    },

    "asyncio main.py":{
        "prefix": "mainfile",
        "body": [
            "import asyncio",
            "",
            "async def main():",
            "    pass$1",
            "",
            "asyncio.run(main())",
        ],
        "description": "生成一个main.py的代码段"
    },

    "pytest async function":{
        "prefix": "pytestasync",
        "body": [
            "@pytest.mark.asyncio",
            "async def test_$1():",
            "    pass",
        ],
        "description": "生成一个pytest异步函数的代码段"
    },

    "sepearte line":{
        "prefix": "sepline",
        "body": [
            "",
            "# ------------------------------------------------------------------------------------",
            "",
        ],
        "description": "生成一个分割线"
    },
}
```

### javascript.json
``` json
{
    "Print to console": {
        "prefix": "teststart",
        "body": [
            "// test start $1",
            "$2",
            "// test end",
        ],
        "description": "生成一个测试代码段"
    }
}
```

### typescript.json
``` json
{
    "test code": {
        "prefix": "teststart",
        "body": [
            "// test start",
            "$1",
            "// test end",
        ],
        "description": "生成一个测试代码段"
    },
}
```

### vue.json
``` json
{
    "vue template": {
        "prefix": "vuetemplate",
        "body": [
            "<template>",
            "$1",
            "</template>",
            "",
            "<script lang=\"ts\" setup>",
            "",
            "</script>",
        ],
        "description": "生成一个测试代码段"
    },
}
```

## 快捷键

`CTRL + SHIFT + O` 跳转到指定的函数

`CTRL + SHIFT + P` 命令面板

`CTRL + SHIFT + I` AI 代码

`CTRL + ALT + R` 执行任务（自定义快捷键）

`CTRL + R` 打开目录

`CTRL + P` 打开文件
