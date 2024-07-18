import { expect } from "vitest";
import { Db } from "../core/ports/DbApi";
import { DeclarationFormData, InstanceFormData, SoftwareFormData } from "../core/usecases/readWriteSillData";

export const expectToEqual = <T>(actual: T, expected: T) => {
    expect(actual).toEqual(expected);
};

export const expectToMatchObject = <T>(actual: T, expected: Partial<T>) => {
    expect(actual).toMatchObject(expected);
};

const makeObjectFactory =
    <T>(defaultValue: T) =>
    (overloads: Partial<T> = {}): T => ({
        ...defaultValue,
        ...overloads
    });

export const createAgent = makeObjectFactory<Db.AgentRow>({
    about: "About the default agent",
    email: "default.agent@mail.com",
    organization: "Default Organization",
    isPublic: true
});

export const createDeclarationFormData = makeObjectFactory<DeclarationFormData>({
    declarationType: "user",
    os: "mac",
    serviceUrl: "https://example.com",
    usecaseDescription: "My description",
    version: "1"
});

export const createSoftwareFormData = makeObjectFactory<SoftwareFormData>({
    softwareType: {
        type: "desktop/mobile",
        os: {
            windows: true,
            linux: true,
            mac: true
        }
    },
    externalId: "Q171985",
    comptoirDuLibreId: undefined,
    softwareName: "Some software",
    softwareDescription: "Some software description",
    softwareLicense: "Some software license",
    softwareMinimalVersion: "1.0.0",
    isPresentInSupportContract: true,
    isFromFrenchPublicService: true,
    similarSoftwareExternalDataIds: ["some-external-id"],
    softwareLogoUrl: "https://example.com/logo.png",
    softwareKeywords: ["some", "keywords"],
    doRespectRgaa: true
});
export const createInstanceFormData = makeObjectFactory<InstanceFormData>({
    organization: "Default organization",
    targetAudience: "Default audience",
    mainSoftwareSillId: 1,
    otherSoftwareWikidataIds: [],
    publicUrl: "https://example.com"
});
