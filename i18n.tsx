import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Locale } from './types';

type TranslationValues = Record<string, string | number>;
type Translator = (key: keyof typeof messages.en, values?: TranslationValues) => string;

const STORAGE_KEY = 'crystalyze.locale';

const messages = {
  en: {
    'search.placeholder': 'Search crystal by name or property (e.g., Love, Protection)...',
    'nav.syncSource': 'Sync Source',
    'nav.syncing': 'Syncing...',
    'nav.toggleToZh': '中文',
    'nav.toggleToEn': 'EN',
    'nav.themeLight': 'Light',
    'nav.themeDark': 'Dark',
    'hero.titleLine1': 'Discover the Hidden',
    'hero.titleLine2': 'Vibrations of Earth',
    'hero.subtitle':
      'A meticulously organized guide to crystals, mineral types, and their metaphysical healing properties. Powered by advanced AI search for real-time clarity.',
    'banner.latestDiscovery': 'Latest Discovery from Source',
    'banner.close': 'Close',
    'section.featuredCrystals': 'Featured Crystals',
    'section.showingResults': 'Showing {count} results',
    'empty.noResults': 'No crystals found matching your search',
    'empty.clearSearch': 'Clear search',
    'footer.dataFrom': 'Data synthesized from',
    'footer.dataTail': '& other high-vibration sources.',
    'footer.explore': 'Explore',
    'footer.healing': 'Healing',
    'footer.about': 'About',
    'modal.hardness': 'Hardness',
    'modal.chakra': 'Chakra',
    'modal.element': 'Element',
    'modal.deepInsights': 'Deep Insights (Powered by AI)',
    'modal.consulting': 'Consulting the cosmic database...',
    'modal.sourcesFound': 'Sources Found',
    'modal.noAiData': 'No AI insights available for now.',
    'common.na': 'N/A',
    'common.earth': 'Earth',
    'errors.syncFailed': 'Failed to sync with source site.',
    'errors.fetchFailed': 'Failed to fetch crystal data. Please try again.',
  },
  'zh-CN': {
    'search.placeholder': '按名称或功效搜索水晶（例如：爱情、守护）…',
    'nav.syncSource': '同步来源',
    'nav.syncing': '同步中…',
    'nav.toggleToZh': '中文',
    'nav.toggleToEn': 'EN',
    'nav.themeLight': '日间',
    'nav.themeDark': '夜间',
    'hero.titleLine1': '探索大地深处',
    'hero.titleLine2': '隐藏的振动频率',
    'hero.subtitle':
      '一份系统整理的水晶与矿物指南，涵盖类别与身心灵疗愈属性。由 AI 搜索增强，带来更清晰的实时信息。',
    'banner.latestDiscovery': '来自来源站点的最新发现',
    'banner.close': '关闭',
    'section.featuredCrystals': '精选水晶',
    'section.showingResults': '共 {count} 条结果',
    'empty.noResults': '没有找到符合搜索条件的水晶',
    'empty.clearSearch': '清空搜索',
    'footer.dataFrom': '数据综合自',
    'footer.dataTail': '等高频来源。',
    'footer.explore': '探索',
    'footer.healing': '疗愈',
    'footer.about': '关于',
    'modal.hardness': '硬度',
    'modal.chakra': '脉轮',
    'modal.element': '元素',
    'modal.deepInsights': '深度解读（AI 驱动）',
    'modal.consulting': '正在查询资料库…',
    'modal.sourcesFound': '参考来源',
    'modal.noAiData': '暂时没有可用的 AI 解读。',
    'common.na': '暂无',
    'common.earth': '大地',
    'errors.syncFailed': '同步来源站点失败。',
    'errors.fetchFailed': '获取水晶信息失败，请稍后重试。',
  },
} as const satisfies Record<Locale, Record<string, string>>;

function normalizeLocale(input?: string | null): Locale {
  const value = (input || '').toLowerCase();
  if (value.startsWith('zh')) return 'zh-CN';
  return 'en';
}

function formatMessage(template: string, values?: TranslationValues): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translator;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved) return normalizeLocale(saved);
    const browser = typeof navigator !== 'undefined' ? navigator.language : undefined;
    return normalizeLocale(browser);
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback<Translator>(
    (key, values) => {
      const template = messages[locale][key] ?? messages.en[key];
      return formatMessage(template, values);
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
