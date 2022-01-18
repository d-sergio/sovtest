import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonRequestPresent from "./button-request-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-request/button-request-${lang.lang}.json`}>
            <ButtonRequestPresent/>
        </DynamicImport>
    );
};