import { A } from '@expo/html-elements';
import { Card } from '@rneui/themed';
import { useTranslation } from '../../../../hooks';

export default function OpenSource() {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Title>{t('openSource!title')}</Card.Title>
      <Card.Divider></Card.Divider>
      <A href="https://github.com/mushroom-cn/mommy-watch/blob/main/README.md">
        {t('openSource!detail')}
      </A>
    </Card>
  );
}
