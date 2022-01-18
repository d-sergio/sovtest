import React from 'react';
import RootLayout from "./src/components/root-layout/root-layout";

export const wrapRootElement = ({ element }) => <RootLayout>{element}</RootLayout>;