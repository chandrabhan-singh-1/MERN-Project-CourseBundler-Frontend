import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="lg"
      fontSize="xl"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      colorScheme="cyan"
      position={'fixed'}
      top={'3'}
      right={'4'}
      zIndex={'overlay'}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      _hover={{
        transform: 'scale(1.2)',
        backgroundColor: 'rgba(0, 254, 237, 0.32)',
      }}
      {...props}
    />
  );
};
