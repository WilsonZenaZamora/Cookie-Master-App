import { ChangeEvent, FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Cookies from 'js-cookie'

import { Layout } from '../components/layouts'

const ThemeChangerPage:FC = ( props ) => {

  console.log({ props })

  const [currentTheme, setCurrentTheme] = useState('light')

  const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const selectedTheme = event.target.value

    console.log({ selectedTheme })
    setCurrentTheme( selectedTheme )

    localStorage.setItem('theme', selectedTheme)
    Cookies.set('theme', selectedTheme)
  }

  useEffect(() => {
    
    console.log( 'LocalStorage:', localStorage.getItem('theme') );
    console.log( 'Cookies:', Cookies.get('theme') );

  }, [])
  

  return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <RadioGroup
                        value={ currentTheme }
                        onChange={ onThemeChange }
                    >
                        <FormControlLabel value='light' control={ <Radio /> } label='light' />
                        <FormControlLabel value='dark' control={ <Radio /> } label='dark' />
                        <FormControlLabel value='custom' control={ <Radio /> } label='custom' />
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { theme = 'light', name = 'No name' } = req.cookies

    return {
        props: {
            theme,
            name,
        }
    }
}

export default ThemeChangerPage;