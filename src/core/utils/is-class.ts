export function isClass(target: any): target is { new (...args: any[]): any } {
  return typeof target === "function" && target.prototype && target.prototype.constructor === target;
}