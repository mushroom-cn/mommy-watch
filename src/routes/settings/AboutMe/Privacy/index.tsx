import { A } from '@expo/html-elements';
import { Card } from '@rneui/themed';
import { useTranslation } from '../../../../hooks';
export default function Privacy() {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Title>{t('privacy!title')}</Card.Title>
      <Card.Divider></Card.Divider>
      <A href="https://github.com/mushroom-cn/mommy-watch/blob/main/PRIVACY.md">
        {t('privacy!details')}
      </A>
    </Card>
  );
}
