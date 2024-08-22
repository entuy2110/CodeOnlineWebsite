import { FC, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { pageTitle } from "util/page"
import { useTranslation } from "react-i18next"
import { Section } from "../../../components/SettingsLayout/Section"
import { PriceForm } from "components/PriceForm/PriceForm"
import { getPaymentMethod } from "api/api"
import { PaymentInfo } from "api/typesGenerated"


const PricePage: FC = () => {
  const { t } = useTranslation("pricePage")
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();  

  useEffect(() => {
    getPaymentMethod().then((res) => {
      setPaymentInfo(res)
    })
  },[])

  return (
    <Section title={t("title")} description={t("description")}>
      {paymentInfo && 
        <PriceForm
          paymentInfo={paymentInfo}
        />
      }

    </Section>
  )
}

export default PricePage