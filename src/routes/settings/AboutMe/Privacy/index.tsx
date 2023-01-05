import { Card, Text } from '@rneui/themed';
import { useTranslation } from '../../../../hooks';
export default function Privacy() {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Title>{t('privacy')}</Card.Title>
      <Card.Divider></Card.Divider>
      <Text>
        {t('aboutMeDetails', {
          link: 'https://github.com/mushroom-cn/mommy-watch/blob/main/README.md',
        })}
      </Text>
    </Card>
  );
}
