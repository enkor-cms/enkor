import { useMountTransition, useToggle } from '@/hooks';
import { FunctionComponent, useEffect } from 'react';
import { DefaultFooter, DefaultHeader } from './DefaultElement';
import { BackgroundOverlay } from './FloatingPanel';
import './style.css';
import { TModalProps } from './types';

export const Modal: FunctionComponent<TModalProps> = ({
  children,
  isOpen,
  size = 'medium',
  fullHeight = false,
  ...props
}) => {
  const [canClose, allowClose, preventClose] = useToggle();
  const hasTransitionedIn = useMountTransition(isOpen, 300);

  const getPanelWidth = () => {
    switch (size) {
      case 'medium':
        return 'sm:inset-x-6 md:inset-x-1/4 lg:inset-x-1/3 inset-x-3';
      case 'large':
        return 'sm:inset-x-6 md:inset-x-10 lg:inset-x-12 inset-x-3';
      case 'xlarge':
        return 'sm:inset-x-6 md:inset-x-12 lg:inset-x-16 inset-x-3';
      default:
        return 'sm:inset-x-6 md:inset-x-8 lg:inset-x-10 inset-x-3';
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Escape') {
        isOpen && props.onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return hasTransitionedIn || isOpen ? (
    <BackgroundOverlay
      onMouseDown={allowClose}
      onMouseUp={canClose ? props.onClose : undefined}
      className={`floating-panel-right-background ${
        hasTransitionedIn && 'in'
      } ${isOpen && 'visible'}`}
    >
      <div
        className={`modal ${hasTransitionedIn && 'in'} ${
          isOpen && 'visible'
        } absolute ${getPanelWidth()} z-10 flex justify-center p-3 ${
          fullHeight ? `h-full p-3` : `top-1/2 transform -translate-y-1/2`
        }`}
        onMouseDown={(e) => {
          e.stopPropagation();
          preventClose();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          preventClose();
        }}
      >
        <div className="bg-white-200 dark:bg-dark-200 w-full h-full flex flex-col shadow-lg rounded-sm border border-gray-300 dark:border-dark-300">
          {props.customHeader || <DefaultHeader title={props.title} />}
          <div className={`h-full overflow-y-auto`}>{children}</div>
          {props.customFooter || (
            <DefaultFooter
              onCancel={props.onClose}
              onConfirm={props.onConfirm}
            />
          )}
        </div>
      </div>
    </BackgroundOverlay>
  ) : null;
};
