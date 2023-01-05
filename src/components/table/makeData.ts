import { faker } from '@faker-js/faker'

export type AccountDataType = {
  accountId: number
  accountName: string
  accountStatus: 'Open' | 'PendingOpen' | 'Closed',
  productType: 'Equity' | 'Fixed Income' | 'Balanced'
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): AccountDataType => {
  return {
    accountId: faker.datatype.number(100),
    accountName: faker.name.fullName(),
    accountStatus: faker.helpers.shuffle<AccountDataType['accountStatus']>([
      'Open',
      'PendingOpen',
      'Closed',
    ])[0]!,
    productType: faker.helpers.shuffle<AccountDataType['productType']>([
        'Equity',
        'Fixed Income',
        'Balanced',
      ])[0]!,
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): AccountDataType[] => {
    const len = lens[depth]!
    return range(len).map((d): AccountDataType => {
      return {
        ...newPerson(),
      }
    })
  }

  return makeDataLevel()
}
