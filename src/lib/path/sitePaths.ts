export type PathMetadata = {
  label: string;
  href: string;
};

export const sitePaths = {
  dashboard: { label: 'Dashboard', href: 'dashboard' },
  incomplete: { label: 'Incomplete', href: 'incomplete' },
  complete: { label: 'Complete', href: 'complete' },
  trash: { label: 'Trash', href: 'trash' },
  project: { label: 'Project', href: 'projects' },
  projectCreate: { label: 'Project', href: 'projects/create' },
  homeProject: { label: 'Project', href: '/' },
  create: { label: 'Create', href: 'create' },
};

export const projectPath = (userSlug: string, projectSlug: string, subpath = '') =>
  `/${userSlug}/projects/${projectSlug}${subpath ? `/${subpath}` : ''}`;

export const projectsPath = (userSlug: string) => `/${userSlug}/projects`;

export const prependBasePath = (basePath: string, paths: Array<PathMetadata>) => {
  return paths.map(p => prependSinglePath(basePath, p));
};

export const prependSinglePath = (basePath: string, path: PathMetadata) => {
  return {
    ...path,
    href: path.href.startsWith('/') ? `${basePath}${path.href}` : `${basePath}/${path.href}`,
  };
};