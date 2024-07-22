/** @jsxImportSource @emotion/react */
import React from 'react';
import {useTheme} from '@theme/HDesignProvider';
import {BillItemProps} from './BillItem.type';
import {textStyle} from './BillItem.style';
import Text from '@components/Text/Text';
import DragHandleItem from '../DragHandleItem/DragHandleItem';
import Flex from '../Flex/Flex';

export const BillItem: React.FC<BillItemProps> = ({
  name = '',
  price = 0,
  hasDragHandle = false,
  ...htmlProps
}: BillItemProps) => {
  const {theme} = useTheme();
  return (
    <DragHandleItem {...htmlProps} hasDragHandle={hasDragHandle} backgroundColor="lightGrayContainer">
      <Flex justifyContent="spaceBetween" width="100%">
        <Text css={textStyle(theme)} size="bodyBold">
          {name}
        </Text>
        <Text css={textStyle(theme)} size="body">
          {price.toLocaleString('ko-kr')} 원
        </Text>
      </Flex>
    </DragHandleItem>
  );
};
export default BillItem;