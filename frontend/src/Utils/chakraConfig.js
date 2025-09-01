import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts:{
        heading: "Inter,sans-serief",
        body: "Inter,sans-serief"
    },

    styles: {
    global: {
      "*:focus": {
        borderColor: "black !important",
      },
    },
  },
  components: {
    Input: {
      defaultProps: { focusBorderColor: "black" },
    },
    Select: {
      defaultProps: { focusBorderColor: "black" },
    },
    Textarea: {
      defaultProps: { focusBorderColor: "black" },
    },
    Button: {
      variants: {
        black: {
          bg: "black",
          color: "white",
          _hover: { bg: "gray.800" },
          _active: { bg: "gray.900" },
        },
      },
    },
    
    Radio: {
      baseStyle: {
        control: {
          _focus: {
            boxShadow: "0 0 0 2px black",
            borderColor: "black",
          },
        },
      },
    },
  },


  
})

// console.log(theme.fonts);

export default theme;