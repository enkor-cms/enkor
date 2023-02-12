import React from 'react';

export type TDefaultFooterProps = {
  onCancel?: () => void;
  onConfirm?: () => void;
};

export type TDefaultHeaderProps = {
  title: string;
};

export type TBackgroundOverlayProps = {
  children: React.ReactNode;
  className?: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};

export type TModalDefaultProps = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  size?: 'medium' | 'large';
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
};

export type TFloatingPanelProps = TModalDefaultProps & {
  forceValidation?: boolean;
};

export type TModalProps = TModalDefaultProps;
