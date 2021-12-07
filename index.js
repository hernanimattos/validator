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
    of: {
      type: 'string',
      //   matchesOneOf: [''],
    },
  },
};

// const arrayType = (prop) => {
//   console.log(prop);
// };

const allRules = Object.keys(rules)
  .map((ruleKey) => {
    let arrayRules = {};

    if (rules[ruleKey].type === 'array') {
      const { message, of } = rules[ruleKey];

      const ruleProps = {
        [ruleKey]: new Rule(
          {
            type: 'array',
            of: new Rule({ type: 'string' }),
          },
          'ppppppp'
        ),
      };

      arrayRules = {
        [ruleKey]: new Rule({
          type: rules[ruleKey].type,
        }),
      };
    }

    const { type, message, ...restRules } = rules[ruleKey];

    const fixtureRules = {
      [ruleKey]: new Rule(
        {
          type: type,
          ...restRules,
        },
        message
      ),
      // eu: {},
      ...arrayRules,
    };

    // console.log(rules);

    return {
      ...fixtureRules,
    };
  })
  .reduce((a, b) => Object.assign(a, b), {});

const val = new Validator(allRules);
const errors = val.getErrors({ teste: 5, eu: [' dddd'], nome: ' gggg' });

console.log(errors);

// console.log(JSON.stringify(allRules));

const emailRule = new Rule(
  {
    type: 'email',
    user: (user) => user === 'dedede',
    domain: (domain) => ['outlook', 'gmail', 'yahoo'].indexOf(domain) !== -1,
  },
  null
);

const passwordRule = new Rule(
  {
    type: 'password',
    minLength: 8,
    uppercase: 1,
    numbers: 1,
    matchesOneOf: ['@', '_', '-', '.', '!'],
  },
  null
);

const vComplex = new Validator({
  age: new Rule({ type: 'int', min: 18, max: 99 }),
  dateOfBirth: new Rule({ type: 'date' }),
  array: new Rule(
    { type: 'array', of: new Rule({ type: 'string' }, ' jjjj') },
    'ppppppp'
  ),
  email: emailRule,
  password: passwordRule,
});

const eee = vComplex.getErrors({
  age: 26,
  dateOfBirth: new Date(1995, 10, 3),
  array: [1],
  email: 'dedede@yahoo.fr;',
  password: 'ad1_A@@Axs',
}); /// returns true

console.log(eee);
