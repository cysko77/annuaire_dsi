//This is just a helper to generate the regexp that defines email allowed to register
//the actual regexp is configured in keycloak.
//https://user-images.githubusercontent.com/6702424/158169264-e3832e38-741f-49d8-9afd-6f855f7ccb4b.png
//
//NOTE: The output is for the JSON Editor (if you put it in the form you the backslashes get doubled)

//ts-node --skip-project src/bin/emails_domain_accept_list_helper.ts

import {
    emailDomainsToRegExpStr,
    //regExpStrToEmailDomains,
} from "../ui/components/KcApp/emailDomainAcceptListHelper";

/*
const emailDomains = regExpStrToEmailDomains(
    "^[^@]+@([^.]+\\.)*((gouv\\.fr)|(sorbonne-universite\\.fr)|(ac-dijon\\.fr)|(insee\\.fr)|(montreuil\\.fr)|(ac-versailles\\.fr)|(inserm\\.fr)|(cnafmail\\.fr)|(ac-grenoble\\.fr)|(univ-lille\\.fr)|(univ-nantes\\.fr)|(obspm\\.fr)|(ac-orleans-tours\\.fr)|(ac-rennes\\.fr)|(adullact\\.org)|(ac-toulouse\\.fr)|(ac-paris\\.fr)|(pole-emploi\\.fr)|(unistra\\.fr)|(cea\\.fr)|(telecom-st-etienne\\.fr)|(assurance-maladie\\.fr)|(diderot\\.org)|(recia\\.fr)|(inha\\.fr)|(imt\\.fr)|(telecom-paris\\.fr)|(st-etienne\\.archi\\.fr)|(amue\\.fr))$"
);

console.log(emailDomains);
*/

const emailDomains = [
    "gouv.fr",
    "sorbonne-universite.fr",
    "ac-dijon.fr",
    "insee.fr",
    "montreuil.fr",
    "ac-versailles.fr",
    "inserm.fr",
    "cnafmail.fr",
    "ac-grenoble.fr",
    "univ-lille.fr",
    "univ-nantes.fr",
    "obspm.fr",
    "ac-orleans-tours.fr",
    "ac-rennes.fr",
    "adullact.org",
    "ac-toulouse.fr",
    "ac-paris.fr",
    "pole-emploi.fr",
    "unistra.fr",
    "cea.fr",
    "telecom-st-etienne.fr",
    "assurance-maladie.fr",
    "diderot.org",
    "recia.fr",
    "inha.fr",
    "imt.fr",
    "telecom-paris.fr",
    "st-etienne.archi.fr",
    "amue.fr",
    "ac-clermont.fr",
    "Ac-grenoble.fr",
    "Ac-lyon.fr",
    "Ac-Besancon.fr",
    "Ac-dijon.fr",
    "Ac-rennes.fr",
    "Ac-nantes.fr",
    "ac-orleans-tours.fr",
    "Ac-montpellier.fr",
    "Ac-toulouse.fr",
    "ac-nancy-metz.fr",
    "Ac-strasbourg.fr",
    "Ac-reims.fr",
    "Ac-bordeaux.fr",
    "Ac-poitiers.fr",
    "Ac-limoges.fr",
    "Ac-spm.fr",
    "Ac-lille.fr",
    "Ac-amiens.fr",
    "Ac-caen.fr",
    "Ac-rouen.fr",
    "ac-noumea.nc",
    "ac-polynesie.pf",
    "Ac-wf.wf",
    "Ac-corse.fr",
    "ac-guadeloupe.fr",
    "Ac-guyane.fr",
    "Ac-paris.fr",
    "Ac-creteil.fr",
    "Ac-versailles.fr",
    "ac-reunion.fr",
    "ac-martinique.fr",
    "Ac-mayotte.fr",
    "Ac-Aix-Marseille.fr",
    "Ac-nice.fr",
    "Ac-normandie",
    "région académique",
    "region-academique-aura.fr",
    "region-academique-auvergne-rhone-alpes.fr",
    "region-academique-bfc.fr",
    "region-academique-bourgogne-franche-comte.fr",
    "region-academique-bretagne.fr",
    "region-academique-centre-val-de-loire.fr",
    "region-academique-corse.fr",
    "region-academique-grand-est.fr",
    "region-academique-guadeloupe.fr",
    "region-academique-guyane.fr",
    "region-academique-hauts-de-france.fr",
    "region-academique-idf.fr",
    "region-academique-ile-de-france.fr",
    "region-academique-martinique.fr",
    "region-academique-mayotte.fr",
    "region-academique-normandie.fr",
    "region-academique-nouvelle-aquitaine.fr",
    "region-academique-occitanie.fr",
    "region-academique-paca.fr",
    "region-academique-pays-de-la-loire.fr",
    "region-academique-provence-alpes-cote-dazur.fr",
    "region-academique-reunion.fr",
    "hceres.gouv.fr",
    "hceres.fr",
    "renater.fr",
    "reseau-canope.fr",
    "cned.fr",
    "ac-cned.fr",
    "education.gouv.fr",
    "igesr.gouv.fr",
    "recherche.gouv.fr",
    "enseignementsup.gouv.fr",
    "onisep.fr",
    "ih2ef.gouv.fr",
    "sports.gouv.fr",
    "jeunesse-sports.gouv.fr",
    "service-civique.gouv.fr",
    "diges.gouv.fr",
    "unilim.fr",
    "ehess.fr",
    "univ-lyon1.fr",
    "crtc.ccomptes.fr",
    "utc.fr",
    "centralesupelec.fr",
    "univ-lyon2.fr",
    "cnrs.fr",
    "universite-paris-saclay.fr",
    "inrae.fr",
    "inserm.fr",
    "univ-angers.fr",
    "univ-st-etienne.fr",
    "mipih.fr",
    "latmos.ipsl.fr",
    "uvsq.fr",
    "conseiller-numerique.fr",
    "shom.fr",
    "univ-rennes2.fr",
].map(domain => domain.toLowerCase());

const regExpStr = emailDomainsToRegExpStr(emailDomains);

console.log(regExpStr);

export {};

/*

import { parse as csvParseSync } from "csv-parse/sync";
import { id } from "tsafe/id";
import * as fetch from "node-fetch";

//ts-node --skip-project src/bin/wip.ts

function rawCsvFileToRawCsvRows(params: {
	rawCsvFile: string;
}): Record<string, string>[] {
	const { rawCsvFile } = params;
	return csvParseSync(rawCsvFile, {
		"columns": true,
		"skip_empty_lines": true,
	});
}

(async () => {

	const rawCsvFile = await fetch.default("https://raw.githubusercontent.com/etalab/noms-de-domaine-organismes-publics/master/domains.csv")
		.then(resp => resp.text());

	const rawCsvRows = rawCsvFileToRawCsvRows({ rawCsvFile });

	const x = rawCsvRows
		.map(({ name }) => name)
		.filter(name => !name.startsWith("www"))
		.reduce((acc, curr)=> {

		}, id<string[]>([]) );


	console.log(x);


})();


*/
