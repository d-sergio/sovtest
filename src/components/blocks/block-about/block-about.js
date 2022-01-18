import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import BlockAboutPresent from "./block-about-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/blocks/block-about/block-about-${lang.lang}.json`}>
            <BlockAboutPresent/>
        </DynamicImport>
    );
};