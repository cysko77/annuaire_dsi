import { memo } from "react";
import { declareComponentKeys } from "i18nifty";
import { useTranslation, useResolveLocalizedString } from "ui/i18n";
import type { Link } from "type-route";
import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss-react/dsfr";
import { useFromNow } from "ui/useMoment";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import Tooltip from "@mui/material/Tooltip";
import { DetailUsersAndReferents } from "ui/shared/DetailUsersAndReferents";
import softwareLogoPlaceholder from "ui/assets/software_logo_placeholder.png";
import { Markdown } from "keycloakify/tools/Markdown";

export type Props = {
  className?: string;
  logoUrl?: string;
  softwareName: string;
  prerogatives: {
    isFromFrenchPublicServices: boolean;
    isInstallableOnUserComputer: boolean;
    isSoftwareHasHealthData: boolean;
  };
  latestVersion?: {
    semVer: string;
    publicationTime: number;
  };
  softwareDescription: string;
  userCount: number;
  referentCount: number;
  softwareUsersAndReferentsLink: Link;
  declareFormLink: Link;
  testUrl?: string;
  softwareDetailsLink: Link;
  searchHighlight:
  | {
    searchChars: string[];
    highlightedIndexes: number[];
  }
  | undefined;
  userDeclaration:
  | {
    isUser: boolean;
    isReferent: boolean;
  }
  | undefined;
};

export const SoftwareCatalogCard = memo((props: Props) => {
  const {
    className,
    logoUrl,
    softwareName,
    prerogatives,
    latestVersion,
    softwareDescription,
    userCount,
    referentCount,
    softwareUsersAndReferentsLink,
    softwareDetailsLink,
    declareFormLink,
    testUrl,
    searchHighlight,
    userDeclaration,
    ...rest
  } = props;

  /** Assert to make sure all props are deconstructed */
  assert<Equals<typeof rest, {}>>();

  const { t } = useTranslation({ SoftwareCatalogCard });
  const { resolveLocalizedString } = useResolveLocalizedString();
  const { classes, cx } = useStyles({
    "isSearchHighlighted": searchHighlight !== undefined
  });
  const { fromNowText } = useFromNow({ "dateTime": latestVersion?.publicationTime });

  return (
    <div className={cx(fr.cx("fr-card"), classes.root, className)}>
      <div className={classes.cardBody}>
        <a className={cx(classes.headerContainer)} {...softwareDetailsLink}>
          <div className={classes.logoWrapper}>
            <img
              className={cx(classes.logo)}
              src={logoUrl ?? softwareLogoPlaceholder}
              alt={"software logo"}
            />
          </div>

          <div className={cx(classes.header)}>
            <div className={cx(classes.titleContainer)}>
              <h3 className={cx(classes.title)}>{softwareName}</h3>
              <div className={cx(classes.titleActionsContainer)}>
                {prerogatives.isInstallableOnUserComputer && (
                  <Tooltip title={t("hasDesktopApp")} arrow>
                    <i className={fr.cx("fr-icon-computer-line")} />
                  </Tooltip>
                )}
                {prerogatives.isFromFrenchPublicServices && (
                  <Tooltip title={t("isFromFrenchPublicService")} arrow>
                    <i className={fr.cx("fr-icon-france-line")} />
                  </Tooltip>
                )}
                {prerogatives.isSoftwareHasHealthData && (
                  <Tooltip title={t("isSoftwareHasHealthDataD")} arrow>
                    <i
                      className={fr.cx(
                        "fr-icon-questionnaire-line"
                      )}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            {userDeclaration?.isReferent ? (
              <span
                className={fr.cx(
                  "fr-badge--no-icon",
                  "fr-badge--blue-cumulus",
                  "fr-badge",
                  "fr-badge--sm",
                  "fr-mb-1v"
                )}
              >
                {t("you are referent")}
              </span>
            ) : userDeclaration?.isUser ? (
              <span
                className={fr.cx(
                  "fr-badge--no-icon",
                  "fr-badge--green-archipel",
                  "fr-badge",
                  "fr-badge--sm",
                  "fr-mb-1v"
                )}
              >
                {t("you are user")}
              </span>
            ) : null}
            <div>
              {latestVersion !== undefined && (
                <p
                  className={cx(
                    fr.cx("fr-card__detail"),
                    classes.softwareVersionContainer
                  )}
                >
                  {t("latest version", { fromNowText })}
                  <span
                    className={cx(
                      fr.cx(
                        "fr-badge--no-icon",
                        "fr-badge--yellow-tournesol",
                        "fr-badge",
                        "fr-badge--sm"
                      ),
                      classes.badgeVersion
                    )}
                  >
                    {latestVersion.semVer}
                  </span>
                </p>
              )}
            </div>
          </div>
        </a>

        <div className={cx(fr.cx("fr-card__desc"), classes.description)}>
          {searchHighlight !== undefined && (
            <p className={cx(fr.cx("fr-text--xs"), classes.searchHighlight)}>
              {searchHighlight.searchChars.map((char, i) =>
                searchHighlight.highlightedIndexes.includes(i) ? (
                  <span key={i}>{char}</span>
                ) : (
                  char
                )
              )}{" "}
            </p>
          )}

          <Markdown>{resolveLocalizedString(softwareDescription)}</Markdown>
        </div>

        <DetailUsersAndReferents
          seeUserAndReferent={
            referentCount > 0 || userCount > 0
              ? softwareUsersAndReferentsLink
              : undefined
          }
          referentCount={referentCount}
          userCount={userCount}
          className={classes.detailUsersAndReferents}
        />
      </div>
      <div className={classes.footer}>
        {!userDeclaration?.isReferent && !userDeclaration?.isUser && (
          <a
            className={cx(
              fr.cx("fr-btn", "fr-btn--secondary", "fr-text--sm"),
              classes.declareReferentOrUserButton
            )}
            {...declareFormLink}
          >
            {t("declare oneself referent")}
          </a>
        )}
        <div className={cx(classes.footerActionsContainer)}>
          <a className={cx(classes.footerActionLink)} {...softwareDetailsLink}>
            <i className={fr.cx("fr-icon-arrow-right-line")} />
          </a>
        </div>
      </div>
    </div>
  );
});

const useStyles = tss
  .withName({ SoftwareCatalogCard })
  .withParams<{ isSearchHighlighted: boolean }>()
  .create(({ isSearchHighlighted }) => ({
    "root": {
      "backgroundColor": fr.colors.decisions.background.default.grey.default,
      "&&&": {
        ...fr.spacing("padding", {
          "topBottom": "7v",
          "rightLeft": "6v"
        }),
        [fr.breakpoints.down("md")]: {
          ...fr.spacing("padding", {
            "topBottom": "5v",
            "rightLeft": "3v"
          })
        }
      }
    },
    "searchHighlight": {
      "fontStyle": "italic",
      "color": fr.colors.decisions.text.mention.grey.default,
      "& > span": {
        "color": fr.colors.decisions.text.active.blueFrance.default,
        "fontWeight": "bold"
      }
    },
    "cardBody": {
      "height": "100%",
      "display": "flex",
      "flexDirection": "column",
      "marginBottom": fr.spacing("8v")
    },
    "headerContainer": {
      "display": "flex",
      "alignItems": "center",
      "marginBottom": fr.spacing("4v"),
      "backgroundImage": "unset"
    },
    "header": {
      "width": "100%"
    },
    "logoWrapper": {
      "width": fr.spacing("14v"),
      "aspectRatio": "auto 1/1",
      "marginRight": fr.spacing("3v"),
      "overflow": "hidden"
    },
    "logo": {
      "height": "100%"
    },
    "titleContainer": {
      "display": "flex",
      "justifyContent": "space-between"
    },
    "title": {
      "margin": 0,
      "color": fr.colors.decisions.text.title.grey.default,
      "display": "-webkit-box",
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": "1",
      "whiteSpace": "pre-wrap",
      "overflow": "hidden"
    },
    "titleActionsContainer": {
      "display": "flex",
      "alignItems": "center",
      "gap": fr.spacing("2v"),
      "&>i": {
        "color": fr.colors.decisions.text.title.blueFrance.default,
        "&::before": {
          "--icon-size": fr.spacing("4v")
        }
      }
    },
    "softwareVersionContainer": {
      [fr.breakpoints.down("md")]: {
        "fontSize": fr.spacing("2v")
      }
    },
    "badgeVersion": {
      ...fr.spacing("margin", { "rightLeft": "1v" }),
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "maxWidth": "30%"
    },
    "description": {
      "marginTop": 0,
      "marginBottom": fr.spacing("3v"),
      "color": fr.colors.decisions.text.default.grey.default,
      "overflow": "hidden",
      "display": "-webkit-box",
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": isSearchHighlighted ? "5" : "3",
      "whiteSpace": "pre-wrap"
    },
    "detailUsersAndReferents": {
      "order": 4,
      "marginTop": "auto"
    },
    "footer": {
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "space-between",
      [fr.breakpoints.down("md")]: {
        "flexDirection": "column",
        "justifyContent": "flex-start",
        "alignItems": "flex-start"
      }
    },
    "declareReferentOrUserButton": {
      [fr.breakpoints.down("md")]: {
        "width": "100%",
        "justifyContent": "center"
      }
    },
    "footerActionsContainer": {
      "display": "flex",
      "marginLeft": fr.spacing("4v"),
      "flex": 1,
      "justifyContent": "flex-end",
      "color": fr.colors.decisions.text.title.blueFrance.default,
      [fr.breakpoints.down("md")]: {
        "marginLeft": 0,
        "marginTop": fr.spacing("3v"),
        "gap": fr.spacing("4v"),
        "alignSelf": "end"
      }
    },
    "footerActionLink": {
      "background": "none"
    }
  }));

export const { i18n } = declareComponentKeys<
  | { K: "latest version"; P: { fromNowText: string } }
  | "declare oneself referent"
  | "hasDesktopApp"
  | "isSoftwareHasHealthDataD"
  | "isFromFrenchPublicService"
  | "you are user"
  | "you are referent"
>()({ SoftwareCatalogCard });
