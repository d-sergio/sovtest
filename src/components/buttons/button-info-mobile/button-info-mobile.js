import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonInfoMobPresent from "./button-info-mobile-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-info-mobile/button-info-mobile-${lang.lang}.json`}>
            <ButtonInfoMobPresent/>
        </DynamicImport>
    );
};