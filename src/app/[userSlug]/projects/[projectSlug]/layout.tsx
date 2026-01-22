import { ReactNode } from 'react';
import SideNav from '@/components/SideNav';
import { prependBasePath, projectPath, sitePaths } from '@/lib/path/sitePaths';
import { PageProps } from '@/model/page';

export default async function Layout({
  children,
  params,
}: Readonly<
  {
    children: ReactNode;
  } & PageProps
>) {
  const { projectSlug, userSlug } = await params;
  const prependedPaths = prependBasePath(projectPath(userSlug, projectSlug), [
    sitePaths.homeProject,
    sitePaths.create,
    sitePaths.incomplete,
    sitePaths.complete,
    sitePaths.trash,
  ]);
  return (
    <div className="flex min-h-screen w-full justify-center">
      <SideNav paths={prependedPaths} />
      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </div>
  );
}