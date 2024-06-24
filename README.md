# DanceClubJunia

---------------------------------
Mise en place base de donnée MySQL
---------------------------------

1. Mettre à jour les paquets du système
```
sudo apt update
sudo apt upgrade
```

2. Installer MySQL :
```
sudo apt install mysql-server
```
3. Sécuriser l'installation de MySQL
```
sudo mysql_secure_installation
```
4. Connectez-vous à MySQL en tant que root
```
sudo mysql -u root -p
```
5. Créer une base de données et un utilisateur
```
CREATE DATABASE danceclubjunia;
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON danceclubjunia.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
6. Créer les tables

Utiliser les commandes dans le fichier creation_BDD.txt dans le dossier Back-end

7. (Bonus) Remplir les tables avec un jeu de données

Utiliser les commandes dans le fichier remplissage_BDD.txt dans le dossier Back-end

---------------------------------
Mise en place du backend
---------------------------------

Prérequis : Avoir Node.js et npm

1. Installer les dépendances

Aller dans le dossier Back-end
```
npm i
```

2. Configurer la connexion à la base de donnée

- Aller dans le fichier Back-end/config/config.js
- Modifier les informations suivante : DBhost, DBuser, DBpassword, database

3. Lancer le serveur

Dans le dossier Back-end
```
node app.js
```

---------------------------------
LANCEMENT DE L'APPLICATION FRONT
---------------------------------

- Installé nodesjs et npm sur votre machine
- Cloner le projet sur votre machine
- Ouvrir un terminal

cd root/danceclubjunia

npm install 

---------------------------------
ATTENDEZ LA FIN DE L'INSTALLATION
---------------------------------

npm start 
