import "../styles/globals.css";
import "yet-another-react-lightbox/styles.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="NSM 微博 - 随时随地分享新鲜事"
        description="使用 Next.js 和 strapi 模仿的简易版微博系统"
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
