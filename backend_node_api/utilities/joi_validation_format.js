module.exports = {
    joi_validation_format : (errors) => {
        var formatedValidationError = {};

        for (const [key, value] of Object.entries(errors.details)) {
            formatedValidationError[value.context.key] = value.message;
        }

        return formatedValidationError;
    }
}