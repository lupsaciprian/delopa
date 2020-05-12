import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export const SocialIcon = ({ type, size, click, link }) => {
  const render = () => {
    if (link)
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <IconButton
            onClick={click}
            size={size}
            aria-label={type.toLowerCase()}
          >
            {type === 'Facebook' && <FacebookIcon />}
            {type === 'Youtube' && <YouTubeIcon />}
            {type === 'Twitter' && <TwitterIcon />}
            {type === 'Github' && <GitHubIcon />}
            {type === 'LinkedIn' && <LinkedInIcon />}
            {type === 'Instagram' && <InstagramIcon />}
            {type === 'Web' && <LanguageIcon />}
          </IconButton>
        </a>
      );
    else
      return (
        <IconButton onClick={click} size={size} aria-label={type.toLowerCase()}>
          {type === 'Facebook' && <FacebookIcon />}
          {type === 'Youtube' && <YouTubeIcon />}
          {type === 'Twitter' && <TwitterIcon />}
          {type === 'Github' && <GitHubIcon />}
          {type === 'LinkedIn' && <LinkedInIcon />}
          {type === 'Instagram' && <InstagramIcon />}
          {type === 'Web' && <LanguageIcon />}{' '}
        </IconButton>
      );
  };

  return <Tooltip title={type}>{render()}</Tooltip>;
};

SocialIcon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.oneOf([
    'Facebook',
    'Youtube',
    'Twitter',
    'Github',
    'LinkedIn',
    'Instragram',
    'Web',
  ]).isRequired,
  link: PropTypes.string,
};

SocialIcon.defaultProps = {
  size: 'small',
};
