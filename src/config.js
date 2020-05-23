let customizationObj = null
try {
  customizationObj = JSON.parse(process.env.REACT_APP_CUSTOMIZATION)
}
catch (e) {}

let config = null

if (customizationObj) {
  const {
    appId,
    appName,
    navBarOptions: {
      navActiveColor: activeColor,
      navBackgroundColor: backgroundColor,
      navInactiveColor: inactiveColor
    },
    colors: {
      backgroundColor: appBackgroundColor,
      primaryText,
      secondaryText
    },
    appLogo,
  } = customizationObj

  config = {
    appId: appId || 'kintun.wingu.org',
    appLogo: appLogo || '/mapping-platform-logo.svg',
    colors: {
      appBackgroundColor: {
        backgroundColor: appBackgroundColor || '#343a40'
      },
      navBarOptions: {
        activeColor: activeColor || '#f3f3f3',
        backgroundColor: backgroundColor || '#343a40',
        inactiveColor: inactiveColor || '#808080'
      },
      panelBackgroundColor: {
        backgroundColor: backgroundColor || '#343a40'
      },
      primaryText: {
        color: primaryText || '#343a40'
      },
      secondaryText: {
        color: secondaryText || '#04d38b'
      }
    },
    name: appName,
  }
}
else {
  config = {
    appId: 'kintun.wingu.org',
    appLogo: '/mapping-platform-logo.svg',
    colors: {
      appBackgroundColor: {
        backgroundColor: '#343a40'
      },
      navBarOptions: {
        activeColor: '#f3f3f3',
        backgroundColor: '#343a40',
        inactiveColor: '#808080'
      },
      panelBackgroundColor: {
        backgroundColor: '#343a40'
      },
      primaryText: {
        color: '#343a40'
      },
      secondaryText: {
        color: '#04d38b'
      }
    },
    name: "KINTUN",
  }
}

export default config
