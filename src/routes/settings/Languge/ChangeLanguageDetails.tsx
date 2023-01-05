import { useNavigation } from '@react-navigation/native';
import { BottomSheet, ListItem } from '@rneui/themed';
import { useTranslation, useSetState, useLocalFile } from '../../../hooks';
import i18next from 'i18next';
import { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Setting } from '../interface';
import { Icon } from '../../../component';
const CONFIG_FILE_PATH = 'conf.json';
export function ChangeLanguageDetails() {
  const { t } = useTranslation();
  const [{ visible }, setState] = useSetState<{
    visible: boolean;
  }>({
    visible: true,
  });
  const navigate = useNavigation();
  const [{ lang }, setFileContent] = useLocalFile<Setting>({
    file: CONFIG_FILE_PATH,
  });
  const onClose = useCallback(() => {
    setState({ visible: false });
    navigate.goBack();
  }, [setState, navigate]);

  const onLanguageChange = useCallback(
    (lang: string) => {
      i18next.changeLanguage(lang);
      onClose();
      setFileContent({ lang });
    },
    [onClose, setFileContent]
  );
  const list = useMemo(() => {
    return [
      {
        key: 'zh',
        title: t('languageZh'),
        onPress: () => {
          onLanguageChange('zh');
        },
      },
      {
        key: 'en',
        title: t('languageEn'),
        onPress: () => {
          onLanguageChange('en');
        },
      },
    ];
  }, [t, onLanguageChange]);

  return (
    <SafeAreaView>
      <BottomSheet
        modalProps={{}}
        isVisible={visible}
        onBackdropPress={onClose}
      >
        {list.map(({ key, title, onPress }) => (
          <ListItem key={key} onPress={onPress}>
            <ListItem.Content>
              <ListItem.Title>{title}</ListItem.Title>
            </ListItem.Content>
            {lang == key && <Icon name="checkmark-outline" />}
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
}
