import React, { useEffect, useRef } from 'react';
// Handsontable is loaded from a CDN and available on the window object
declare const Handsontable: any;

interface HandsontableWrapperProps {
  // FIX: Changed data type from any[][] to any[] to allow passing an array of objects.
  data: any[];
  colHeaders: string[];
  columns: any[];
  readOnly?: boolean;
  [key: string]: any; // Allow any other Handsontable settings
}

const HandsontableWrapper: React.FC<HandsontableWrapperProps> = ({ data, colHeaders, columns, readOnly = false, ...rest }) => {
  const hotContainer = useRef<HTMLDivElement>(null);
  const hotInstance = useRef<any>(null);

  useEffect(() => {
    if (hotContainer.current && !hotInstance.current) {
      hotInstance.current = new Handsontable(hotContainer.current, {
        data,
        colHeaders,
        columns,
        rowHeaders: true,
        readOnly,
        width: '100%',
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'all',
        className: 'htDark',
        ...rest,
      });
    }

    return () => {
      if (hotInstance.current) {
        hotInstance.current.destroy();
        hotInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hotInstance.current) {
      hotInstance.current.updateSettings({
        data,
        colHeaders,
        columns,
        readOnly,
        ...rest,
      });
    }
  }, [data, colHeaders, columns, readOnly, rest]);

  return <div ref={hotContainer} className="handsontable-container" />;
};

export default HandsontableWrapper;