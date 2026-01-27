import { ReactNode } from 'react';
import { icons } from '@/components/icons/icons';

export type PathMetadata = {
  label: string;
  href: string;
  icon?: ReactNode;
};

export const sitePaths = {
  dashboard: { label: 'Dashboard', href: 'dashboard' },
  tasks: { label: 'Tasks', href: 'tasks', icon: icons.tasks },
  complete: { label: 'Complete', href: 'complete' },
  trash: {
    label: 'Trash',
    href: 'trash',
    icon: icons.trash,
  },
  projectCreate: { label: 'Project', href: 'projects/create' },
  home: {
    label: 'Home',
    href: '/',
    icon: icons.home,
  },
  create: { label: 'Create', href: 'create', icon: icons.create },
};

export const getProjectPath = ({
  userSlug,
  projectSlug,
  subpath,
  label = '',
  icon,
}: {
  userSlug: string;
  label?: string;
  projectSlug?: string;
  subpath?: string;
  icon?: ReactNode;
}): PathMetadata => ({
  href: `/${userSlug}${projectSlug ? `/projects/${projectSlug}` : '/projects'}${subpath ? `/${subpath}` : ''}`,
  label,
  icon,
});

export const prependBasePath = (basePath: string, paths: Array<PathMetadata>) => {
  return paths.map(p => prependSinglePath(basePath, p));
};

export const prependSinglePath = (basePath: string, path: PathMetadata) => {
  return {
    ...path,
    href: path.href.startsWith('/') ? `${basePath}${path.href}` : `${basePath}/${path.href}`,
  };
};