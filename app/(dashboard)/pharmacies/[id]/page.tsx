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

export default function Page() {
  type formData = z.infer<typeof PHARMACY_SCHEMEA>;

  const form = useForm<formData>({
    resolver: zodResolver(PHARMACY_SCHEMEA),
    defaultValues: {},
  });

  const goBack = () => {
    router.replace('/pharmacies')
  }

  const actions = (
    <>
      <div className='flex items-center gap-2 mt-4'>
        <Button variant='ghost' onClick={goBack}>Cancel</Button>
        <Button>Save</Button>
      </div>
    </>
  );

  const onSubmit = async () => {};


  const router = useRouter()

  return (
    <>
      <BasePageDialog
        title='Pharmacy Details'
        subtitle='Fill Pharmacy Data'
        className='w-[700px]'
        footer={actions}
        onOpenChange={goBack}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 items-center gap-4'>
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
          </form>
        </Form>
      </BasePageDialog>
    </>
  );
}
