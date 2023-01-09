export default {
    port: 1337,
    dbUri: "mongodb://127.0.0.1:27017/nodets-rest-api",
    saltWorkFactor: 10,
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '1y',
    privateKey: "",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAweSubafRsgP9wCIT1bCB
NDMh3zffL4qvVGTDqooloZEGZ8/QD0lh9n1zDn6nB1/oKs0Jnkqc3peSViqhJIDy
mXUUOoHaOqXjUt7TrvEvQ2ncI4ucjsWLLTksCc8+BLNpfKV45V2z7CSyh55E0/SA
kF8YmABNfKb6Fv4WU2qBM2vmaYGPFV5klr7V+5xxA8SoGP8lVZrkFbgPWrsfh4mW
AREc48CZ3wWBisFKj+IoPXrm08V7I7QwtuGXgy52vBmYPXDaX3EV3qPuHbRP6c1h
qTNBwUvLDbplI/cwHxQre8zm4Uqnr42zOtpLEjYoqAdSQJP/U4otSCm+W3/3yt+9
OQIDAQAB
-----END PUBLIC KEY-----`
}