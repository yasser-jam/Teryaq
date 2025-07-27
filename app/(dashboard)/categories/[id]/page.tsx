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
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CATEGORY_SCHEMA } from '@/lib/schema';
import { successToast } from '@/lib/toast';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  type FormData = z.infer<typeof CATEGORY_SCHEMA>;

  const form = useForm<FormData>({
    resolver: zodResolver(CATEGORY_SCHEMA),
    defaultValues: {
      name: '',
      name_ar: '',
    },
  });

  const { data: category } = useQuery({
    queryKey: ['category', id],
    queryFn: () => api(`/categories/${id}`),
    enabled: id !== 'create',
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category, form]);

  const goBack = () => {
    router.replace('/categories');
  };

  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (data: FormData) =>
      api('/categories', {
        method: 'POST',
        body: {
          name: data.name,
          languageCode: 'en',
          translations: [
            {
              name: data.name_ar,
              languageCode: 'ar',
            },
          ],
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      successToast('Category created successfully');
      goBack();
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormData) =>
      api(`/categories/${id}`, {
        method: 'PUT',
        body: {
          name: data.name,
          languageCode: 'en',
          translations: [
            {
              name: data.name_ar,
              languageCode: 'ar',
            },
          ],
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      successToast('Category updated successfully');
      goBack();
    },
  });

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
        subtitle={
          id === 'create' ? 'Add a new category' : 'Update category details'
        }
        className='w-[500px]'
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name_ar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name (Arabic)</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter category name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center gap-2 justify-end mt-4'>
              <Button variant='ghost' onClick={goBack}>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isCreating || isUpdating}
                loading={isCreating || isUpdating}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </BasePageDialog>
    </>
  );
}
