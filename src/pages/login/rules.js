const userNameReg = /([^0-9a-zA-Z])/g;
const userPasswordeNumber = /\d+/;
const userPasswordeAZ = /[A-Z]+/;
const userPasswordeaz = /[a-z]+/;
const userPasswordeSymbol = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/;
const validatorUserName = async (rule, value) => {
    if(value === '') {
      return Promise.reject('用户名不能为空！');
    } else if (value.length < 6 || value.length > 10) {
      return Promise.reject('用户名长度只能是6~10！');
    } else if (userNameReg.test(value)) {
      return Promise.reject('用户名只能是数字或大小写字母！');
    } else {
      return Promise.resolve('');
    }
  };
const validatorPassword = async (rule, value) => {
    if(value === '') {
      return Promise.reject('密码不能为空！');
    } else if (value.length < 6 || value.length > 16) {
      return Promise.reject('密码长度只能是6~16！');
    } else if (
      !userPasswordeSymbol.test(value) || 
      !userPasswordeNumber.test(value) || 
      !userPasswordeAZ.test(value) ||
      !userPasswordeaz.test(value)
    ) {
      return Promise.reject('密码需要包含特殊符号、大小写字母、数字！');
    } else {
      return Promise.resolve('');
    }
};
const rules = {
    name: [
      {
        // required: true,
        // validator: validatorUserName,
        trigger: ["blur", "change"],
      },
    ],
    password: [
      {
        // required: true,
        // validator: validatorPassword,
        trigger: ["blur", "change"],
      },
    ],
};

export default rules;
