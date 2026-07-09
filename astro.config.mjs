// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";

/** @param {any} node */
function classList(node) {
    const className = node?.properties?.className;

    if (Array.isArray(className)) {
        return className;
    }

    return typeof className === 'string' ? className.split(/\s+/) : [];
}

/** @param {any} node */
function isReferencesNode(node) {
    return node?.type === 'element' && node.properties?.id === 'refs';
}

/** @param {any} node */
function isFootnotesNode(node) {
    return node?.type === 'element' && classList(node).includes('footnotes');
}

function moveReferencesAfterFootnotes() {
    /** @param {any} tree */
    return (tree) => {
        if (!Array.isArray(tree.children)) {
            return;
        }

        const referencesIndex = tree.children.findIndex(isReferencesNode);
        const footnotesIndex = tree.children.findIndex(isFootnotesNode);

        if (referencesIndex === -1 || footnotesIndex === -1 || referencesIndex > footnotesIndex) {
            return;
        }

        const [referencesNode] = tree.children.splice(referencesIndex, 1);
        const updatedFootnotesIndex = tree.children.findIndex(isFootnotesNode);
        tree.children.splice(updatedFootnotesIndex + 1, 0, referencesNode);
    };
}

// https://astro.build/config
export default defineConfig({
    site: 'https://glauz.ca',
    base: '/',

    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr'],
    },

    devToolbar: {
        enabled: true,
    },

    integrations: [
        mdx(),
        react(),
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en-US',
                    fr: 'fr-CA',
                },
            },
        })
    ],

    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
    processor: unified({
        remarkPlugins: [
            remarkMath
        ],
        rehypePlugins: [
            rehypeKatex,
            [
                rehypeCitation,
                {
                    bibliography: './src/contents/references.bib',
                    csl: 'apa',
                }
            ],
            moveReferencesAfterFootnotes,
        ],
    }),
    shikiConfig: {
        theme: 'github-dark',
        wrap: true,
    },
    }
});
