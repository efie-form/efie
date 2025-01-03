import { FormBuilder, FormSchema } from '@efie-form/react';
import { useEffect, useRef, useState } from 'react';

const data: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'flfCYesTVJ',
        type: 'page',
        children: [
          {
            id: 'dKodphlJIN',
            type: 'block',
            children: [
              {
                type: 'longText',
                id: 'TLxvJNtKjf',
                props: {
                  label: 'Long Text',
                  placeholder: 'Enter the placeholder',
                  required: false,
                },
              },
              {
                type: 'multipleChoices',
                id: 'UctxtDDfYO',
                props: {
                  label: 'Multiple Choice',
                  options: [
                    {
                      label: 'Option 1',
                      value: 'Option 1',
                    },
                    {
                      label: 'Option 2',
                      value: 'Option 2',
                    },
                    {
                      label: 'Option 3',
                      value: 'Option 3',
                    },
                  ],
                  isValueDifferent: false,
                  required: false,
                },
              },
              {
                type: 'row',
                id: 'WXHUMjPlGG',
                children: [
                  {
                    id: 'qkOhaZGcSO',
                    type: 'column',
                    props: {
                      width: 50,
                    },
                    children: [],
                  },
                  {
                    id: 'kkPtOzRVnD',
                    type: 'column',
                    props: {
                      width: 50,
                    },
                    children: [],
                  },
                ],
              },
            ],
            props: {
              padding: {
                bottom: 16,
                left: 16,
                right: 16,
                top: 16,
              },
              margin: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
              border: {
                radius: {
                  bottomLeft: 8,
                  bottomRight: 8,
                  topLeft: 8,
                  topRight: 8,
                },
              },
              boxShadow: [
                {
                  x: 0,
                  y: 4,
                  blur: 6,
                  spread: -1,
                  color: '#00000019',
                  inset: false,
                },
                {
                  x: 0,
                  y: 2,
                  blur: 4,
                  spread: -2,
                  color: '#00000019',
                  inset: false,
                },
              ],
              bgColor: '#FFFFFF',
              color: '#494949',
            },
          },
        ],
        props: {
          name: 'Page 1',
        },
      },
    ],
  },
};

const DEFAULT_HEIGHT = 700;

function App() {
  const [value, setValue] = useState<FormSchema>(data);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);

  useEffect(() => {
    const resizeHandler = () => {
      setHeight(ref.current?.clientHeight ?? DEFAULT_HEIGHT);
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const handleDataChange = (data: FormSchema) => {
    setValue(data);
    console.log(data);
  };

  return (
    <div ref={ref} style={{ height: '100vh' }}>
      <FormBuilder height={height} value={value} onChange={handleDataChange} />
    </div>
  );
}

export default App;
