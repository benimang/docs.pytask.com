import markdownItMark from 'markdown-it-mark'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Beni Docs",
    description: "A VitePress Site",
    lang: 'zh-Hans',

    head: [['link', { rel: 'icon', href: '/favicon.svg' }]],

    markdown: {
        image: {
            // 图片懒加载
            lazyLoading: true
        },
        config: (md) => {
            md.use(markdownItMark)  // 使用 ==高亮== 语法
        },
    },

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // nav: [
        //     { text: 'Home', link: '/' },
        //     { text: 'Examples', link: '/markdown-examples' }
        // ],

        logo: { src: '/favicon.svg', width: 24, height: 24 },

        // 右侧菜单标题深度展示
        outline: 'deep',

        sidebar: [
            {
                text: '技术资料',
                collapsed: true,
                items: [
                    { text: '常用网址', link: '/developer/website' },
                    { text: '证书文件', link: '/developer/certification' },
                    { text: '二步验证恢复资料', link: '/developer/recovery' },
                    { text: '镜像地址', link: '/developer/mirror' },
                    { text: 'VSCode 常用配置', link: '/developer/vscode' },
                    { text: 'UV', link: '/developer/uv' },
                    { text: '临时脚本', link: '/developer/scripts' },
                    {
                        text: 'Ubuntu',
                        collapsed: true,
                        items: [
                            { text: '环境搭建', link: '/developer/ubuntu/setup' },
                            { text: 'WSL2搭建', link: '/developer/ubuntu/wsl2' },
                        ],
                    },
                ],
            },
            {
                text: '亚马逊电商',
                collapsed: true,
                items: [
                    { text: '常量数据', link: '/amazon/const' },
                    { text: '敏感数据', link: '/amazon/secret' },
                    { text: '批量添加产品', link: '/amazon/add_batch' },
                ],
            },
            {
                text: '公司资料',
                collapsed: true,
                items: [
                    {
                        text: '研发后台',
                        items: [
                            { text: 'xcll - 消除来了', link: '/company/xcp/xcll' },
                            { text: 'xc01 - 消除01', link: '/company/xcp/xc01' },
                            { text: 'mtddp - 萌兔对对碰', link: '/company/xcp/mtddp' },
                            { text: 'hssh - 横扫山河', link: '/company/xcp/hssh' },
                            { text: 'tlxy - 屠龙仙缘（已废弃）', link: '/company/xcp/tlxy' },
                            { text: '通用资料', link: '/company/xcp/common' },
                        ],
                    },
                ],
            },
        ],

        // socialLinks: [
        //     { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        // ],

        // 本地搜索
        search: {
            provider: 'local',
        },

        // 屏蔽页面底部的上一篇和下一篇
        docFooter: {
            prev: false,
            next: false
        },

        // 页面底部显示最后更新时间
        lastUpdated: {},

    }
})
