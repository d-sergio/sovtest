import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonDownloadPresent from "./button-download-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-download/button-download-${lang.lang}.json`}>
            <ButtonDownloadPresent/>
        </DynamicImport>
    );
};