const { check, validationResult } = require('express-validator');
const user = require('../model/user');
const bcrypt = require('bcryptjs');

const getLogin = (req, res, next) => {
    res.render('auth/loginPage',{
        error: [],
        oldInput: {
            email: '',
            password: ''
        }
    });
}
exports.getLogin = getLogin;

const postLogin = async (req, res, next) => {
    const userData = await user.find({ email: req.body.email });
     if(userData.length === 0){
        return res.status(400).render('auth/loginPage', {
            error: ['Invalid email or password'],
            oldInput: { email: req.body.email, password: req.body.password }
        });
     }
     const isPasswordCorrect = await bcrypt.compare(req.body.password, userData[0].password);
     if(isPasswordCorrect){
         req.session.isLoggedIn = true;
         req.session.user = userData[0];
         await req.session.save();
         return req.session.user.userType === 'host' ? res.redirect('/host/hostedHomes') : res.redirect('/');
     }else{
                return res.status(400).render('auth/loginPage', {
            error: ['Invalid email or password'],
            oldInput: { email: req.body.email, password: req.body.password }
        }); 
     }

}
exports.postLogin = postLogin;

const getLogOut = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}
exports.getLogOut = getLogOut;

const getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        error: [],
        oldInput: {
            firstName: '',
            lastName: '',
            email: '',
            userType: '',
            password: ''
        }
    });
}
exports.getSignUp = getSignUp;

const postSignUp = [
    check('firstName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long')
        .notEmpty()
        .withMessage('First name cannot be empty')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('First name must contain only alphabets'),

    check('lastName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('last name must be at least 2 characters long')
        .notEmpty()
        .withMessage('last name cannot be empty')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('last name must contain only alphabets'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&-]/)
        .withMessage('Password must contain at least one special character')
        .trim(),

    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    check('userType')
        .notEmpty()
        .withMessage('Please select a user type')
        .isIn(['host', 'guest'])
        .withMessage('Invalid user type selected'),

    check('terms')
        .notEmpty()
        .withMessage('You must agree to the terms and conditions')
        .custom((value, { req }) => {
            if (value !== 'on') {
                throw new Error('You must agree to the terms and conditions');
            }
            return true;
        }),

    (req, res, next) => {
        const { firstName, lastName, email, password, userType } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render('auth/signup', {
                error: error.array().map(err => err.msg),
                oldInput: { firstName, lastName, email, userType, password }
            });
        }
        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const newUser = new user({
                    firstName,
                    lastName,
                    email,
                    userType,
                    password: hashedPassword
                });
                newUser.save()
                    .then(() => {
                        req.session.isLoggedIn = true;
                        user.findById(newUser._id)
                            .then(userData => {
                                req.session.user = userData;
                        req.session.save();
                            })
                    })
                    .then(() => {
                        return req.body.userType === 'host' ? res.redirect('/host/hostedHomes') : res.redirect('/');
                    })
                    .catch(err => {
                        console.error('Error saving user:', err);
                        res.status(500).render('auth/signup', {
                            error: err.code === 11000 ? ['Email already exists. Please use a different email.'] : ['An error occurred while signing up. Please try again later.'],
                            oldInput: { firstName, lastName, email, userType, password }
                        });
                    });
            })
    }
]
exports.postSignUp = postSignUp;