'use client';
import { useMountTransition, useToggle } from '@/hooks';
import { FunctionComponent, useEffect, useState } from 'react';
import { Text } from '../text';
import { DefaultFooter, DefaultHeader } from './DefaultElement';
import { Modal } from './Modal';
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
      className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-dark-300 dark:bg-dark-200 bg-opacity-30 dark:bg-opacity-50 ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};

export const FloatingPanel: FunctionComponent<TFloatingPanelProps> = ({
  size = 'medium',
  backgroundOverlay = true,
  ...props
}) => {
  const [canClose, allowClose, preventClose] = useToggle();
  const hasTransitionedIn = useMountTransition(props.isOpen, 300);

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const getPanelWidth = () => {
    switch (size) {
      case 'medium':
        return 'sm:w-5/6 md:w-2/3 lg:w-1/2 w-full';
      case 'large':
        return 'sm:w-5/6 md:w-3/4 lg:w-2/3 w-full';
      default:
        return 'sm:w-5/6 md:w-2/3 lg:w-1/2 w-full';
    }
  };

  // handle echap key press to close the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Escape') {
        if (props.forceValidation) {
          setConfirmationOpen(true);
          return;
        } else {
          props.onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.forceValidation, props.onClose]);

  return hasTransitionedIn || props.isOpen ? (
    <>
      <BackgroundOverlay
        onMouseDown={allowClose}
        onMouseUp={
          canClose
            ? () => {
                if (props.forceValidation) {
                  setConfirmationOpen(true);
                  return;
                } else {
                  props.onClose();
                }
              }
            : undefined
        }
        className={`floating-panel-right-background ${
          hasTransitionedIn && 'in'
        } ${props.isOpen && 'visible'}`}
      >
        <div
          className={`floating-panel-right ${hasTransitionedIn && 'in'} ${
            props.isOpen && 'visible'
          } fixed bottom-0 top-0 right-0 z-10 ${getPanelWidth()} flex justify-center`}
          onMouseDown={(e) => {
            e.stopPropagation();
            preventClose();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            preventClose();
          }}
        >
          <div className="bg-white-200 dark:bg-dark-200 w-full h-full flex flex-col border-l border-gray-300 dark:border-dark-300">
            {props.customHeader || <DefaultHeader title={props.title} />}
            <div className="h-full overflow-hidden">{props.children}</div>
            {props.customFooter || (
              <DefaultFooter
                onCancel={() => {
                  if (props.forceValidation) {
                    setConfirmationOpen(true);
                    return;
                  } else {
                    props.onClose();
                  }
                }}
                onConfirm={props.onConfirm}
              />
            )}
          </div>
        </div>
      </BackgroundOverlay>
      <Modal
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={() => {
          setConfirmationOpen(false);
          props.onClose();
        }}
        title="Confirmation"
      >
        <div className="text-center p-3">
          <Text variant="caption">
            {props.forceValidationMessage ||
              'If you close the panel, you will lose all the data you have entered. Are you sure you want to close the panel?'}
          </Text>
        </div>
      </Modal>
    </>
  ) : null;
};
