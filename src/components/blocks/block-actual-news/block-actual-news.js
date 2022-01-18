import React, { useContext } from 'react';
import BlockActualNewsPresent from "./block-actual-news-present";
import DynamicImport from "../../dynamic-import/dynamic-import";
import LanguageContext from "../../language-context/language-context";


export default () => {
const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`json/posts-${lang.lang}.json`}>
            <BlockActualNewsPresent/>
        </DynamicImport>
    );
}
