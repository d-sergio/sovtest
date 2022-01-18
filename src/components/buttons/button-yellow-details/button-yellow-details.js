import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonYellowDetailsPresent from "./button-yellow-details-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-yellow-details/button-yellow-details-${lang.lang}.json`}>
            <ButtonYellowDetailsPresent/>
        </DynamicImport>
    );
};