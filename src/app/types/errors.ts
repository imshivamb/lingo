export type VideoError = {
    type: 'LOAD' | 'FORMAT' | 'NETWORK' | 'PERMISSION';
    message: string;
  };
  