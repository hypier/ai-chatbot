import { openai, createOpenAI } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

// 使用环境变量创建默认的 OpenAI 实例
const defaultOpenAI = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  compatibility: 'strict'
});

export const customModel = (apiIdentifier: string, customBaseURL?: string) => {
  // 如果提供了自定义 baseURL，创建新的实例
  const openaiInstance = customBaseURL
    ? createOpenAI({
        baseURL: customBaseURL,
        compatibility: 'strict'
      })
    : defaultOpenAI;

  return wrapLanguageModel({
    model: openaiInstance(apiIdentifier),
    middleware: customMiddleware,
  });
};
