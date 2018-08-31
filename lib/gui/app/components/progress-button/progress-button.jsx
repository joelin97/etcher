/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const React = require('react')
const ReactDOM = require('react-dom')
const propTypes = require('prop-types')
const Color = require('color')

import styled, { ThemeProvider } from 'styled-components'
import { Button, ProgressBar, Provider } from 'rendition'

import theme from './../../scss/modules/_theme'

const StyledButton = styled(Button).attrs({
  className: "flash-button"
})``

const StyledProgressBarValidate = styled(ProgressBar).attrs({
  className: "flash-progress-bar-validating"
})`
`

const StyledProgressBarFlash = styled(ProgressBar).attrs({
  className: "flash-progress-bar"
})`
  background: ${Color(theme.$paletteThemeWarningBackground).darken(0.05).string()};
`
class ProgressButton extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      disabled: false,
      striped: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    state.disabled = props.shouldFlashStepBeDisabled || props.getLastFlashErrorCode
    state.striped = props.striped == 'check'
  }

  handleClick = () => {
    this.setState({ openBar: true })
    this.props.flash(this.props.image(),this.props.device())
  }

  render () {
    if (this.props.active) {
      if (this.state.striped){
        return (
          <Provider>
            <StyledProgressBarValidate
              primary
              emphasized
              value={this.props.percentage}
            >
              {this.props.label}
            </StyledProgressBarValidate>
          </Provider>
        )
      }
      else {
        return (
          <Provider>
            <StyledProgressBarFlash
              warning
              emphasized
              value={this.props.percentage}
            >
              {this.props.label}
            </StyledProgressBarFlash>
          </Provider>
        )
      }
    }
    else {
      return (
        <Provider>
          <StyledButton
            primary
            onClick={this.handleClick}
            disabled={this.state.disabled}
          >
            {this.props.label}
          </StyledButton>
        </Provider>
      )
    }
  }
}

ProgressButton.propTypes = {
  striped: propTypes.func,
  active: propTypes.func,
  percentage: propTypes.number,
  label: propTypes.string,
  shouldFlashStepBeDisabled: propTypes.func,
  getLastFlashErrorCode: propTypes.func,
  flash: propTypes.func,
  image: propTypes.func,
  device: propTypes.func,
}

module.exports = ProgressButton
