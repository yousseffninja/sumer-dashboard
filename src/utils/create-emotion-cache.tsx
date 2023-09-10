import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export const createEmotionCache = () => {
  return cacheRtl;
};
