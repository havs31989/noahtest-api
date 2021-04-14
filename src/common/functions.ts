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
   * Create generic instance
   * @param type
   */
  public static createInstance<T>(type: { new (): T }): T {
    return new type();
  }

  /**
   * Map new instance with source
   * @param source
   */
  public static map<TSource, TDest>(source: TSource, dest: TDest): TDest {
    Object.keys(dest).map(function (key, index) {
      try {
        dest[key] = source[key];
      } catch (ex) {
        // log
        console.log(ex);
      }
    });
    return dest;
  }
}
