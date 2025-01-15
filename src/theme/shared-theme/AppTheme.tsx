import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { inputsCustomizations } from "./customizations/inputs.tsx";
import { dataDisplayCustomizations } from "./customizations/dataDisplay.tsx";
import { feedbackCustomizations } from "./customizations/feedback.tsx";
import { navigationCustomizations } from "./customizations/navigation.tsx";
import { surfacesCustomizations } from "./customizations/surfaces.ts";
import { colorSchemes, typography, shape } from "./themePrimitives.ts";

const shadows: [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] = [
  "none",
  "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
  "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
  "0px 1px 8px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.24)",
  "0px 1px 10px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.24)",
  "0px 1px 14px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.24)",
  "0px 1px 18px rgba(0, 0, 0, 0.12), 0px 1px 6px rgba(0, 0, 0, 0.24)",
  "0px 2px 16px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.24)",
  "0px 3px 14px rgba(0, 0, 0, 0.12), 0px 3px 8px rgba(0, 0, 0, 0.24)",
  "0px 3px 16px rgba(0, 0, 0, 0.12), 0px 3px 9px rgba(0, 0, 0, 0.24)",
  "0px 4px 18px rgba(0, 0, 0, 0.12), 0px 4px 10px rgba(0, 0, 0, 0.24)",
  "0px 4px 20px rgba(0, 0, 0, 0.12), 0px 4px 11px rgba(0, 0, 0, 0.24)",
  "0px 5px 22px rgba(0, 0, 0, 0.12), 0px 5px 12px rgba(0, 0, 0, 0.24)",
  "0px 5px 24px rgba(0, 0, 0, 0.12), 0px 5px 13px rgba(0, 0, 0, 0.24)",
  "0px 6px 26px rgba(0, 0, 0, 0.12), 0px 6px 14px rgba(0, 0, 0, 0.24)",
  "0px 6px 28px rgba(0, 0, 0, 0.12), 0px 6px 15px rgba(0, 0, 0, 0.24)",
  "0px 7px 30px rgba(0, 0, 0, 0.12), 0px 7px 16px rgba(0, 0, 0, 0.24)",
  "0px 7px 32px rgba(0, 0, 0, 0.12), 0px 7px 17px rgba(0, 0, 0, 0.24)",
  "0px 8px 34px rgba(0, 0, 0, 0.12), 0px 8px 18px rgba(0, 0, 0, 0.24)",
  "0px 8px 36px rgba(0, 0, 0, 0.12), 0px 8px 19px rgba(0, 0, 0, 0.24)",
  "0px 9px 38px rgba(0, 0, 0, 0.12), 0px 9px 20px rgba(0, 0, 0, 0.24)",
  "0px 9px 40px rgba(0, 0, 0, 0.12), 0px 9px 21px rgba(0, 0, 0, 0.24)",
  "0px 10px 42px rgba(0, 0, 0, 0.12), 0px 10px 22px rgba(0, 0, 0, 0.24)",
  "0px 10px 44px rgba(0, 0, 0, 0.12), 0px 10px 23px rgba(0, 0, 0, 0.24)",
  "0px 11px 46px rgba(0, 0, 0, 0.12), 0px 11px 24px rgba(0, 0, 0, 0.24)",
];

function AppTheme(props: { children: any; disableCustomTheme: any; themeComponents: any }) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;
