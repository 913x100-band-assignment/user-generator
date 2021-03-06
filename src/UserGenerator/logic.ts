import cuid from 'cuid'
import { useState } from 'react'
import { randomDate } from '../utils/randomDate'
import { faker } from '@faker-js/faker'

interface UserProps {
  id: string
  username: string
  password: string
  profile_image: string
  joined_date: Date
}

export const useUserGenerator = () => {
  const [userinfo, setUserinfo] = useState<UserProps | null>(null)

  const generate = () => {
    setUserinfo(null)

    const user: UserProps = {
      id: `user${cuid()}`,
      username: faker.internet.userName(),
      password: faker.random.alphaNumeric(10),
      profile_image: `https://api.lorem.space/image/face?w=150&h=150&hash=${faker.random.alphaNumeric(
        8
      )}`,
      joined_date: randomDate(new Date(2019, 0, 1), new Date()),
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }

    fetch('https://kq51atsidi.execute-api.us-east-1.amazonaws.com/Prod/user/', requestOptions)
      .then(resp => resp.json())
      .then(resp => setUserinfo(resp))
  }

  return {
    generate,
    userinfo,
  }
}
