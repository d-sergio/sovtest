import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonSimpleReadPresent from "./button-simple-read-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-simple-read/button-simple-read-${lang.lang}.json`}>
            <ButtonSimpleReadPresent/>
        </DynamicImport>
    );
};