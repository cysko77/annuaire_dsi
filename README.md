# ANNUAIRE SI INTER ARS 👋



## 🙇 Author
#### Cyrille KOZLOWSKI
- Email: [cyrille.kozlowski@ars.sante.fr](mailto:cyrille.kozlowski@ars.sante.fr)

**Version :** 0.1


## 🛠️ Requirement

Avoir une instance KEYCLOAK démarrée (Voir repo dans Gitlab)

## 🛠️ Installation

Ajouter dans votre .bashrc

```bash
export SILL_KEYCLOAK_URL=http://${IP}:${KEYCLOAK_PORT} 
export SILL_KEYCLOAK_REALM="ars"
export SILL_KEYCLOAK_CLIENT_ID=annuaire-si-inter-ars
export SILL_KEYCLOAK_ADMIN_PASSWORD=xxxx # MODIFIER 
export SILL_KEYCLOAK_ORGANIZATION_USER_PROFILE_ATTRIBUTE_NAME="agencyName"
export SILL_README_URL=https://code.gouv.fr/sill/tos_fr.md
export SILL_TERMS_OF_SERVICE_URL=https://code.gouv.fr/sill/tos_fr.md
export SILL_JWT_ID=sub
export SILL_JWT_EMAIL=email
export SILL_JWT_ORGANIZATION=organization
export SILL_DATA_REPO_SSH_URL=https://github.com/cysko77/sill-data.git # MODIFIER
export SILL_SSH_NAME=id_ed25519
export SILL_SSH_PRIVATE_KEY="-----BEGIN OPENSSH PRIVATE KEY-----\n\n-----END OPENSSH PRIVATE KEY-----\n"
export SILL_GITHUB_TOKEN=ghp_xxxxxxx # MODIFIER 
export SILL_WEBHOOK_SECRET=xxxxxxx # MODIFIER
export SILL_API_PORT=3084 # MODIFIER [defaut :3084] A modifier par developpeur
export SILL_WEB_PORT=3000 # MODIFIER [defaut :3000] A modifier par developpeur
export SILL_IS_DEV_ENVIRONNEMENT=true
```
Ensuite:

```bash
source ~/.bashrc
# On clone ce depôt
git clone  ...
cd annuaire-si-inter.ars
chmod+x ./d
```

    

## 🧑🏻‍💻 Usage
## 
**Pour lancer  annuaire via docker:**

Ajouter .env à la racine de votre projet 

```bash
SILL_KEYCLOAK_URL=${SILL_KEYCLOAK_URL}
SILL_KEYCLOAK_REALM=${SILL_KEYCLOAK_REALM}
SILL_KEYCLOAK_CLIENT_ID=${SILL_KEYCLOAK_CLIENT_ID}
SILL_KEYCLOAK_ADMIN_PASSWORD=${SILL_KEYCLOAK_ADMIN_PASSWORD}
SILL_KEYCLOAK_ORGANIZATION_USER_PROFILE_ATTRIBUTE_NAME=${SILL_KEYCLOAK_ORGANIZATION_USER_PROFILE_ATTRIBUTE_NAME}
SILL_README_URL=${SILL_README_URL}
SILL_TERMS_OF_SERVICE_URL=${SILL_TERMS_OF_SERVICE_URL}
SILL_JWT_ID=${SILL_JWT_ID}
SILL_JWT_EMAIL=${SILL_JWT_EMAIL}
SILL_JWT_ORGANIZATION=${SILL_JWT_ORGANIZATION}
SILL_DATA_REPO_SSH_URL=${SILL_DATA_REPO_SSH_URL}
SILL_SSH_NAME=${SILL_SSH_NAME}
SILL_SSH_PRIVATE_KEY=${SILL_SSH_PRIVATE_KEY}
SILL_GITHUB_TOKEN=${SILL_GITHUB_TOKEN}
SILL_WEBHOOK_SECRET=${SILL_WEBHOOK_SECRET}
SILL_API_PORT=${SILL_API_PORT}
SILL_WEB_PORT=${SILL_WEB_PORT}
SILL_IS_DEV_ENVIRONNEMENT=${SILL_IS_DEV_ENVIRONNEMENT}
```
Enfin modifier le fichier web/src/urls.ts

```bash
vim web/src/urls.ts
# A la dernière ligne, replacer localhost par IP serveur  et port  3000 par le port mis dans le bashrc
process.env.NODE_ENV === "development" ? "http://localhost:3000" : `${appUrl}/api`;
``` 
Et lancer le script :    
```bash
./d  
```
  
 
**Pour lancer  annuaire sans docker:**

Modifier le fichier web/src/urls.ts

```bash
vim web/src/urls.ts
# A la dernière ligne, replacer localhost par IP serveur  et port  3000 par le port mis dans le bashrc
process.env.NODE_ENV === "development" ? "http://localhost:3000" : `${appUrl}/api`;
``` 
Et lancer l' appilcation:    
```bash
yarn
cd web 
yarn prepare
cd ..
yarn run dev
```


