const parseText = (type: string, ...args: unknown[]): unknown[] => [`[${type}]`, ...args];

const debug = (...args: unknown[]) => {
  if ('DEBUG' in window && window.DEBUG) console.log(...parseText('DEBUG', ...args));
};

const error = (...args: unknown[]) => {
  console.error(...parseText('ERROR', ...args));
};

export default { debug, error };
