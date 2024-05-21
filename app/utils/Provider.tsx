"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

// next-themes require the ThemeProvider to be a client component

export const Provider = ({ children }: Props) => {
  return <ThemeProvider attribute='class'> {children}</ThemeProvider>;
};
