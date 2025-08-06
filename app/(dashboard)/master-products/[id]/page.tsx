'use client';
import BasePageDialog from '@/components/base/page-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BaseMultipleSelect } from '@/components/base/multiple-select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MASTER_PRODUCT_SCHEMA } from '@/lib/schema';
import { categoryOptions, masterProductDefaultValues } from '@/lib/init';
import ManufacturerSelect from '@/components/sys/manufacturer-select';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  type FormData = z.infer<typeof MASTER_PRODUCT_SCHEMA>;

  const form = useForm<FormData>({
    resolver: zodResolver(MASTER_PRODUCT_SCHEMA),
    defaultValues: masterProductDefaultValues,
  });

  const { data: masterProduct } = useQuery({
    queryKey: ['master-product', id],
    queryFn: () => api(`/master_products/${id}`),
    enabled: id !== 'create',
  });

  useEffect(() => {
    if (masterProduct) {
      form.reset(masterProduct);
    }
  }, [masterProduct, form]);

  const goBack = () => {
    router.replace('/master-products');
  };

  const actions = (
    <>
      <div className='flex items-center gap-2 mt-4'>
        <Button variant='ghost' onClick={goBack}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </>
  );

  const onSubmit = async (data: FormData) => {
    console.log('Master Product Data:', data);
    // Handle form submission here
  };

  return (
    <>
      <BasePageDialog
        title='Master Product Details'
        subtitle='Fill Master Product Data'
        className='w-[800px]'
        footer={actions}
        onOpenChange={goBack}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 items-center gap-4'>
              {/* Basic Product Information */}
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='tradeName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Trade Name' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='scientificName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scientific Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Scientific Name' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='manufacturerId'
                  render={({ field }) => (
                    <ManufacturerSelect
                      {...field}
                      onChange={(val: any) =>
                        form.setValue('manufacturerId', val)
                      }
                    />
                  )}
                ></FormField>
              </div>

              <div className=''>
                <FormField
                  control={form.control}
                  name='refSellingPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Selling Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder='0.00'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Categories */}
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='categoryIds'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <BaseMultipleSelect
                          options={categoryOptions}
                          onValueChange={field.onChange}
                          placeholder='Select categories'
                          maxCount={3}
                          defaultValue={field.value.map(String)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Prescription Required */}
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='requiresPrescription'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>Requires Prescription</FormLabel>
                      </div>
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
