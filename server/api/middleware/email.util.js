require("dotenv").config()
const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");
const { TokenCredentialAuthenticationProvider } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials")

//For getting Microsoft Graph token
const getGraphToken = async () => {

    const creds = new ClientSecretCredential(process.env.EMAIL_TENANTID, process.env.EMAIL_CLIENT, process.env.EMAIL_SECRET)
    const auth = new TokenCredentialAuthenticationProvider(creds, {scopes: ["https://graph.microsoft.com/.default"]})
    const graphClient = Client.initWithMiddleware({ authProvider: auth });

    return graphClient
}

//For sending email
const sendEmail = async (username, tempToken) => {
    try {
        const client = await getGraphToken();
        const link = `http://localhost:3000/api/auth/passwordreset?token=${tempToken}`
        const emailBody = `<p>
            Hello ${username},<br/><br/>
            You can use the link below to reset your password.<br/><br/>
            <a href=http://localhost:3000/api/auth/passwordreset?token=${tempToken}>Reset Password</a>
        </p>`
        const total = {
            "message": {
                "body": {
                    "content": emailBody,
                    "contentType": "html"
                },
                "from": {
                    "emailAddress": {
                        "address": "passwordreset@habz9.in"
                    }
                },
                "importance": "high",
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": "sravan.taraknath@outlook.com"
                        }
                    }
                ],
                "subject": "DO NOT SHARE: Here is a link to reset your password."
            },
            "saveToSentItems": "true"
        }

        await client
            .api("/users/passwordreset@habz9.in/sendMail")
            .header("Content-Type", "application/json")
            .post(total)

    } catch (error) {
        throw error
    }
}

module.exports = {
    sendEmail,
}