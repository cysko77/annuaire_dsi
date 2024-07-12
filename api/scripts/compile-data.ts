import { bootstrapCore } from "../src/core";
import { env } from "../src/env";

(async () => {
    const { core } = await bootstrapCore({
        "dbConfig" : {
            dbKind:"git",
            dataRepoSshUrl: env.dataRepoSshUrl,
            sshPrivateKey: env.sshPrivateKeyForGit,
            sshPrivateKeyName: env.sshPrivateKeyForGitName,
        },
        "keycloakUserApiParams": env.keycloakParams,
        "githubPersonalAccessTokenForApiRateLimit": env.githubPersonalAccessTokenForApiRateLimit,
        "doPerPerformPeriodicalCompilation": false,
        "doPerformCacheInitialization": false,
        "externalSoftwareDataOrigin": env.externalSoftwareDataOrigin
    });

    await core.functions.readWriteSillData.manuallyTriggerNonIncrementalCompilation();

    process.exit(0);
})();
