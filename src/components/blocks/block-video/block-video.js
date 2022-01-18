import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import BlockVideoPresent from "./block-video-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/blocks/block-video/block-video-${lang.lang}.json`}>
            <BlockVideoPresent/>
        </DynamicImport>
    )
};