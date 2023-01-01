/*
For cb, assumes node style arguments (err, res).
TODO(Benson): How to type arguments?
*/
export default function promisify<T>(func: (...args) => void): (...args: unknown[]) => Promise<T> {
  return function <T>(...args): Promise<T> {
    return new Promise((resolve, reject) => {
      function callback(error: unknown, result: T): void {
        if (error) {
          console.log('[ERROR] - Promisfy error:', error);
          reject(error);
          return;
        }
        resolve(result);
      }
      args.push(callback);
      func.call(func, ...args);
    });
  };
}
