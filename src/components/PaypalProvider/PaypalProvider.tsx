import { PayPalScriptProvider, ReactPayPalScriptOptions, destroySDKScript, getScriptID, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { getPayPalInfo } from "api/api"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const defaultOptions: ReactPayPalScriptOptions = {
  clientId: "",
  locale: "en_US"
}

const PaypalLocalListener: FC<PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation("paypal")
  const [sdkOptions, setSdkOptions] = useState<ReactPayPalScriptOptions>(defaultOptions);

  const [_, dispatch] = usePayPalScriptReducer(); 

  useEffect(() => {
    getPayPalInfo().then((info) => {
      destroySDKScript(getScriptID(sdkOptions))

      const newOptions =  {
        clientId: info.clientId,
        locale: t("locale")
      }

      dispatch({
        type: "resetOptions",
        value: newOptions
      })
      
      setSdkOptions(newOptions)
    })
  }, [i18n.language])


  return <>{children}</>
}

const PaypalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PayPalScriptProvider
      options={defaultOptions}
    >
      <PaypalLocalListener>
        {children}
      </PaypalLocalListener>
    </PayPalScriptProvider>
  )
}


export default PaypalProvider
