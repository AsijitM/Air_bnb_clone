import { FC } from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          w-full
          ${outline ? 'bg-white' : 'bg-rose-500'}
          ${outline ? 'border-black' : 'bg-rose-500'}
          ${outline ? 'text-black' : 'text-white'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'text-sm' : 'text-base'}
          ${small ? 'border-[1px]' : 'border-2'}


          `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
              absolute
              top-4
              left-3"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
