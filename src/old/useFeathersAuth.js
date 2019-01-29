export default class Auth {
    static login(user,pw){
        const creds = {
            strategy: "local",
            email: user,
            password: pw
          }
        const url = "http://localhost:3030/authentication"
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds), // body data type must match "Content-Type" header
        }).then(res => res.json())
    }
}