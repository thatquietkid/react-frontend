// URLSearchParams builds the form-urlencoded body FastAPI expects
export async function loginRequest(
  username: string,
  password: string
): Promise<{ access_token: string; token_type: string }> {
  const body = new URLSearchParams({
    grant_type: 'password',
    username,
    password,
    scope: '',
    client_id: 'string',
    client_secret: 'string',
  });

  const res = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }
  return res.json();
}
