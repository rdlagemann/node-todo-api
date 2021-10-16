const authenticate = require("./authenticate")
// @ponicode
describe("authenticate.authenticate", () => {
    test("0", () => {
        let callFunction = () => {
            authenticate.authenticate({ token: " ", user: 123, header: () => "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg" }, { status: () => 400 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            authenticate.authenticate({ token: ")", user: "user123", header: () => "ponicode.com" }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            authenticate.authenticate({ token: "as", user: "user123", header: () => "https://api.telegram.org/bot" }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            authenticate.authenticate({ token: " ", user: "username", header: () => "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg" }, { status: () => 429 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            authenticate.authenticate({ token: "@", user: "user123", header: () => "https://twitter.com/path?abc" }, { status: () => 400 }, () => " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            authenticate.authenticate(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
