

/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replace(/\s/g,'%20');
};


/**
 * 不使用正则表达式
 * @param {string} s
 * @return {string}
 */

 var replaceSpace = function (s) {
     let str = '';
     for(let i = 0; i < s.length; i++) {
         let char = s[i];
         if (s[i] === ' ') {
            char = '%20'
         }
         str +=  char;
     }
     return str;
 }

 console.log(
    replaceSpace('We are happy.')
 );