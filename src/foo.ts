// named exports
export var Count: number = 5;

export function Multiply(a: number, b: number): number {
  return a * b;
}

export function LogMult(a: number, b: number): void {
  console.log(Multiply(a, b));
}

export class Foo {
  static thisMethod(param: any): void {
    console.log(param);
  }
}