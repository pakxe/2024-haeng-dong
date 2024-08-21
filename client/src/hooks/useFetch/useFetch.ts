import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import FetchError from '@errors/FetchError';
import {useError} from '@hooks/useError/useError';

import {captureError} from '@utils/captureError';
import getEventIdByUrl from '@utils/getEventIdByUrl';

import {UNKNOWN_ERROR} from '@constants/errorMessage';

type FetchProps<T> = {
  queryFunction: () => Promise<T>;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useFetch = () => {
  const {setErrorInfo, clearError} = useError();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const fetch = async <T>({queryFunction, onSuccess, onError}: FetchProps<T>): Promise<T> => {
    setLoading(true);

    clearError();
    try {
      const result = await queryFunction();

      if (onSuccess) {
        onSuccess();
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        const errorInfo =
          error instanceof FetchError ? error.errorInfo : {errorCode: error.name, message: error.message};

        setErrorInfo(errorInfo);

        if (onError) {
          onError();
        }

        captureError(error, navigate, eventId);
      } else {
        setErrorInfo({errorCode: UNKNOWN_ERROR, message: JSON.stringify(error)});
        captureError(new Error(UNKNOWN_ERROR), navigate, eventId);

        // 에러를 throw 해 에러 바운더리로 보냅니다. 따라서 에러 이름은 중요하지 않음
        throw new Error(UNKNOWN_ERROR);
      }
    } finally {
      setLoading(false);
    }

    return {} as T;
  };

  return {loading, fetch};
};