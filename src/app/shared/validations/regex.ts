export const regExp = {
    estimate: /^(([1-9]\d{0,2}[,\/\.]\d{1,2}h?\s?|0+[,\/\.]([1-9]0?|0[1-9]){1,2}h?\s?)|0+h\s((0?[1-9]|[1-9]\d)m)\s?|([1-9]\d?)h\s?(([1-9]\d{0,2}?|0?\d{1,2})m)?\s?|[1-9]\d{0,2}h?\s?|(0?[1-9]|[1-9]\d)m\s?|[,\/\.]([1-9]0?|0[1-9]){1,2}h)$/,
    time: /^(((2+[0-3]|1+\d|[1-2]0?|[1-9])[,\/\.]\d{1,2}h?\s?|0+[,\/\.]([1-9]0?|0[1-9]){1,2}h?\s?)|0+h\s((\d?[1-9]|[1-9]0)m)|(2+[0-3]|1+\d|[1-2]0?|[1-9])h\s{0,2}(([1-9]\d{0,2}?|0?\d{1,2})m)?\s{0,2}|(2+[0-4]?|1+\d|[1-9])h?\s?|([1-9]\d?|0[1-9])m\s?|[,\/\.]([1-9]0?|0[1-9]){1,2}h)$/,
    timeInt: /^((\d+h)?\s{0,2}?(\d+m)?\s{0,2}?|\d+$)$/,
    timeFloat: /^(\d+[,\/\.]\d{0,2}h|[,\/\.]\d{0,2}h|\d+[,\/\.]\d+$)$/,
    timeHours: /^(([1-9]|1[0-9]|2[0-3])([,\/\.][0-9]{1,2})?|24)h?$/,
    timeAnyHours: /^(\d+([,\/\.][0-9]{1,2})?)h?$/,
    dateTime: /^\d{1,2}\/\w{3}\/\d{1,2}\s\d{1,2}:\d{1,2}\s[AP]{1}[M]{1}$/i,
    date: /^\d{2}\/\w{3}\/\d{2}/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    onlyNumbers:'[0-9]*',
    onlyNumbersAndLatinLetters:'[0-9a-zA-Z]*',
    onlyFiveLatin:'^[a-zA-Z]{1,5}$'
  
  };
  