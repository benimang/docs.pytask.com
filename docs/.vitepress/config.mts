import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "My Awesome Project",
    description: "A VitePress Site",
    lang: 'zh-Hans',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // nav: [
        //     { text: 'Home', link: '/' },
        //     { text: 'Examples', link: '/markdown-examples' }
        // ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ]
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

    }
})
