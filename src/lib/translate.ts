/**
 * Free translation via MyMemory API (https://mymemory.translated.net/)
 * No API key required for light usage; falls back to original text on errors.
 */
type TranslationResult =
  | { text: string; translated: boolean }
  | { text: string; translated: boolean; sourceLang: string };

export async function translateToEnglish(
  text: string
): Promise<TranslationResult> {
  if (!text) return { text, translated: false };

  try {
    const url = new URL('https://api.mymemory.translated.net/get');
    // Portuguese to English; MyMemory auto-detects, but we set it explicitly
    url.searchParams.set('q', text);
    url.searchParams.set('langpair', 'PT|EN');

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return { text, translated: false };
    const data = await res.json();
    const translatedRaw: unknown = data?.responseData?.translatedText;
    const translatedText =
      typeof translatedRaw === 'string' ? translatedRaw : undefined;
    const detectedRaw: unknown = data?.responseData?.detectedSourceLanguage;
    const sourceLang =
      typeof detectedRaw === 'string' ? detectedRaw.toUpperCase() : undefined;

    if (translatedText && translatedText !== text) {
      return sourceLang
        ? { text: translatedText, translated: true, sourceLang }
        : { text: translatedText, translated: true };
    }
    return sourceLang
      ? { text, translated: false, sourceLang }
      : { text, translated: false };
  } catch {
    return { text, translated: false };
  }
}
