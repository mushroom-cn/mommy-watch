import { CONFIG_FILE_PATH } from '../../../config';
import { useLocalFile } from '../../../hooks';
import json5 from 'json5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
export function ConfigFilePath() {
  const [content] = useLocalFile({ file: CONFIG_FILE_PATH });
  return (
    <SafeAreaView>
      <Text>{json5.stringify(content, undefined, 4)}</Text>
    </SafeAreaView>
  );
}
