import { FormControl, InputLabel,Select, MenuItem, makeStyles, TextField, Divider } from "@material-ui/core";
import { getLanguagePackage } from "api/api";
import { exec } from "child_process";
import { Margins } from "components/Margins/Margins";
import { PackageCard } from "components/PackageCard/PackageCard";
import { PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "components/PageHeader/PageHeader";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useTranslation } from 'react-i18next'

export interface InstallPageViewProps {
  language?: string
}

export const InstallPageView : FC<
  React.PropsWithChildren<InstallPageViewProps>
>  = ({
  language
}) => {
  const [packages, setPackages] = useState<string[]>([])
  const styles = useStyles()
  useEffect(() => {
    if (language) {
      getLanguagePackage(language).then((res) => {
        const packageArr = res.split('\n')
        for(let i = 2; i < packageArr.length - 1; i++) {
          setPackages(prevArray => [...prevArray, packageArr[i]])
        }
      })
    } 
  },[])

  return (
    <Margins>
      <div className={styles.console_container}>
        <div>
          <TextField
            fullWidth
            id="package"
            label="Package"
            type="text"
            variant="outlined"
          />
        </div>
      </div>
      {/* <hr style={{top: "19%", position: "fixed", width: "88%" }}/> */}
      <div className={styles.package_container}>
        {packages.map((pkg, i) => {
          const package_name = pkg.replace(/\s\s+/g, ' ').split(" ")[0]
          const version = pkg.replace(/\s\s+/g, ' ').split(" ")[1]
          return (
            <PackageCard
              key={"package_"  + i}
              package_name={package_name}
              version={version}
            />
          )
        })}
      </div>
    </Margins>  
  )
}

const useStyles = makeStyles((theme) => ({
  package_container: {
    top: "20%",
    height: "65%",
    width: "88%",
    overflowY: "auto",
    position: "fixed",
    marginTop: "20px",
    flexDirection: "row",
    flex: "1",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: theme.spacing(1),
    gridAutoRows: "min-content",
  },
  console_container: {
    top: "10%",
    height: "15%",
    width: "88%",
    position: "fixed"
  },
  console_text: {
    overflowY: "auto",
    height: "85%",
  }
}))