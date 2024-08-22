import { FC, PropsWithChildren, ReactNode } from "react"
import { useTranslation } from "react-i18next"

import {
  Laptop,
  Code,
  Build,
  LocationOn,
  Group,
  History,
  Mail,
  ArrowForward,
} from "@material-ui/icons"
import { makeStyles } from "@material-ui/core"
import { Margins } from "components/Margins/Margins"
import { Link } from "react-router-dom"
import { combineClasses } from "util/combineClasses"

export const LandingPageView: FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.pageContainer}>
      <Header />
      <Hero />
      <Section1 />
      <Features />
      <Footer />
    </div>
  )
}

const Header: FC = () => {
  const { t } = useTranslation("landingPage")
  const styles = useStyles()
  return (
    <Margins>
      <header className={styles.header}>
        <div className={styles.logo}>{t("name")}</div>
        <nav>
          <ul className={styles.navList}>
            <li>
              <a className={styles.link} href="#introduction">
                {t("introduction")}
              </a>
            </li>
            <li>
              <a className={styles.link} href="#features">
                {t("features")}
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href="https://www.canva.com/design/DAFi56vh7bc/hqAS3x4ejuOkFdnRql2RcA/view?utm_content=DAFi56vh7bc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
                target="_blank"
              >
                {t("slides")}
              </a>
            </li>
            <li>
              <Link className={styles.link} to="/login">
                {t("authentication")}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Margins>
  )
}

const Hero: FC = () => {
  const { t } = useTranslation("landingPage")
  const styles = useStyles()

  return (
    <Margins>
      <section className={styles.hero}>
        <div style={{ flex: 1 }}>
          <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
          <p className={styles.p}>{t("heroP1")}</p>
          <p
            className={styles.p}
            dangerouslySetInnerHTML={{ __html: t("heroP2") }}
          ></p>
          <Link style={{textDecoration: "none"}} to="/projects">
            <div className={styles.cta}>
              {t("cta")}
              <ArrowForward />
            </div>
          </Link>
        </div>
        <div style={{ flex: 1 }}>
          <video
            className={styles.demo}
            autoPlay
            loop
            muted
            src="/media/videos/demo.mp4"
          ></video>
        </div>
      </section>
    </Margins>
  )
}

const Section1: FC = () => {
  const { t } = useTranslation("landingPage")
  const styles = useStyles()

  return (
    <Margins>
      <section className={styles.section1} id="introduction">
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img src="/media/images/group2.png" alt="" width="80%" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ width: "85%", paddingTop: 40 }}>
            <h1 className={styles.subtitle}>
              {t("subHeader1")} <br />
              <span
                className={combineClasses([styles.heroTitle, styles.whyTitle])}
              >
                {t("header1")}
              </span>
            </h1>
            <p className={styles.p}>{t("p1_1")}</p>
            <p className={styles.p}>{t("p1_2")}</p>
          </div>
        </div>
      </section>
    </Margins>
  )
}

const Features: FC = () => {
  const { t } = useTranslation("landingPage")
  const styles = useStyles()

  return (
    <section className={styles.advantagesSection} id="features">
      <Margins>
        <h2
          className={combineClasses([styles.heroTitle, styles.advantageTitle])}
        >
          Advantages
        </h2>
        <ul className={styles.featureList}>
          <Feature
            icon={<Laptop fontSize="inherit" />}
            title={t("f1Title")}
            description={t("f1Des")}
          />
          <Feature
            icon={<Build fontSize="inherit" />}
            title={t("f2Title")}
            description={t("f2Des")}
          />
          <Feature
            icon={<Code fontSize="inherit" />}
            title={t("f3Title")}
            description={t("f3Des")}
          />
          <Feature
            icon={<Group fontSize="inherit" />}
            title={t("f4Title")}
            description={t("f4Des")}
          />
          <Feature
            icon={<LocationOn fontSize="inherit" />}
            title={t("f5Title")}
            description={t("f5Des")}
          />
          <Feature
            icon={<History fontSize="inherit" />}
            title={t("f6Title")}
            description={t("f6Des")}
          />
        </ul>
      </Margins>
    </section>
  )
}
interface FeatureProps {
  title: string
  description: string
  icon: ReactNode
}
const Feature: FC<FeatureProps> = ({ title, description, icon }) => {
  const styles = useStyles()

  return (
    <li className={styles.feature}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDes}>{description}</p>
    </li>
  )
}

const Footer: FC = () => {
  const { t } = useTranslation("landingPage")
  const styles = useStyles()

  return (
    <footer className={styles.footer}>
      <Margins>
        <div className={styles.logo}>{t("name")}</div>
        <h3>{t("comp")}</h3>
        <p className={styles.detail}>
          <Mail fontSize="inherit" /> {t("mail")}
        </p>
      </Margins>
    </footer>
  )
}

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    background: "#0e1924",
  },
  logo: {
    ...theme.typography.h4,
    fontWeight: 600,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
    padding: "20px 0",
  },
  navList: {
    display: "flex",
    listStyleType: "none",
    gap: "40px",
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  hero: {
    display: "flex",
    padding: "80px 0 160px 0",
    gap: "40px",
  },
  heroTitle: {
    fontSize: "54px",
    fontWeight: 600,
    lineHeight: 1.2,
    margin: 0,
  },
  subtitle: {
    ...theme.typography.h3,
    fontWeight: 600,
    margin: 0,
  },
  whyTitle: {
    lineHeight: 1.6,
    color: theme.palette.primary.light,
  },
  p: {
    ...theme.typography.subtitle1,
  },
  demo: {
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    width: "620px",
    boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px, 
      rgba(0, 0, 0, 0.12) 0px -12px 30px, 
      rgba(0, 0, 0, 0.12) 0px 4px 6px, 
      rgba(0, 0, 0, 0.17) 0px 12px 13px, 
      rgba(0, 0, 0, 0.09) 0px -3px 5px`,
  },
  cta: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: "20px",
    width: "fit-content",
    padding: "20px 30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderRadius: "18px",
    transition: "all 0.3s ease",
    "&:hover": {
      background: theme.palette.primary.dark
    }
  },
  section1: {
    display: "flex",
    gap: "40px",
    paddingBottom: "130px",
  },
  advantagesSection: {
    background: "azure",
    color: theme.palette.common.black,
    textAlign: "center",
    padding: "100px 0",
  },
  advantageTitle: {
    color: theme.palette.common.black,
    paddingBottom: "60px",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60px",
    height: "60px",
    background: theme.palette.background.default,
    color: theme.palette.primary.light,
    borderRadius: "50%",
    fontSize: "34px",
  },
  featureTitle: {
    ...theme.typography.h4,
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "20px 0 10px 0",
  },
  featureDes: {
    ...theme.typography.subtitle2,
    margin: 0,
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
    alignSelf: "center",
    justifySelf: "center",
  },
  featureList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "0px",
    margin: "0px",
    gap: "50px",
  },
  footer: {
    textAlign: "center",
    padding: "60px 0",
  },
  detail: {
    ...theme.typography.body1,
  },
}))
