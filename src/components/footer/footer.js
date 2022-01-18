import React, { useContext } from "react";
import LanguageContext from "../language-context/language-context";
import DynamicImport from "../dynamic-import/dynamic-import";
import FooterPresent from "./footer-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/footer/footer-${lang.lang}.json`}>
            <FooterPresent/>
        </DynamicImport>
    );
};