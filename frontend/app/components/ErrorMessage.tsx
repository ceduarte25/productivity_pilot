import { Callout } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import { MdErrorOutline } from 'react-icons/md'

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null

  return (
    <Callout.Root size='1' color='red' className='mt-3'>
      <Callout.Icon>
        <MdErrorOutline />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  )
}
