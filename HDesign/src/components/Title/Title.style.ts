import {css} from '@emotion/react';

import {Theme} from '@theme/theme.type';

export const titleContainerStyle = (theme: Theme) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: theme.colors.white,
    padding: '1rem',
  });

export const titleStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });

export const descriptionStyle = (theme: Theme) =>
  css({
    color: theme.colors.darkGray,
  });

export const priceContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
});

export const priceTitleStyle = (theme: Theme) =>
  css({
    color: theme.colors.gray,
  });

export const priceStyle = (theme: Theme) =>
  css({
    color: theme.colors.black,
  });