module.exports = {
    jwtSecret: 'c1988d383b8da6a9544bcede89a91adaebd2b43ee13070730d9b6920632aeecde776fc79743625981430dabe55da196dda563a7a3dade9da50d567af483763ab',
    jwtRefreshSecret : 'a996a2d226f927b40d795125a4af529278eb84ab503b8cef97e5333ac34ffcf3',
    accessTokenLife: '1h', // Durée de vie du jeton d'accès
    refreshTokenLife: '7d', // Durée de vie du jeton de rafraîchissement
    secretKey: '6LevBOUpAAAAAGtJUxvDNGi5ZlrUSeWNxfwh9ZNa', // Clé secrète du captcha
    verificationUrl: `https://www.google.com/recaptcha/api/siteverify`, // URL de vérification du captcha
    DBhost: 'localhost', // Host de la base de données
    DBuser: 'admin123', // Utilisateur de la base de données
    DBpassword: 'admin123', // Mot de passe de la base de données
    database: 'requests', // Nom de la base de données
    resetUrl: `http://localhost:3001/reset-password/token/`, // URL de la page de réinitialisation du mot de passe
    saltRounds: 10,
    mail: 'danceclubjunia@gmail.com',
    mailPass: 'jvdq ukat trfi uvdz',
    serverUrl: 'localhost:3000'
};
