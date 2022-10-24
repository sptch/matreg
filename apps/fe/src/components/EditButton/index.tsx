import styled from 'styled-components';
import { ReactComponent as EditIcon } from '@assets/icons/pencil.svg';

const StyledButton = styled.button<{ active: boolean; disabled: boolean }>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 20px;
  border-radius: 10px;

  background-color: ${({ active }) => (active ? '#374151' : '#d1d5db')};

  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? '#2c3441' : '#9ca3af')};
  }
`;

type ButtonProps = {
  onClick: () => void;
  active: boolean;
};

export function EditButton({ onClick, active }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} active={active} disabled={false}>
      <EditIcon />
    </StyledButton>
  );
}
