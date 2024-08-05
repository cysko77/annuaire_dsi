import * as JSONC from "comment-json";
import { z } from "zod";
import { zLocalizedString } from "./core/ports/GetSoftwareExternalData";

const zConfiguration = z.object({
    "keycloakParams": z
        .object({
            "url": z.string().nonempty(), //Example: https://auth.code.gouv.fr/auth (with the /auth at the end)
            "realm": z.string().nonempty(),
            "clientId": z.string().nonempty(),
            "adminPassword": z.string().nonempty(),
            "organizationUserProfileAttributeName": z.string().nonempty()
        })
        .optional(),
    "termsOfServiceUrl": zLocalizedString,
    "readmeUrl": zLocalizedString,
    "jwtClaimByUserKey": z.object({
        "id": z.string().nonempty(),
        "email": z.string().nonempty(),
        "organization": z.string().nonempty()
    }),
    "dataRepoSshUrl": z.string().nonempty(),
    // Like id_ed25537
    "sshPrivateKeyForGitName": z.string().nonempty(),
    // Like -----BEGIN OPENSSH PRIVATE KEY-----\nxxx ... xxx\n-----END OPENSSH PRIVATE KEY-----\n
    // You can a fake key in .env.local.sh for running yarn dev
    "sshPrivateKeyForGit": z.string().nonempty(),
    "githubWebhookSecret": z.string().nonempty().optional(),
    // Only for increasing the rate limit on GitHub API
    // we use the GitHub API for pre filling the version when adding a software
    "githubPersonalAccessTokenForApiRateLimit": z.string().nonempty(),
    //Port we listen to, default 8080
    "port": z.coerce.number().optional(),
    "isDevEnvironnement": z.boolean().optional(),
    // Completely disable this instance and redirect to another url
    "redirectUrl": z.string().optional(),
    "externalSoftwareDataOrigin": z.enum(["wikidata", "HAL"]).optional()
});

const getJsonConfiguration = () => {
    const { CONFIGURATION } = process.env;
    console.info('cyrille263');
    if (CONFIGURATION) {
        try {
            return JSONC.parse(CONFIGURATION) as any;
        } catch (error) {
            throw new Error(
                `The CONFIGURATION environnement variable is not a valid JSONC string (JSONC = JSON + Comment support)\n${CONFIGURATION}: ${String(
                    error
                )}`
            );
        }
    }

    return {
        "keycloakParams": {
            "url": process.env.SILL_KEYCLOAK_URL,
            "realm": process.env.SILL_KEYCLOAK_REALM,
            "clientId": process.env.SILL_KEYCLOAK_CLIENT_ID,
            "adminPassword": process.env.SILL_KEYCLOAK_ADMIN_PASSWORD,
            "organizationUserProfileAttributeName": process.env.SILL_KEYCLOAK_ORGANIZATION_USER_PROFILE_ATTRIBUTE_NAME
        },
        "readmeUrl": process.env.SILL_README_URL,
        "termsOfServiceUrl": process.env.SILL_TERMS_OF_SERVICE_URL,
        "jwtClaimByUserKey": {
            "id": process.env.SILL_JWT_ID,
            "email": process.env.SILL_JWT_EMAIL,
            "organization": process.env.SILL_JWT_ORGANIZATION
        },
        "dataRepoSshUrl": process.env.SILL_DATA_REPO_SSH_URL,
        "sshPrivateKeyForGitName": process.env.SILL_SSH_NAME,
        "sshPrivateKeyForGit": process.env.SILL_SSH_PRIVATE_KEY,
        "githubPersonalAccessTokenForApiRateLimit": process.env.SILL_GITHUB_TOKEN,
        "githubWebhookSecret": process.env.SILL_WEBHOOK_SECRET,
        "port": parseInt(process.env.SILL_API_PORT ?? ""),
        "isDevEnvironnement": process.env.SILL_IS_DEV_ENVIRONNEMENT?.toLowerCase() === "true",
        "externalSoftwareDataOrigin": process.env.SILL_EXTERNAL_SOFTWARE_DATA_ORIGIN
    };
};

const getValidConfiguration = (): z.infer<typeof zConfiguration> => {
    const configuration = getJsonConfiguration();
    return zConfiguration.parse(configuration);
};

const parsedCONFIGURATION = getValidConfiguration();

export const env = {
    ...parsedCONFIGURATION,
    "port": parsedCONFIGURATION.port ?? 8080,
    "isDevEnvironnement": parsedCONFIGURATION.isDevEnvironnement ?? false,
    "externalSoftwareDataOrigin": parsedCONFIGURATION.externalSoftwareDataOrigin ?? ("wikidata" as const)
};
