'use client';
import BasePageDialog from '@/components/base/page-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MANUFACTURER_SCHEMA } from '@/lib/schema';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  type FormData = z.infer<typeof MANUFACTURER_SCHEMA>;

  const form = useForm<FormData>({
    resolver: zodResolver(MANUFACTURER_SCHEMA),
    defaultValues: {
      name: '',
    }
  });

  const { data: manufacturer } = useQuery({
    queryKey: ['manufacturer', id],
    queryFn: () => api(`/manufacturers/${id}`),
    enabled: id !== 'create'
  });

  useEffect(() => {
    if (manufacturer) {
      form.reset(manufacturer);
    }
  }, [manufacturer, form]);

  const goBack = () => {
    router.replace('/manufacturers');
  };

  const actions = (
    <>
      <div className='flex items-center gap-2 mt-4'>
        <Button variant='ghost' onClick={goBack}>Cancel</Button>
        <Button type='submit'>Save</Button>
      </div>
    </>
  );

  const { mutate: createManufacturer, isPending: isCreating } = useMutation({
    mutationFn: (data: FormData) => api('/manufacturers', { method: 'POST', body: data }),
    onSuccess: () => {
      goBack();
    }
  })

  const { mutate: updateManufacturer, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormData) => api(`/manufacturers/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      goBack();
    }
  })

  const onSubmit = async (data: FormData) => {
    if (id === 'create') {
      createManufacturer(data);
    } else if (id !== 'create') {
      updateManufacturer(data);
    }
  };

  return (
    <>
      <BasePageDialog
        title={id === 'create' ? 'Create Manufacturer' : 'Edit Manufacturer'}
        subtitle={id === 'create' ? 'Add a new manufacturer' : 'Update manufacturer details'}
        className='w-[500px]'
        footer={actions}
        onOpenChange={goBack}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter manufacturer name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </BasePageDialog>
    </>
  );
} 