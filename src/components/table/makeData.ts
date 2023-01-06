import { faker } from '@faker-js/faker'
import moment from 'moment';


export type AccountDataType = {
  accountId: number
  accountName: string
  accountStatus: 'Open' | 'PendingOpen' | 'Closed',
  productType: 'Equity' | 'Fixed Income' | 'Balanced',
  date: string
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}


const newData = (): AccountDataType => {
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
      // date: moment().format("MM-DD-YYYY")
      date: moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)))
      .format('MM-DD-YYYY')
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): AccountDataType[] => {
    const len = lens[depth]!
    return range(len).map((d): AccountDataType => {
      return {
        ...newData(),
      }
    })
  }

  return makeDataLevel()
}
