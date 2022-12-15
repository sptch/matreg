import styles from './info-card.module.css';

/* eslint-disable-next-line */
export interface InfoCardProps {}

const stats = [
  { name: 'Material A', stat: '71,897' },
  { name: 'Material B', stat: '58.16%' },
  { name: 'Material C', stat: '24.57%' },
  { name: 'Material D', stat: '24.57%' },
];

export function InfoCard(props: InfoCardProps) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Materials</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-blue-900 px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default InfoCard;
