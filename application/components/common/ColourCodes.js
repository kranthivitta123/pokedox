export class ColorCodes {
  constructor(obj) {
    this.codes = obj;
  }

  /**
   * @author kranthi kumar reddy
   * @method To extract color code
   * @param {*} data
   */

  getCode(val) {
    return this.codes[val.toUpperCase()];
  }

  /**
   * @author kranthi kumar reddy
   * @method To apply gradient or background
   * @param {*} data
   */
  
  getBackgroundColor(types) {
    if (types && types.length > 1) {
      const style = `linear-gradient(180deg, #${this.getCode(
        types[0]
      )} 0%, #${this.getCode(types[1])} 100%)`;
      return style;
    } else {
      const style = `#${this.getCode(types[0])}`;
      return style;
    }
  }
}
