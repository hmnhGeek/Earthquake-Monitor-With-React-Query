"use client";

import store from "./store";
import { Provider } from "react-redux";
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export const ReduxProvider = ({children}: {children: React.ReactNode}) => <QueryClientProvider client={queryClient}><Provider store={store}>{children}</Provider></QueryClientProvider>;