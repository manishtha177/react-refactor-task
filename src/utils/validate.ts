import { IFormData, IFormError } from "../interfaces/form";

export const validateForm = (data: any, error: IFormError) => {
    let formIsValid = true;
    let errors: any = {}
    for (var obj in error) {
        if (!data[obj].length || typeof data[obj] === "string" && !data[obj].trim().length) {
            formIsValid = false;
            errors[obj] = true
        }
    }
    return { formIsValid, errors }
}