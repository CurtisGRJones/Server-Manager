export function notAuthorized(res) {
    res.status(404).send('Not Authorized')
}