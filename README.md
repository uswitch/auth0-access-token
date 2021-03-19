# auth0-access-token
## Installation and Usage
`npm install --save auth0-access-token`

Grab your credentials from Auth0. You can find them on your Auth0 application settings page.

```javascript
import AuthClient from 'auth0-access-token'

const authClient = new AuthClient({
    audience: 'YOUR_AUDIENCE'
    clientId: 'YOUR_CLIENT_ID'
    clientSecret: 'YOUR_CLIENT_SECRET'
    url: 'YOUR_AUTH0_URL/oauth/token'
  }
})
```

And then you can get your token with `authClient.getToken()`

Here's an example of how to get a token to use on a subsequent http request:
```javascript
const fetchSecureData = async () => {
  const token = await authClient.getToken()

  axios({
    method: 'POST',
    url: '',
    headers: { authorization: `Bearer ${token}` },
    data: {...}
  })
}

```
## API

| Interfaces | Description | Params |Returns
| --- | --- | --- | --- |
| `AuthClient` | Constructor method, use `new` keyword | `{audience, clientId clientSecret, url }` |client instance
| `client.getToken` | Fetches token | empty |`Promise<string>` |

## Token request flow
![image](https://user-images.githubusercontent.com/3267705/111351166-cd188380-867a-11eb-8ed9-93ae651cbcc2.png)

## Development
After you've made your changes to the package and pushed your branch, run:

`npm version [patch|minor|major]`

This will automatically bump up the version and push  a new tag. If this is not done, the build will fail because npm doesn't allow publishing the  same version twice. Make sure to follow semantic versioning.

Lastly, merge your PR and that check the drone build. If all goes well, it should automatically publish the new version to `npm`.
### TODO:
Make it easier to test changes locally