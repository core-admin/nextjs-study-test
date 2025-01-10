import { useTranslation } from '@/i18n';

export default async function Page({ params }) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'note');

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t('emptyPreview')}</span>
    </div>
  );
}
