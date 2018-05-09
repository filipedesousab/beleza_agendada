import { success, danger, white } from './colors';

export const styleActivityIndicator = {
  larger: {
    success: {
      size: 50,
      color: success,
    },
    danger: {
      size: 50,
      color: danger,
    },
    default: {
      size: 50,
      color: white,
    },
  },
  medium: {
    success: {
      size: 'large',
      color: success,
    },
    danger: {
      size: 'large',
      color: danger,
    },
    default: {
      size: 50,
      color: white,
    },
  },
  small: {
    success: {
      size: 'small',
      color: success,
    },
    danger: {
      size: 'small',
      color: danger,
    },
    default: {
      size: 50,
      color: white,
    },
  },
  success: {
    color: success,
  },
  danger: {
    color: danger,
  },
  default: {
    size: 50,
    color: white,
  },
};
