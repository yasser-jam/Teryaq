import { SelectProps } from '@/types'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'

type PropsInterface =
  SelectProps & {
    items: any[]
    itemText?: string
    itemValue?: string
    loading?: boolean
    label: string
    onChange: () => void
  }

export function BaseSelect({
  items,
  itemText = 'name',
  itemValue = 'id',
  loading,
  onChange,
  label,
  ...props
}: PropsInterface) {
  return (
    <>
      <Select onValueChange={onChange} {...props}>
        <SelectTrigger
          size={props.size}
          className={
            props.className + ' ' + (props.fullWidth ? 'w-full' : 'w-48')
          }
        >
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.length ? (
              items.map(item => (
                <SelectItem key={item[itemValue]} value={item[itemValue]}>
                  {item[itemText]}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="empty">
                No {label} Fetched
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
