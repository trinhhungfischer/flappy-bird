/**
 * Created by KienVN on 6/15/2016.
 */
b64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
fr.Crypt = {
    encodeXOR:function (data, key) {
        data = this.xor_encrypt(key, data);
        return this.b64_encode(data);
    },
    decodeXOR:function (data, key) {
        data = this.b64_decode(data);
        return this.xor_decrypt(key, data);
    },
    stringXOR:function (data, key) {
        var keyLength = key.length;
        var result = "";
        var length = data.length;
        cc.log(length);
        for(var i = 0; i < length; i++){
            var a = data.charCodeAt(i);
            var b = key.charCodeAt(i % keyLength);
            var tmp = String.fromCharCode(a ^ b);
            result = result + tmp;
        }
        cc.log(result);
        return result;
    },

    b64_encode:function(data) {
        var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
        if (!data) { return data; }
        do {
            o1 = data[i++];
            o2 = data[i++];
            o3 = data[i++];
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            enc += b64_table.charAt(h1) + b64_table.charAt(h2) + b64_table.charAt(h3) + b64_table.charAt(h4);
        } while (i < data.length);
        r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
    },

    b64_decode:function(data) {
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
        if (!data) { return data; }
        data += "";
        do {
            h1 = b64_table.indexOf(data.charAt(i++));
            h2 = b64_table.indexOf(data.charAt(i++));
            h3 = b64_table.indexOf(data.charAt(i++));
            h4 = b64_table.indexOf(data.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
            result.push(o1);
            if (h3 !== 64) {
                result.push(o2);
                if (h4 !== 64) {
                    result.push(o3);
                }
            }
        } while (i < data.length);
        return result;
    },
    keyCharAt:function(key, i) {
        return key.charCodeAt( Math.floor(i % key.length) );
    },
    xor_encrypt:function(key, data) {
        var self = this;
        return _.map(data, function(c, i) {
            return c.charCodeAt(0) ^ self.keyCharAt(key, i);
        });
    },
    xor_decrypt:function(key, data) {
        var self = this;
        return _.map(data, function(c, i) {
            return String.fromCharCode( c ^ self.keyCharAt(key, i) );
        }).join("");
    }
};