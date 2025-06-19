import { DefaultTheme } from "vitepress";

export default [
    { text: '常用资源', link: 'common' },
    { text: '证书文件', link: 'certification' },
    { text: '二步验证恢复资料', link: 'recovery' },
    { text: '镜像地址', link: 'mirror' },
    { text: 'VSCode', link: 'vscode' },
    { text: 'UV', link: 'uv' },
    { text: '临时脚本', link: 'scripts' },
    {
        text: 'Ubuntu',
        collapsed: true,
        items: [
            { text: '环境搭建', link: 'ubuntu/setup' },
            { text: 'WSL2搭建', link: 'ubuntu/wsl2' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]