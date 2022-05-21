// import crypto from 'crypto';
// import fs from 'fs';

// export const generateKeys=()=>{
//         const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
//             modulusLength: 4096,
//             publicKeyEncoding:{
//                 type:'spki',
//                 format:'pem'
//             },
//             privateKeyEncoding:{
//                 type:'pkcs1',
//                 format: 'pem'
//             }
//         });
//         fs.writeFileSync(
//             'public_key.pem', Buffer.from(publicKey)
//         );
//         fs.writeFileSync(
//             'private_key.pem', Buffer.from(privateKey)
//         );
//     }

//     fs.writeFileSync(
//                 'public_key.pem', Buffer.from(publicKey)
//             );
//             fs.writeFileSync(
//                 'private_key.pem', Buffer.from(privateKey)
            // );
        