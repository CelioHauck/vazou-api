import admin = require('firebase-admin');
import { getAllTokens } from './token';

const serviceAccount = require('../../vazou-2d0bd-firebase-adminsdk-m846w-525d8684f6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vazou-2d0bd-default-rtdb.firebaseio.com',
});

const skeletonMessage = {
  notification: {
    title: 'Vazamento de gas!',
    body: 'Detectamos um vazamento de gas critico na sua residencia!',
  },
  webpush: {
    notification: {
      icon: 'https://vazou-aabwqe8xv-celiohauck.vercel.app/logo192.png',
    },
    fcmOptions: {
      link: 'https://vazou-aabwqe8xv-celiohauck.vercel.app/medidor',
    },
  },
};

const mountMessage = async () => {
  const tokens = await getAllTokens();

  const messages = tokens.map((token) => {
    return { ...skeletonMessage, token: token.value };
  });

  return messages;
};

export const sendNotification = async () => {
  const messages = await mountMessage();

  admin
    .messaging()
    .sendAll(messages)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
    })
    .catch((e) => {
      console.log(e);
    });
};
