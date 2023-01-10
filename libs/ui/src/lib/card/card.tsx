import styles from './card.module.css';
import 'tailwindcss/tailwind.css';

/* eslint-disable-next-line */
export interface CardProps {}

export function Card(props: CardProps) {
  return (
    <>
      {/* Be sure to use this with a layout container that is full-width on mobile */}
      <div className="overflow-hidden bg-red-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2>Tada</h2>
        </div>
      </div>
    </>
  );
}

export default Card;
