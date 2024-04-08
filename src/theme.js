import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Lato, sans-serif',
    body: 'Lato, sans-serif',
  },
  components: {
    Link: {
      baseStyle: (props) => ({
        fontFamily: 'Lato, sans-serif',
        fontSize: '20px',
        _hover: {
          textDecoration: 'none',
          color: props.colorMode === 'dark' ? 'white' : '#3fbeff',
        },
      }),
    },
  },
});

export default theme;