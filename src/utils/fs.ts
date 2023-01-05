import {
  cacheDirectory,
  EncodingType,
  getInfoAsync,
  readAsStringAsync,
  StorageAccessFramework,
  writeAsStringAsync,
} from 'expo-file-system';
import Toast from 'react-native-root-toast';
Toast.show(cacheDirectory || ' no', { duration: 3 * 1000 });

async function createIfNotFound(file: string, mimeType: string) {
  const fileInfo = await getInfoAsync(file);
  if (!fileInfo.exists) {
    const { granted } =
      await StorageAccessFramework.requestDirectoryPermissionsAsync(
        cacheDirectory
      );
    if (granted) {
      await StorageAccessFramework.createFileAsync(
        cacheDirectory as string,
        file,
        mimeType
      );
    } else {
      Toast.show('Request failed to send.', {
        duration: Toast.durations.LONG,
        animation: true,
        shadow: true,
      });
    }
  }
}

export async function readFile(
  file: string,
  {
    mimeType = 'application/text',
    createNewFileIfNotFound = false,
  }: { mimeType?: string; createNewFileIfNotFound?: boolean } = {}
) {
  if (createNewFileIfNotFound) {
    await createIfNotFound(file, mimeType);
  }
  const content = await readAsStringAsync(file, {
    encoding: EncodingType.UTF8,
  });
  return content;
}

export async function writeFile(
  file: string,
  content: string,
  {
    mimeType = 'application/text',
    createNewFileIfNotFound = false,
  }: { mimeType?: string; createNewFileIfNotFound?: boolean } = {}
) {
  if (createNewFileIfNotFound) {
    await createIfNotFound(file, mimeType);
  }
  await writeAsStringAsync(file, content, {
    encoding: EncodingType.UTF8,
  });
}
