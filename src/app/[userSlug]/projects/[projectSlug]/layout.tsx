import { ReactNode } from 'react';
import SideNav from '@/components/SideNav';
import { getProjectPath, prependBasePath, sitePaths } from '@/lib/path/sitePaths';
import { PageProps } from '@/model/page';
import { icons } from '@/components/icons/icons';

export default async function Layout({
  children,
  params,
}: Readonly<
  {
    children: ReactNode;
  } & PageProps
>) {
  const { projectSlug, userSlug } = await params;

  const homePath = getProjectPath({ userSlug, label: 'Home', icon: icons.home });
  const projectsPath = getProjectPath({
    userSlug,
    projectSlug,
    label: 'Project',
    icon: icons.project,
  });
  const subpaths = prependBasePath(
    getProjectPath({
      userSlug,
      projectSlug,
    }).href,
    [sitePaths.create, sitePaths.trash]
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav paths={[projectsPath, ...subpaths]} footer={homePath} />
      <div className="scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-4">{children}</div>
    </div>
  );
}