import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import BlockNewsfeedPresent from "./block-newsfeed-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`json/posts-${lang.lang}.json`}>
            <BlockNewsfeedPresent/>
        </DynamicImport>
    );
};