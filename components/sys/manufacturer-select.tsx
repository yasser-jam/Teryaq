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
      <BaseSelect
        items={items}
        label="Manufacturer"
        onChange={onChange}
        value={props.value || ''}
        placeholder='Select Manufacturer'
      />
    </>
  );
}
