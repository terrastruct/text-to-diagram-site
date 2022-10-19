import classNames from 'classnames';
import { useRouter } from 'next/router';

type ButtonProps = {
  label: string | React.ReactChild;
  url?: string;
  className?: string;
  isPrimary?: boolean;
  isPrimaryOutline?: boolean;
  isSecondary?: boolean;
  isMedium?: boolean;
  isLarge?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  openNew?: boolean;
};

const Button = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <div
      className={classNames(
        'flex cursor-pointer items-center justify-center rounded text-center text-white',
        {
          'border border-button-border bg-blue-500 hover:bg-blue-400':
            props.isPrimary,
          'border border-blue-600 bg-white text-blue-600 hover:bg-steel-100':
            props.isPrimaryOutline,
          'bg-steel-800 hover:bg-steel-700': props.isSecondary,
          'py-1 px-4': props.isMedium,
          'rounded-md py-4 px-10 md:text-xl': props.isLarge,
          'cursor-default bg-steel-400 hover:bg-steel-400': props.isDisabled,
        },
        props.className
      )}
      onClick={() => {
        if (props.isDisabled) {
          return;
        }
        if (props.url) {
          if (props.openNew) {
            window.open(props.url, '_blank');
          } else {
            router.push(props.url);
          }
        }
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.label}
    </div>
  );
};

export default Button;
