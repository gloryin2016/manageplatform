module.exports = {
    root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
    "env": {
      "browser": true,
      "es6": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:vue/essential"
    ],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "vue"
    ],
  rules: {
  /*这里是eslint规则*/
  }
  }