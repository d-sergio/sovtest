import React, { useContext } from "react";
import BlockSeriesPresent from "./block-series-present";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`json/production-${lang.lang}.json`}>
            <BlockSeriesPresent/>
        </DynamicImport>
    );
}
