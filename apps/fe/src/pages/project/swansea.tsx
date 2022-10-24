import ProjectDashboard from 'layouts/ProjectDashboard';
import { ProjectProps } from 'layouts/ProjectDashboard';
import Head from 'next/head';

export default function Test(props: ProjectProps) {
  const project: ProjectProps = {
    name: 'Swansea',
    description: 'Swansea',
    id: 'Swansea',
    buildings: [
      {
        name: 'Swansea',
        description: 'Swansea',
        id: 'Swansea',
        speckleObjects: [
          {
            server: 'https://speckle.xyz',
            streamId: '92681d64c6',
            objectId: 'fc24d43a58e94d6251416877435d3a67',
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
