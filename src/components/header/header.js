import React, { useContext } from "react";
import DynamicImport from "../dynamic-import/dynamic-import";
import HeaderPresent from "./header-present";
import LanguageContext from "../language-context/language-context";

export default() => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/header/header-${lang.lang}.json`}>
            <HeaderPresent/>
        </DynamicImport>
    );

}