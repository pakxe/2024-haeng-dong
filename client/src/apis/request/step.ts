import {Steps} from 'types/serviceType';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export const requestGetSteps = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  const {steps} = await requestGet<Steps>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/bills`,
    ...props,
  });

  return steps;
};