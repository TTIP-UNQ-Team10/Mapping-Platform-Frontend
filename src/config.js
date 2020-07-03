const customizationObj = JSON.parse(process.env.REACT_APP_CUSTOMIZATION)
let config = null

if (customizationObj) {
  const {
    appId,
    name,
    favicon,
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
    favicon: favicon,
    colors: {
      appBackgroundColor: {
        backgroundColor: appBackgroundColor || '#f3f3f3'
      },
      navBarOptions: {
        activeColor: activeColor || '#f3f3f3',
        backgroundColor: backgroundColor || '#343a40',
        inactiveColor: inactiveColor || '#808080'
      },
      panelBackgroundColor: {
        backgroundColor: backgroundColor || '#343a40'
      },
      buttonColor: {
        backgroundColor: backgroundColor || '#343a40',
        textColor: activeColor || '#f3f3f3'
      },
      primaryText: {
        color: primaryText || '#343a40'
      },
      secondaryText: {
        color: secondaryText || '#04d38b'
      }
    },
    name: name,
  }

  const setFaviconAndTitle = (config) => {
    let link = document.querySelector('link[rel*="icon"]') || document.createElement('link')
    let title = document.getElementsByTagName('title')[0] || {}

    title.textContent = config.name
    link.href = config.favicon
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  setFaviconAndTitle(config)

}
const storage = window.localStorage
storage.setItem('styles', JSON.stringify(config))
export default config
