const express = require('express');

const validator = require('validator');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

router.get('/', getUsers);
router.get('/me', getUser);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(method),
    }),
  }),
  updateAvatar,
);

module.exports = router;
