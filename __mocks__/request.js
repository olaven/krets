module.exports = (tokenOptions, callback) => {
    callback(false, "MOCK RESPONSE OBJECT", JSON.stringify({
        access_token: "MOCK_ACCESS_TOKEN"
    }));
}