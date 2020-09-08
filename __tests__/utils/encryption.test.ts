import { decrypt, encrypt } from '../../src/utils/encryption';

test('encryption: should return the same value when encrypting and decrypting', () => {
  const key = 'key';
  const val = 'foo';
  expect(decrypt(encrypt(val, key), key)).toEqual(val);
});
