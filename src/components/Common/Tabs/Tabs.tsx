import { FC, KeyboardEvent, MouseEvent, ReactElement } from 'react';

interface TabsProps {
  tabs: TabProps[];
  onChange: Function;
  value: string;
}

export interface TabProps {
  disabled: boolean;
  id: string;
  title: string;
}

export const Tabs: FC<TabsProps> = ({ tabs, onChange, value }): ReactElement => {
  if (!tabs || tabs.length < 1) return <></>;

  const handleClick = (event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>) => {
    let newValue = '';
    if (event.currentTarget && event.currentTarget.parentElement && event.currentTarget.parentElement.id)
      newValue = event.currentTarget.parentElement.id.replace('tab-', '');
    if (onChange) onChange(event, newValue);
  };

  return (
    <ul className="nav nav-tabs">
      {tabs.map((tab) => {
        const { disabled, id, title } = tab;
        return (
          <li className="nav-item" id={`tab-${id}`} key={id}>
            <span
              className={`
                nav-link
                ${value === id ? ' active' : ''}
                ${disabled ? ' disabled' : ''}
              `}
              role="button"
              tabIndex={0}
              onKeyUp={handleClick}
              onClick={handleClick}
            >
              {title}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

interface TabPanelProps {
  className: string;
  id: string;
  value: string;
}

export const TabPanel: FC<TabPanelProps> = ({ children, className, id, value }) => {
  return (
    <div
      className={`${className ? className + ' ' : ''}tabpanel${id !== value ? ' hidden' : ''}`}
      id={`tabpanel-${id}`}
    >
      {children}
    </div>
  );
};
