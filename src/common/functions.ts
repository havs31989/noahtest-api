export class CommonFunctions {
  /**
   * Simple hash with base64 and key encrypt
   * @param text
   */
  public static simpleHash(text: string) {
    const key = '$3edC2wsX1qaZ';
    return Buffer.from(text + key).toString('base64');
  }

  /**
   * Map new instance with source
   * @param source
   */
  public static map<T>(source: T): any {
    const data = {};
    Object.keys(source).map(function (key, index) {
      data[key] = source[key];
    });
    return data;
  }
}
