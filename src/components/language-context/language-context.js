import React from 'react';

const LanguageContext = React.createContext({
    lang: 'ru',
    toggleLang: () => {}
});

export default LanguageContext;