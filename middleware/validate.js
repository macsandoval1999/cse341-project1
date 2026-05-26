const validator = require("../helpers/validate.js");
const objectIdRule = "regex:/^[0-9a-fA-F]{24}$/";

const sendValidationError = (res, err) => {
    res.status(412).send({
        success: false,
        message: "Validation failed",
        errors: err,
    });
};

const runValidation = (body, rules, res, next) => {
    validator(body, rules, {}, (err, status) => {
        if (!status) {
            sendValidationError(res, err);
            return;
        }

        next();
    });
};

const validateContactArray = (req, res, next, itemRules) => {
    if (!Array.isArray(req.body) || req.body.length === 0) {
        res.status(412).send({
            success: false,
            message: "Validation failed",
            errors: { body: ["Request body must be a non-empty array"] },
        });
        return;
    }

    let currentIndex = 0;

    const validateNext = () => {
        if (currentIndex >= req.body.length) {
            next();
            return;
        }

        validator(req.body[currentIndex], itemRules, {}, (err, status) => {
            if (!status) {
                sendValidationError(res, {
                    index: currentIndex,
                    details: err,
                });
                return;
            }

            currentIndex += 1;
            validateNext();
        });
    };

    validateNext();
};

const saveContact = (req, res, next) => {
    const validationRules = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        favoriteColor: "required|string",
        birthday: "string",
    };
    runValidation(req.body, validationRules, res, next);
};

const saveContacts = (req, res, next) => {
    const validationRules = {
        _id: "string",
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        favoriteColor: "required|string",
        birthday: "string",
    };

    validateContactArray(req, res, next, validationRules);
};

const updateContact = (req, res, next) => {
    const validationRules = {
        firstName: "string",
        lastName: "string",
        email: "email",
        favoriteColor: "string",
        birthday: "string",
    };

    if (Object.keys(req.body || {}).length === 0) {
        res.status(412).send({
            success: false,
            message: "Validation failed",
            errors: { body: ["Request body must include at least one field"] },
        });
        return;
    }

    runValidation(req.body, validationRules, res, next);
};

const updateContacts = (req, res, next) => {
    const validationRules = {
        _id: `required|${objectIdRule}`,
        firstName: "string",
        lastName: "string",
        email: "email",
        favoriteColor: "string",
        birthday: "string",
    };

    if (
        Array.isArray(req.body) &&
        req.body.some(
            (contact) =>
                !contact ||
                typeof contact !== "object" ||
                Object.keys(contact).filter((key) => key !== "_id").length === 0
        )
    ) {
        sendValidationError(res, {
            body: [
                "Each contact update must include _id and at least one field to update",
            ],
        });
        return;
    }

    validateContactArray(req, res, next, validationRules);
};

const deleteContacts = (req, res, next) => {
    const validationRules = {
        _id: `required|${objectIdRule}`,
    };

    validateContactArray(req, res, next, validationRules);
};

module.exports = {
    saveContact,
    saveContacts,
    updateContact,
    updateContacts,
    deleteContacts,
};
