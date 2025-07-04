const PROJECT_TITLE = "random"

const PROJECT_DESCRIPTION = "discover farcaster mini apps"

const MINIAPP = {
  version: "next",
  imageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/cast/image.png`,
  button: {
    title: "open",
    action: {
      type: "launch_frame",
      url: `https://${process.env.NEXT_PUBLIC_HOST}`,
      name: PROJECT_TITLE,
      splashImageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/splash.png`,
      splashBackgroundColor: "#ffffff",
    },
  },
}

const CA = "0x10494bbc4a505dd01b5795de13595415cc59c24b"

export { CA, MINIAPP, PROJECT_DESCRIPTION, PROJECT_TITLE }
