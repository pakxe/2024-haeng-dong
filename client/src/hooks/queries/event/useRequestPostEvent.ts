import {useMutation} from '@tanstack/react-query';

import {RequestPostEvent, requestPostEvent} from '@apis/request/event';

const useRequestPostEvent = () => {
  const {mutate, mutateAsync, ...rest} = useMutation({
    mutationFn: ({eventName, password}: RequestPostEvent) => requestPostEvent({eventName, password}),
  });

  // 실행 순서를 await으로 보장하기 위해 mutateAsync 사용
  return {
    postEvent: mutateAsync,
    isPostEventPending: rest.isPending,
    ...rest,
  };
};

export default useRequestPostEvent;