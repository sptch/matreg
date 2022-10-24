import ProjectDashboard from 'layouts/ProjectDashboard';
import { ProjectProps } from 'layouts/ProjectDashboard';
import Head from 'next/head';

export default function Test(props: ProjectProps) {
  const project: ProjectProps = {
    name: 'Revit Sample',
    description: 'Revit Sample',
    id: 'revit',
    buildings: [
      {
        name: 'Revit Sample',
        description: 'Revit Sample',
        id: 'revit',
        speckleObjects: [
          {
            server: 'https://speckle.xyz',
            streamId: 'da9e320dad',
            objectId: '31d10c0cea569a1e26809658ed27e281',
          },
        ],
      },
    ],
  };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="{}" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>{project.name}</title>
      </Head>
      <ProjectDashboard {...project} />
    </>
  );
}
