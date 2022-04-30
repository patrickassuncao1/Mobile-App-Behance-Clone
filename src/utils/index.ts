export type TypesValidate = ['required'] | ['required', 'email'] |
['email'] | ['tel'] | ['required', 'tel'];


const maskPhone = (value: string) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;
}

const validation = {
    required: function (text: string, name: string) {
        const message = text === "" ? 'O campo ' + name + ' é obrigatório'
            : false;
        return message;
    },
    email: function (text: string, name: string) {
        const regexEmail = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
        const message = !regexEmail.test(text) ? "Preencha um Email válido" : false;
        return message;
    },
    tel: function (text: string, name: string) {
        const regexTel = RegExp(/\([0-9]{2}\)[0-9]{5}-[0-9]{4}/);
        const message = !regexTel.test(text) ? "Preencha um Telefone válido" : false;
        return message;
    }
}

const validationMessage = ( validate: TypesValidate, value: string, name: string) => {
    const typesValidation = validate;
    const filter = [];
    let message: string | boolean = false;

    for (const name of typesValidation) {
        filter.push(validation[name]);
    }

    for (const messages of filter) {
        const mess = messages(value ?? "", name ?? "");
        if (mess) {
            message = mess;
            break;
        }
    }

    return message;
}


export { maskPhone, validationMessage};