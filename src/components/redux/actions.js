import {Submit} from './actionType'

export const submit = text_data=>({
    type:Submit,
    payload:text_data
})