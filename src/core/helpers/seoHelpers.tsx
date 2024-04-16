import { Helmet } from "react-helmet";
import logofull from 'assets/img/logofull.svg';

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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logofull} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logofull} />
      </Helmet>
    </div>
  );
};
