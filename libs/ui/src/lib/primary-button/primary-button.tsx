import styles from './primary-button.module.css';

/* eslint-disable-next-line */
export interface PrimaryButtonProps {}

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Button text
      </button>
    </div>
  );
}

export default PrimaryButton;
