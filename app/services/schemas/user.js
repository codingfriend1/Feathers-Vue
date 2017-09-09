const p = require('../../../server/patterns')
const y = require('yup')

const colors = [
  '#1ABC9C',
  '#16A085',
  '#2ECC71',
  '#27AE60',
  '#3498DB',
  '#2980B9',
  '#34495E',
  '#EA4C88',
  '#CA2C68',
  '#9B59B6',
  '#8E44AD',
  '#F1C40F',
  '#F39C12',
  '#E74C3C',
  '#C0392B'
]

module.exports = {

  email: y.string().required(),
  password: y.string().required(),
  name: y.string(),

  isEnabled: y.boolean().default(() => true),

  role: y
    .string()
    .required()
    .trim()
    .matches(p.isTitle, p.messages.isTitle),

  color: y
    .string()
    .trim()
    .oneOf(colors)
    .default(() => colors[Math.floor(Math.random()*colors.length)]),

  initials: y
    .string()
    .required()
    .trim()
    .max(2),
  createdAt: y.date().default(() => new Date),
  updatedAt: y.date().default(() => new Date)
};
