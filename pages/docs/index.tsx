import { useEffect, useState } from 'react';
import axios from '@/utils/api';

export default () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/9')
      .then(result => {
        setData(JSON.stringify(result as any, null, 2));
      });
  }, []);

  return (
    <div>
      <p>This is umi docs.</p>
      <hr />
      <div>
        <pre dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </div>
  );
};
