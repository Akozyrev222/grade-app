import {appSelectors} from '@/bus/app';
import {COUNTRY_CODES} from '@/constants';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

export const useData = (initialCode) => {
  const locale = useSelector(appSelectors.getLanguage);

  const codes = useMemo(() => COUNTRY_CODES, []);

  const [id, setId] = useState(
    initialCode ? codes.find((code) => code.code === initialCode)?.id || 0 : 0,
  );

  useEffect(() => {
    const index = codes.findIndex((code) => locale === code.lang);
    if (index !== -1) {
      setId(index);
    }
  }, [locale]);

  const currentCode = useMemo(() => {
    const index = codes.findIndex((code) => id === code.id);
    if (index !== -1) {
      return codes[index];
    }
    return null;
  }, [id]);

  return {codes, id, setId, currentCode};
};
