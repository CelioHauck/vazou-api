import { saveToken } from '../service/token';

export async function requestTokens(context) {
  const { token } = context.request.body;
  if (!token) {
    throw new Error('O campo "token" é obrigatorio!');
  }

  const result = await saveToken(token);
  context.body = result;
  return context;
}
