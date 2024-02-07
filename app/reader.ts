import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig from '../keystatic.config';

export const reader = createGitHubReader(keystaticConfig, {
    repo: 'Thinkmill/keystatic-data',
    token: process.env.GITHUB_PAT,
});