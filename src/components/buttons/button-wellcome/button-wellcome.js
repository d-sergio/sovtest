import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonWellcomePresent from "./button-wellcome-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-wellcome/button-wellcome-${lang.lang}.json`}>
            <ButtonWellcomePresent/>
        </DynamicImport>
    );
};