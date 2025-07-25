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
import { CATEGORY_SCHEMA } from '@/lib/schema';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  type FormData = z.infer<typeof CATEGORY_SCHEMA>;

  const form = useForm<FormData>({
    resolver: zodResolver(CATEGORY_SCHEMA),
    defaultValues: {
      name: '',
    }
  });

  const { data: category } = useQuery({
    queryKey: ['category', id],
    queryFn: () => api(`/categories/${id}`),
    enabled: id !== 'create'
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category, form]);

  const goBack = () => {
    router.replace('/categories');
  };

  const actions = (
    <>
      <div className='flex items-center gap-2 mt-4'>
        <Button variant='ghost' onClick={goBack}>Cancel</Button>
        <Button type='submit'>Save</Button>
      </div>
    </>
  );

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (data: FormData) => api('/categories', { method: 'POST', body: data }),
    onSuccess: () => {
      goBack();
    }
  })

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormData) => api(`/categories/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      goBack();
    }
  })

  const onSubmit = async (data: FormData) => {
    if (id === 'create') {
      createCategory(data);
    } else if (id !== 'create') {
      updateCategory(data);
    }
  };

  return (
    <>
      <BasePageDialog
        title={id === 'create' ? 'Create Category' : 'Edit Category'}
        subtitle={id === 'create' ? 'Add a new category' : 'Update category details'}
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
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter category name' {...field} />
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