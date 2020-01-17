import * as API from './api'


export const FetchAddText = ({ textFile }, callback) => {

    fetch(API.Submit_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ text: textFile })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                callback(null, null, data)
            }
            else {
                callback(null, data, null)
            }

        })
        .catch(err => callback(err, null, null))
}