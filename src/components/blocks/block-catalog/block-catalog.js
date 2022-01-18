import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import BlockCatalogPresent from "./block-catalog-present";


export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`json/production-${lang.lang}.json`}>
            <BlockCatalogPresent/>
        </DynamicImport>
    );
}