export interface TitleStyleProps {}

export interface TitleCustomProps {
  title: string;
  amount?: number;
  dropdown?: React.ReactNode;
}

export type TitleOptionProps = TitleStyleProps & TitleCustomProps;

export type TitleProps = React.ComponentProps<'div'> & TitleOptionProps;