/*
For cb, assumes node style arguments (err, res).
*/
export default function promisify<T>(func: (...args) => void): (...args: unknown[]) => Promise<T> {
  return function <T>(...args): Promise<T> {
    return new Promise((resolve, reject) => {
      function callback(error: any, result: T): void {
        if (error) {
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
