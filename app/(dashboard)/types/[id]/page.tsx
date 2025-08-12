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
import { TYPE_SCHEMA } from '@/lib/schema';
import { successToast } from '@/lib/toast';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  type FormData = z.infer<typeof TYPE_SCHEMA>;

  const form = useForm<FormData>({
    resolver: zodResolver(TYPE_SCHEMA),
    defaultValues: {
      name: '',
      name_ar: '',
    },
  });

  const { data: type } = useQuery({
    queryKey: ['type', id],
    queryFn: () => api(`/types/${id}`),
    enabled: id !== 'create',
  });

  useEffect(() => {
    if (type) {
      form.reset(type);
    }
  }, [type, form]);

  const goBack = () => {
    router.replace('/types');
  };

  const queryClient = useQueryClient();

  const { mutate: createType, isPending: isCreating } = useMutation({
    mutationFn: (data: FormData) =>
      api('/types', {
        method: 'POST',
        body: {
          name: data.name,
          lang: 'en',
          translations: [
            {
              name: data.name_ar,
              lang: 'ar',
            },
          ],
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['types-list'] });
      successToast('Type created successfully');
      goBack();
    },
  });

  const { mutate: updateType, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormData) =>
      api(`/types/${id}`, {
        method: 'PUT',
        body: {
          name: data.name,
          lang: 'en',
          translations: [
            {
              name: data.name_ar,
              lang: 'ar',
            },
          ],
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['types-list'] });
      successToast('Type updated successfully');
      goBack();
    },
  });

  const onSubmit = async (data: FormData) => {
    if (id === 'create') {
      createType(data);
    } else if (id !== 'create') {
      updateType(data);
    }
  };

  return (
    <>
      <BasePageDialog
        title={id === 'create' ? 'Create Type' : 'Edit Type'}
        subtitle={
          id === 'create' ? 'Add a new type' : 'Update type details'
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
                    <FormLabel>Type Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter type name' {...field} />
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
                    <FormLabel>Type Name (Arabic)</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter type name' {...field} />
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