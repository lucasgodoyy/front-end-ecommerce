
import { GlobalStyle } from '@styles/GlobalStyle';
import { defaultTheme } from '@styles/themes/defaultTheme';


import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
