/** 格式校验工具方法 license by http://eleadmin.com */
export default {
  // 手机号正则表达式
  phone: /^1\d{10}$/,
  /**
   * 是否是手机号
   * @param value
   * @returns {boolean}
   */
  isPhone(value) {
    return this.phone.test(value);
  },
  // 固话正则表达式
  tel: /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/,
  /**
   * 是否为固话
   * @param value
   * @returns {boolean}
   */
  isTel(value) {
    return this.tel.test(value);
  },
  // 邮箱正则表达式
  email: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  /**
   * 是否是邮箱
   * @param value
   * @returns {*}
   */
  isEmail(value) {
    return this.email.test(value);
  },
  // 网址正则表达式
  url: /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/,
  /**
   * 是否是网址
   * @param value
   * @returns {boolean}
   */
  isUrl(value) {
    return this.url.test(value);
  },
  // 数字正则表达式
  number: /^1\d{10}$/,
  /**
   * 是否是数字
   * @param value
   * @returns {boolean}
   */
  isNumber(value) {
    //return this.number.test(value);
    return !isNaN(value);
  },
  // 日期正则表达式
  date: /^(\d{4})[-/](\d{1}|0\d{1}|1[0-2])([-/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/,
  /**
   * 是否是日期
   * @param value
   * @returns {boolean}
   */
  isDate(value) {
    return this.date.test(value);
  },
  // 身份证正则表达式
  identity: /(^\d{15}$)|(^\d{17}(x|X|\d)$)/,
  /**
   * 是否是身份证
   * @param value
   * @returns {boolean}
   */
  isIdentity(value) {
    const reg = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
    return reg.test(value);
  },
  // 整数正则表达式
  digits: /^-?\d+$/,
  /**
   * 是否是整数
   * @param value
   * @returns {boolean}
   */
  isDigits(value) {
    return this.digits.test(value);
  },
  // 正整数正则表达式
  digitsP: /^[1-9]\d*$/,
  /**
   * 是否是正整数
   * @param value
   * @returns {boolean}
   */
  isDigitsP(value) {
    return this.digitsP.test(value);
  },
  // 负整数正则表达式
  digitsN: /^-[1-9]\d*$/,
  /**
   * 是否是负整数
   * @param value
   * @returns {*}
   */
  isDigitsN(value) {
    return this.digitsN.test(value);
  },
  // 非负整数(正整数或0)正则表达式
  digitsPZ: /^\d+$/,
  /**
   * 是否是非负整数(正整数或0)
   * @param value
   * @returns {boolean}
   */
  isDigitsPZ(value) {
    return this.digitsPZ.test(value);
  },
  // 非正整数(负整数或0)正则表达式
  digitsNZ: /^-[1-9]\d*|0/,
  /**
   * 是否是非正整数(负整数或0)
   * @param value
   * @returns {boolean}
   */
  isDigitsNZ(value) {
    return this.digitsNZ.test(value);
  },
  /**
   * 验证最小长度、最大长度
   * @param value
   * @param minLength
   * @param maxLength
   * @returns {boolean}
   */
  maxMinLength(value, minLength, maxLength) {
    if (value === undefined || value === null) {
      return !minLength;
    }
    if (minLength && value.toString().length < minLength) {
      return false;
    }
    return !(maxLength !== undefined && maxLength !== null && value.toString().length > maxLength);
  },
  /**
   * 验证最小值、最大值
   * @param value
   * @param min
   * @param max
   * @returns {boolean}
   */
  maxMin(value, min, max) {
    if (value === undefined || value === null) {
      return min === undefined || min === null;
    }
    if (min !== undefined && min !== null && value < min) {
      return false;
    }
    return !(max !== undefined && max !== null && value > max);
  },
  // 中文正则表达式
  chinese: /^[\u4E00-\u9FA5]{2,4}$/,
  /**
   * 是否是中文
   * @param value
   * @returns {boolean}
   */
  isChinese(value) {
    return this.chinese.test(value);
  },
  // 端口号正则表达式
  port: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
  /**
   * 是否是端口号
   * @param value
   * @returns {boolean}
   */
  isPort(value) {
    return this.port.test(value);
  },
  // IP正则表达式
  ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  /**
   * 是否是IP
   * @param value
   * @returns {boolean}
   */
  isIP(value) {
    return this.ip.test(value);
  },
  // 经度正则表达式
  longitude: /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/,
  /**
   * 是否是经度 -180.0～+180.0（整数部分为0～180，必须输入1到5位小数）
   * @param value
   * @returns {boolean}
   */
  isLongitude(value) {
    return this.longitude.test(value);
  },
  // 纬度正则表达式
  latitude: /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/,
  /**
   * 是否是纬度 -90.0～+90.0（整数部分为0～90，必须输入1到5位小数）
   * @param value
   * @returns {boolean}
   */
  isLatitude(value) {
    return this.latitude.test(value);
  },
  /**
   * 是否是身份证(强校验)
   * @param value
   * @returns {string}
   */
  isIdentityStrong(value) {
    if (!this.isIdentity(value)) {
      return '身份证号码格式错误';
    }
    const ai = value.length === 18 ? value.substring(0, 17) : (value.substring(0, 6) + '19' + value.substring(6, 15));
    // 验证出生年月
    const year = ai.substring(6, 10);  // 年
    const birthday = year + '/' + ai.substring(10, 12) + '/' + ai.substring(12, 14);
    if (!this.isDate(birthday)) {
      return '身份证号码出生日期无效';
    }
    const now = new Date();
    if ((now.getFullYear() - parseInt(year)) > 150 || (now.getTime() - new Date(birthday).getTime()) < 0) {
      return '身份证号码出生日期不在有效范围';
    }
    // 验证地区码
    const areaCodes = [
      '11', '12', '13', '14', '15',
      '21', '22', '23',
      '31', '32', '33', '34', '35', '36', '37',
      '41', '42', '43', '44', '45', '46',
      '50', '51', '52', '53', '54',
      '61', '62', '63', '64', '65',
      '71',
      '81', '82',
      '91'
    ];
    if (areaCodes.indexOf(ai.substring(0, 2)) === -1) {
      return '身份证号码地区编码错误';
    }
    // 验证最后一位
    if (value.length === 18) {
      const valCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let totalMulAiWi = 0;
      for (let i = 0; i < 17; i++) {
        totalMulAiWi += parseInt(ai.charAt(i)) * wi[i];
      }
      if (value !== (ai + valCode[totalMulAiWi % 11])) {
        return '身份证号码最后一位错误';
      }
    }
  }
}
