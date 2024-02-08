import keystaticConfig from '../keystatic.config';
import { createGitHubReader } from '@keystatic/core/reader/github';

export const reader = createGitHubReader(keystaticConfig, {
    repo: 'veecode-platform/blog-static',
    token: process.env.GITHUB_PAT,
});