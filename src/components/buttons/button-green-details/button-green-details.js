import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonGreenDetailsPresent from "./button-green-details-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-green-details/button-green-details-${lang.lang}.json`}>
            <ButtonGreenDetailsPresent/>
        </DynamicImport>
    );
};