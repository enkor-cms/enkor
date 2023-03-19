import { useMountTransition, useToggle } from '@/hooks';
import { FunctionComponent } from 'react';
import { DefaultFooter, DefaultHeader } from './DefaultElement';
import { BackgroundOverlay } from './FloatingPanel';
import './style.css';
import { TModalProps } from './types';

export const Modal: FunctionComponent<TModalProps> = ({
  children,
  isOpen,
  size = 'medium',
  ...props
}) => {
  const [canClose, allowClose, preventClose] = useToggle();
  const hasTransitionedIn = useMountTransition(isOpen, 300);

  const getPanelWidth = () => {
    switch (size) {
      case 'medium':
        return 'inset-x-1/3';
      case 'large':
        return 'inset-x-1/4';
      default:
        return 'inset-x-1/3';
    }
  };

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
        } absolute ${getPanelWidth()} top-1/2 transform -translate-y-1/2 z-10 flex justify-center`}
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
          {props.customHeader || <DefaultHeader text={props.title} />}
          <div className="grow p-3 text-center">{children}</div>
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
