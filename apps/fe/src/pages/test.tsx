import ProjectDashboard from 'layouts/ProjectDashboard';
import { ProjectProps } from 'layouts/ProjectDashboard';

export default function Test(props: ProjectProps) {
  const project: ProjectProps = {
    name: 'Test',
    description: 'Test',
    id: 'Test',
    buildings: [
      {
        name: 'Test',
        description: 'Test',
        id: 'Test',
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
  return <ProjectDashboard {...project} />;
}
