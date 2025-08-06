import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { BaseSelect } from '../base/select';

interface ManufacturerSelectProps {
  value: any;
  onChange: (val: any) => void;
}

export default function ManufacturerSelect({
  onChange,
  ...props
}: ManufacturerSelectProps) {
  const { data: items } = useQuery({
    queryKey: ['manufacturers-list'],
    queryFn: () => api('/manufacturers'),
  });

  return (
    <>
      <div className='text-sm text-gray-500'>Select Manufacturer</div>
      <BaseSelect
        items={items}
        label="Manufacturer"
        itemText='name'
        itemValue='id'
        onChange={onChange}
        fullWidth
        className='mt-1'
        value={props.value || ''}
        placeholder='Select Manufacturer'
      />
    </>
  );
}
