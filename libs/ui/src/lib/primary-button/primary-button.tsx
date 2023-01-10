import styles from './primary-button.module.css';

/* eslint-disable-next-line */
export interface PrimaryButtonProps {}

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center rounded border border-transparent bg-red-700 px-2.5 py-1.5 text-9xl font-medium text-black shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        I'm Blue
      </button>
    </div>
  );
}

export default PrimaryButton;
