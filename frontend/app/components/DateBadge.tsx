import { Badge, Text } from '@radix-ui/themes'

export default function DateBadge({ date }: { date: string }) {
  return (
    <Badge size='1' color='amber'>
      <Text size={{ initial: '1', sm: '2' }}>
        {new Date(date).toDateString()}
      </Text>
    </Badge>
  )
}
