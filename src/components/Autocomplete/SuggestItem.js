import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

const Wrapper = styled.li`
  display: block;
  width: 100%;
  background: ${props => props.theme.colors.default.white};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.default.lightPink};
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const Inner = styled.span`
  display: block;
  width: 100%;

  font-size: 1rem;
  padding: 0.3em;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MainText = styled.span`
  padding: 0 0.2em;
  color: ${props => props.theme.colors.default.primary};

  & > b {
    font-weight: 700;
  }
`;

const SecondaryText = styled.span`
  font-size: 0.9rem;
  padding: 0 0.2em;
  color: ${props => props.theme.colors.default.secondary};
`;

class SuggestItem extends PureComponent {
  static propTypes = {
    suggest: PropTypes.object.isRequired,
    handleIgnoreBlur: PropTypes.func.isRequired
  };

  /**
   * Format the matched substring provided by google
   * @return {String} Formatted string with highlighted matched text
   */
  formattedMainText = () => {
    const { suggest } = this.props;

    if (!suggest.matchedSubstrings) {
      return suggest.mainText;
    }

    const start = suggest.matchedSubstrings.offset;
    const length = suggest.matchedSubstrings.length;
    const end = start + length;
    
    const pre = (start > 0) ? suggest.mainText.slice(0, start) : '';
    const matchedSubstring = suggest.mainText.substring(start, end);
    const post = (end < suggest.mainText.length) ? suggest.mainText.slice(end) : '';

    return {
      pre,
      matchedSubstring,
      post
    };
  };

  render() {
    const { suggest, handleIgnoreBlur } = this.props;
    const duration = 250; // in ms

    const formattedString = this.formattedMainText();

    return (
      <Transition in={this.props.in} timeout={duration} mountOnEnter={true} unmountOnExit={true}>
        {status => {
          const style = {
            opacity: 0,
            transition: `all ${duration}ms ease-out`
          };
          switch (status) {
            case 'entering':
              style.transform = 'translateY(-25%)';
              style.opacity = 0;
              break;
            case 'entered':
              style.transform = 'translateY(0)';
              style.opacity = 1;
              break;
            case 'exiting':
              style.transform = 'translateY(-25%)';
              style.opacity = 0;
              break;
            default:
              style.transform = 'translateY(-25%)';
              style.opacity = 0;
              break;
          }
          return (
            <Wrapper
              style={{ ...style }}
              onMouseDown={() => handleIgnoreBlur(true)}
            >
              <Inner>
                <MainText>
                  {formattedString.pre}
                  <b>{formattedString.matchedSubstring}</b>
                  {formattedString.post}
                </MainText>
                <SecondaryText>{suggest.secondaryText}</SecondaryText>
              </Inner>
            </Wrapper>
          );
        }}
      </Transition>
    );
  }
}

export default SuggestItem;
