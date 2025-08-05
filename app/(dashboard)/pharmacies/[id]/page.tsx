'use client';
import BasePageDialog from '@/components/base/page-dialog';
import { BasePhoneInput } from '@/components/base/phone-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PHARMACY_SCHEMEA } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  type formData = z.infer<typeof PHARMACY_SCHEMEA>;

  const form = useForm<formData>({
    resolver: zodResolver(PHARMACY_SCHEMEA),
    defaultValues: {
      pharmacyName: '',
      licenseNumber: '',
      email: '',
      phoneNumber: '',
      managerPassword: '',
    },
  });

  const { data: pharmacy } = useQuery({
    queryKey: ['pharmacy', id],
    queryFn: () => api(`/pharmacy/${id}`),
    enabled: id != 'create',
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: (data: formData) =>
      api(`/admin/pharmacies`, { method: 'POST', body: data }),
  });

  useEffect(() => {
    if (pharmacy) {
      form.reset(pharmacy);
    }
  }, [pharmacy]);

  const goBack = () => {
    router.replace('/pharmacies');
  };

  const onSubmit = (data: formData) => {
    create(data);
  };

  const router = useRouter();

  return (
    <>
      <BasePageDialog
        title='Pharmacy Details'
        subtitle='Fill Pharmacy Data'
        className='w-[700px]'
        onOpenChange={goBack}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 items-center gap-4'>
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pharmacy Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Pharmacy Manager Email'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className=''>
                <FormField
                  control={form.control}
                  name='pharmacyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pharmacy Name</FormLabel>

                      <FormControl>
                        <Input placeholder='Pharmacy Name' {...field}></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='licenseNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder='License Number' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <BasePhoneInput {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='managerPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='********'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex items-center gap-2 mt-4 justify-end'>
              <Button variant='ghost' onClick={goBack}>
                Cancel
              </Button>
              <Button loading={isPending}>Save</Button>
            </div>
          </form>
        </Form>
      </BasePageDialog>
    </>
  );
}
