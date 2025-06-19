import markdownItMark from 'markdown-it-mark'
import { defineConfig } from 'vitepress'

import navDeveloper from './nav/developer'
import navAmazon from './nav/amazon'
import navCompany from './nav/company'

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
        nav: [
            {
                text: '技术资料',
                link: '/developer/common',
                activeMatch: '/developer/',
            },
            {
                text: '亚马逊电商',
                link: '/amazon/const',
                activeMatch: '/amazon/',
            },
            {
                text: '公司资料',
                link: '/company/xcp/xcll',
                activeMatch: '/company/',
            },
        ],

        logo: { src: '/favicon.svg', width: 24, height: 24 },

        // 右侧菜单标题深度展示
        outline: 'deep',

        sidebar: {
            '/developer/': {
                base: '/developer/',
                items: navDeveloper,
            },
            '/amazon/': {
                base: '/amazon/',
                items: navAmazon,
            },
            '/company/': {
                base: '/company/',
                items: navCompany,
            },
        },

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

        footer: {
            copyright: 'Copyright © 2021-present Beni Mang'
        }

    }
})
