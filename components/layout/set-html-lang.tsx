"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n/locales";

type SetHtmlLangProps = {
  locale: Locale;
};

export const SetHtmlLang = ({ locale }: SetHtmlLangProps) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
};
