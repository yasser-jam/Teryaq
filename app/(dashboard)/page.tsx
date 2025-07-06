import { DataTable } from '@/components/data-table';

import data from './data.json';

export default function Dashboard() {
  return (
    <>
      <DataTable data={data} />

      <div>test</div>
    </>
  );
}
