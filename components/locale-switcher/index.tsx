import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './locale-switcher';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          code: 'gb',
          label: t('en')
        },
        {
          value: 'ar',
          code: 'sa',
          label: t('ar')
        }
      ]}
    />
  );
}