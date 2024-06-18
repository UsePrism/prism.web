import { Helmet } from "react-helmet";
import logoFull from "assets/img/logofull.svg";

interface Props {
  title?: string;
  description?: string;
}

export const addMetaData = ({ title = "", description = "" }: Props) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logoFull} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logoFull} />
      </Helmet>
    </div>
  );
};
