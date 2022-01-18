import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import ButtonInfoSeriesPresent from "./button-info-series-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/buttons/button-info-series/button-info-series-${lang.lang}.json`}>
            <ButtonInfoSeriesPresent/>
        </DynamicImport>
    );
};