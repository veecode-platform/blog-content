import keystaticConfig from '../keystatic.config';
import { createGitHubReader } from '@keystatic/core/reader/github';

export const reader = createGitHubReader(keystaticConfig, {
    repo: 'veecode-platform/blog',
    token: process.env.GITHUB_PAT,
});