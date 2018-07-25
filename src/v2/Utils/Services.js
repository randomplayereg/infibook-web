export const admin_token = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJjcmVhdGVfdGltZSI6IjIwMTgtMDMtMDRUMDI6NTc6MjMuOTgxMjUzKzAwOjAwIiwiZW1haWwiOiJ0aGVkdW5nMjcwOUBnbWFpbC5jb20iLCJpZCI6MX0.dhZvtbK9YrUzdRObkurnRp89bCH7yy2L3sdaUbWQu0k';
const base_url = 'https://thedung.pythonanywhere.com/api/';

export const api_register = async (real_name, email, password, birthday, gender) => {

    // password
    const md5Base64 = require('md5-base64');
    const encodedPassword = md5Base64(password);

    debugger;
    // birthday
    const encodedBirthday = `${birthday.get('day') + 1}/${birthday.get('month') + 1}/${birthday.get('year')}`;

    let url = base_url + 'user/register';

    await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Authorization' : admin_token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'real_name' : real_name,
                'email' : email,
                'password': encodedPassword,
                'gender': gender,
                'birthday': encodedBirthday,
                // other field
                'register_type': 'normal',
                'fcm_token' : null
            })
        }
    )
        .then(response => response.json())
        .then(
            json => {
                console.log(json);
                debugger
                if (json.error_code === 2) {
                    return 2;
                }
                return 0;
            }
        );
    return -1;
}

export const api_logout = (email, token) => {
    let url = 'https://thedung.pythonanywhere.com/api/user/logout';
    const call = fetch(url, {
        method: 'POST',
        headers: {
            'Authorization' : admin_token,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            'email' : localStorage.getItem('uid'),
            'token' : `Token ${localStorage.getItem('token')}`
        })
    })
        .then(response => response.json())
        .then(
            json => {
                if (json.error_code === 0) {
                    alert('Successfully logged out');
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('uid');
                    return 0;
                } else {
                    alert('Somethine wrong');
                    console.log(json);
                    return 1;
                }
            }
        );
}