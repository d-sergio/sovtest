import React, { useContext } from "react";
import LanguageContext from "../../language-context/language-context";
import DynamicImport from "../../dynamic-import/dynamic-import";
import CardTopnewsPresent from "./card-topnews-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`json/posts-${lang.lang}.json`}>
            <CardTopnewsPresent/>
        </DynamicImport>
    );
};