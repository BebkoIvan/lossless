const elliptic = require('elliptic');
const secp256k1 = new elliptic.ec('secp256k1');
const BN = require('bn.js');

class Bytes {
    static flatten(a) {
        return '0x' + a.reduce((r, s) => r + s.slice(2), '');
    } 
    static fromNumber(num) {
        let hex = num.toString(16);
        return hex.length % 2 === 0 ? '0x' + hex : '0x0' + hex;
    } 

    static fromNat(bn) {
        return bn === '0x0' ? '0x' : bn.length % 2 === 0 ? bn : '0x0' + bn.slice(2);
    }

    static pad(l, hex) {
        return hex.length === l * 2 + 2 ? hex : Bytes.pad(l, '0x' + '0' + hex.slice(2));
    } 
}

class Nat {
    static fromString(str) {
        const bn = '0x' + (str.slice(0, 2) === '0x' ? new BN(str.slice(2), 16) : new BN(str, 10)).toString('hex');
        return bn === '0x0' ? '0x' : bn;
      };
}

const encodeSignature = ([v, r, s]) => Bytes.flatten([r, s, v]);

const makeSigner = addToV => (hash, privateKey) => {
    const signature = secp256k1.keyFromPrivate(new Buffer(privateKey.slice(2), 'hex')).sign(new Buffer(hash.slice(2), 'hex'), { canonical: true });
    return encodeSignature([Nat.fromString(Bytes.fromNumber(addToV + signature.recoveryParam)), Bytes.pad(32, Bytes.fromNat('0x' + signature.r.toString(16))), Bytes.pad(32, Bytes.fromNat('0x' + signature.s.toString(16)))]);
  };
  
const sign = makeSigner(7); // random number

console.log(sign('message', '082b7b733fcd3bd8a0175cc900018dbd35ee94dec31d362fa89ce07a382f809e'));