const { Validator, Rule } = require('@cesium133/forgjs');

// const emailRule = new Rule(
//   {
//     type: 'email',
//     user: (user) => user === 'dedede',
//     domain: (domain) => ['outlook', 'gmail', 'yahoo'].indexOf(domain) !== -1,
//   },
//   'jsjsjsjsjsj'
// );

const rules = {
  nome: {
    type: 'string',
    message: 'erro no nome',
  },
  teste: {
    type: 'int',
    min: 5,
    max: 6,
    message: 'erro no teste',
  },
  eu: {
    type: 'array',
    message: 'erro no array',
    // items: {
    //   type: String,
    //   //   matchesOneOf: [''],
    // },
  },
};

// const arrayType = (prop) => {
//   console.log(prop);
// };

const allRules = Object.keys(rules)
  .map((ruleKey) => {
    // const allRules = {};

    if (rules[ruleKey].type === 'array') {
      //   rules[ruleKey] = new Rule({
      //     type: 'array',
      //     of: new Rule({ type: 'string' }),
      //   });
      console.log(rules[ruleKey]);
    }

    const { type, message, ...restRules } = rules[ruleKey];

    return {
      [ruleKey]: new Rule(
        {
          type: type,
          ...restRules,
        },
        message
      ),
    };
  })
  .reduce((a, b) => Object.assign(a, b), {});

const val = new Validator(allRules);
const errors = val.getErrors({ teste: 5 });

console.log(errors);
