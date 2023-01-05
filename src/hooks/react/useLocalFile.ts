import * as JSON5 from 'json5';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ConfigBuilder } from '../../builder';
import { readFileAsStringAsync, writeStringToFileAsync } from '../../utils';
import useObservable from './useObservable';

export type UseLocalFileProps = {
  file: string;
};

export function useLocalFile<T extends object>({
  file,
}: UseLocalFileProps): [t: T, cb: (t: Partial<T>) => void] {
  const isDirtyRef = useRef(false);
  const isMountedRef = useRef(false);

  const builder = useMemo(() => {
    return new ConfigBuilder<T>();
  }, [file]);

  const conf = useObservable(builder.getConfAsObservable(), {});

  const readFileContentFromLocal = useCallback(async () => {
    const content = await readFileAsStringAsync(file, {
      createNewFileIfNotFound: true,
    });
    const setting = JSON5.parse(content);
    builder.setInit(setting);
    isDirtyRef.current = false;
  }, [builder, file]);

  useEffect(() => {
    isMountedRef.current = true;
    readFileContentFromLocal();
    const saveToLocalFile = () => {
      const latestConf = builder.getAllProperties();
      if (!isDirtyRef.current || !latestConf || !isMountedRef.current) {
        return;
      }
      isDirtyRef.current = false;
      writeStringToFileAsync(file, JSON5.stringify(latestConf, undefined, 2), {
        createNewFileIfNotFound: true,
      });
    };
    builder.addAnyPropertyChangeEventListener(saveToLocalFile);
    return () => {
      isMountedRef.current = false;
      builder.removeAnyPropertyChangeEventListener(saveToLocalFile);
    };
  }, [readFileContentFromLocal]);
  const setConf = useCallback(
    (t: Partial<T>) => {
      if (!isMountedRef.current) {
        return;
      }
      isDirtyRef.current = true;
      builder.setProperties(t);
    },
    [builder]
  );

  return [conf as T, setConf];
}
