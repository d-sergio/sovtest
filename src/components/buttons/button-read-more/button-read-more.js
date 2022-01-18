import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonReadMorePresent from "./button-read-more-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-read-more/button-read-more-${lang.lang}.json`}>
            <ButtonReadMorePresent/>
        </DynamicImport>
    );
};