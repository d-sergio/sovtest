import React, { useContext } from "react";
import LanguageContext from "../language-context/language-context";
import DynamicImport from "../dynamic-import/dynamic-import";
import SubscribeFormPresent from "./subscribe-form-present";

export default () => {
    const lang = useContext(LanguageContext);

    return(
        <DynamicImport src={`components/subscribe-form/subscribe-form-${lang.lang}.json`}>
            <SubscribeFormPresent/>
        </DynamicImport>
    );
};