import { useMountTransition, useToggle } from '@/hooks';
import { FunctionComponent } from 'react';
import { DefaultFooter, DefaultHeader } from './DefaultElement';
import './style.css';
import { TBackgroundOverlayProps, TFloatingPanelProps } from './types';

export const BackgroundOverlay: FunctionComponent<TBackgroundOverlayProps> = ({
  children,
  onMouseDown,
  onMouseUp,
  className = '',
}) => {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 z-0 bg-gray-300 dark:bg-dark-200 bg-opacity-30 dark:bg-opacity-50 ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};

export const FloatingPanel: FunctionComponent<TFloatingPanelProps> = ({
  size = 'medium',
  ...props
}) => {
  const [canClose, allowClose, preventClose] = useToggle();
  const hasTransitionedIn = useMountTransition(props.isOpen, 300);

  const getPanelWidth = () => {
    switch (size) {
      case 'medium':
        return 'w-1/3';
      case 'large':
        return 'w-7/12';
      default:
        return 'w-1/3';
    }
  };

  return (
    (hasTransitionedIn || props.isOpen) && (
      <BackgroundOverlay
        onMouseDown={allowClose}
        onMouseUp={canClose ? props.onClose : undefined}
        className={`floating-panel-right-background ${
          hasTransitionedIn && 'in'
        } ${props.isOpen && 'visible'}`}
      >
        <div
          className={`floating-panel-right ${hasTransitionedIn && 'in'} ${
            props.isOpen && 'visible'
          } absolute bottom-0 top-0 right-0 z-10 ${getPanelWidth()} flex justify-center border-l border-gray-300 dark:border-dark-300`}
          onMouseDown={(e) => {
            e.stopPropagation();
            preventClose();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            preventClose();
          }}
        >
          <div className="bg-white-200 dark:bg-dark-200 w-full h-full flex flex-col shadow-lg">
            {props.customHeader || <DefaultHeader title={props.title} />}
            <div className="grow p-3">{props.children}</div>
            {props.customFooter || (
              <DefaultFooter
                onCancel={props.onClose}
                onConfirm={props.onConfirm}
              />
            )}
          </div>
        </div>
      </BackgroundOverlay>
    )
  );
};
