import { FC, RefObject, useEffect, useRef } from 'react';
import * as CSS from 'csstype';

interface PopoverProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: Function;
  position: string;
  style: CSS.Properties;
  title: string;
}

const Popover: FC<PopoverProps> = ({ children, onClose, position, style, title }) => {
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div: HTMLDivElement | null = containerRef.current;
    if (div) {
      div.addEventListener('click', stopProp);
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      if (div) div.removeEventListener('click', stopProp);
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDocumentClick = (e: MouseEvent): void => {
    if (onClose) onClose(e);
  };

  const stopProp = (e: MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div
      className={`popover fade show bs-popover-${position ? position : 'right'}`}
      style={style ? style : {}}
      // onClick={stopProp}
      ref={containerRef}
    >
      <div className="arrow"></div>
      <h3 className="popover-header">{title}</h3>
      <div className="popover-body">{children}</div>
      <input type="button" value="Ok" />
    </div>
  );
};

export default Popover;
