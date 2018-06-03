var CryptoJS = require('crypto-js')

export default {
  aes (password) {
    CryptoJS.pad.ZeroPadding = {
      pad: function (data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4

        // Pad
        data.clamp()
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes)
      },

      unpad: function (data) {
        // Shortcut
        var dataWords = data.words
        // Unpad
        var i = data.sigBytes - 1
        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
          i--
        }
        data.sigBytes = i + 1
      }
    }
    var key = CryptoJS.enc.Latin1.parse('PQE8kgvWrvUtURVr')
    var iv = CryptoJS.enc.Latin1.parse('Nmm8d7AdHDTA6Jow')
    password = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
    return password.toString()
  }
}
