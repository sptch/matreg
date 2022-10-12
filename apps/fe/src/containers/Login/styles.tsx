import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
  flexbox,
  FlexProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';
import Link from 'next/link';

export const FormControl = styled.form`
    width: 100%;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-self: center;
  `,
  Header = styled.h3`
    margin-top: 44px;
    text-align: center;
    margin-bottom: 44px;
  `,
  TextField = styled.input`
    outline: none;
    border: 1px solid #ffffff;
    border-radius: 10px;
    color: #ffffff;
    background-color: transparent;
    height: 40px;
    width: 100%;
    -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0) inset !important;
    padding-left: 1rem;
  `,
  Label = styled.label`
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  `,
  Button = styled.button`
    border: 1px solid #ffffff;
    background-color: #ffffff;
    border-radius: 10px;
    outline: none;
    height: 40px;
    /* flex: 1 1 100%; */
    cursor: pointer;
    position: relative;
    > svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 1rem;
    }
  `,
  Divider = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    margin-bottom: 1rem;
  `,
  Text = styled.p``,
  SLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
    text-decoration: underline;
  `,
  Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `;
