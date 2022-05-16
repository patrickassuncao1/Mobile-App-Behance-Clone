import { Platform } from "react-native";
import { listAllMenu } from "../constants";
import { StateCart } from "../types/types";

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

const validationMessage = (validate: TypesValidate, value: string, name: string) => {
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

const filterMenu = (type: string) => {
    const data = listAllMenu;
    const newData = [];

    for (const value of data) {
        if (value.type === type) newData.push(value);
    }

    return newData.length === 0 ? data : newData;

}

const formatCurrency = (array: StateCart[]) => {

    let finalValues = 0;

    for (const values of array) {
        if (values.qnt && values.qnt > 1) {
            finalValues = (parseFloat(values.price.replace(/,/g, "."))
                * values.qnt) + finalValues;
        } else {
            finalValues = parseFloat(values.price.replace(/,/g, "."))
                + finalValues;
        }

    }
    return finalValues.toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const checkItemCart = (array: StateCart[], keyItem: number) => {
    let checkQntd = 0;

    for (const item of array) {
        if (item.key === keyItem) {
            checkQntd = item.qnt ? item.qnt : 0;
            break;
        }
    }

    return checkQntd;

}

const zIndex = (val: number) => {
    return Platform.select({
        ios: { zIndex: val },
        android: { elevation: val }
    })
}

export { maskPhone, validationMessage, filterMenu, formatCurrency, checkItemCart, zIndex };