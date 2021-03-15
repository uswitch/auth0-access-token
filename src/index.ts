import axios from 'axios'

const base64Decode = (a: string) => Buffer.from(a, 'base64').toString('binary')

interface Payload {
  exp: number
}

const decodeToken = (token: string) => {
  const [_, payload] = token.split('.')
  return JSON.parse(base64Decode(payload)) as Payload
}

const GRANT_TYPE = 'client_credentials'

interface Props {
  clientId: string
  clientSecret: string
  audience: string
  url: string
}

interface TokenResponse {
  access_token: string
  scope: string
  expires_in: number
  token_type: string
}

class AuthClient {
  clientId: string
  clientSecret: string
  audience: string
  url: string
  response?: TokenResponse

  constructor({ url, clientId, clientSecret, audience }: Props) {
    this.url = url
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.audience = audience
  }

  getToken = async (): Promise<TokenResponse['access_token']> => {
    if (this.response) {
      const { exp } = decodeToken(this.response.access_token)
      
      const now = Date.now() / 1000 + 10 // Adding 10 seconds for safety

      if (now < exp) {
        // token is still valid so we return the existing token
        return this.response.access_token
      }
    }

    const response: { data: TokenResponse } = await axios({
      method: 'post',
      url: this.url,
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: this.audience,
        grant_type: GRANT_TYPE
      }
    })

    this.response = response.data

    return this.response.access_token
  }
}

export default AuthClient
