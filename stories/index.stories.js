import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo';
import Frame from '../lib/component.js'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

const containerStyle = {width: '250px', height: '250px'}
const style = {width: '100%', height: '100%'}

storiesOf('Shader Frame', module)
  .add('with image URL', () => (
    <Frame style={containerStyle} imgstyle={style} class={'full'} source='cat.jpg'/>
  ))