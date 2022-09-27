import { useRouter } from "next/router";
import classNames from "classnames";

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
        "flex items-center justify-center text-white rounded text-center cursor-pointer",
        {
          "bg-blue-500 border border-button-border hover:bg-blue-400": props.isPrimary,
          "bg-white border border-blue-600 text-blue-600 hover:bg-steel-100":
            props.isPrimaryOutline,
          "bg-steel-800 hover:bg-steel-700": props.isSecondary,
          "py-1 px-4": props.isMedium,
          "py-4 px-10 md:text-xl rounded-md": props.isLarge,
          "cursor-default bg-steel-400 hover:bg-steel-400": props.isDisabled,
        },
        props.className
      )}
      onClick={() => {
        if (props.isDisabled) {
          return;
        }
        if (props.url) {
          if (props.openNew) {
            window.open(props.url, "_blank");
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
