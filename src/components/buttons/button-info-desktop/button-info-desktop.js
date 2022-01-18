import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonInfoDeskPresent from "./button-info-desktop-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-info-desktop/button-info-desktop-${lang.lang}.json`}>
            <ButtonInfoDeskPresent/>
        </DynamicImport>
    );
};