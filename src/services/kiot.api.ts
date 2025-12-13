import {
    KIOTCLIENTID,
    KIOTCLIENTSECRET,
    KIOTURL,
    SCOPES,
} from '@env';
import axios from 'axios';
interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}


export type { AccessTokenResponse };


export const getTokenKiot = async (): Promise<AccessTokenResponse> => {

    const tokenBody = new URLSearchParams();
    tokenBody.append('client_id', KIOTCLIENTID);
    tokenBody.append('client_secret', KIOTCLIENTSECRET);
    tokenBody.append('scope', SCOPES);
    tokenBody.append('grant_type', 'client_credentials');

    try {
        const response = await axios.post<AccessTokenResponse>(
            'https://id.kiotviet.vn/connect/token',
            tokenBody.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        return response.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.error_description ||
            error?.response?.data?.message ||
            error?.message ||
            'Lấy Access Token thất bại';
        throw new Error(message);
    }
};
