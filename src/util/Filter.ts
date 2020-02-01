export default class Filter {
  constructor() {
  }

  public static validate = (filter: string): void => {
    if (!/[b|#]/.test(filter)) {
      throw Error(`Input "${filter}" is not a valid filter.`);
    }
  }
  public static random = (): string => {
    return ['b', '#'][Math.floor(Math.random() * 2)];
  }
}
