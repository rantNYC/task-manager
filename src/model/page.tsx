export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type PageProps = {
  params: {
    projectSlug: string;
    userSlug: string;
  };
  searchParams?: SearchParams;
};