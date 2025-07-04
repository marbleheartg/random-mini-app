export type MiniApps = MiniApp[]

export interface MiniApp {
  version: string
  frames_url: string
  author: Author
  manifest: Manifest
  metadata: Metadata
  image?: string
}

export interface Author {
  object: string
  fid: number
  username: string
  display_name?: string
  pfp_url?: string
  custody_address: string
  pro?: Pro
  profile: Profile
  follower_count: number
  following_count: number
  verifications: string[]
  verified_addresses: VerifiedAddresses
  verified_accounts: VerifiedAccount[]
  power_badge: boolean
  experimental: Experimental
  score: number
  url?: string
}

export interface Pro {
  status: string
  subscribed_at: string
  expires_at: string
}

export interface Profile {
  bio: Bio
  banner?: Banner
  location?: Location
}

export interface Bio {
  text: string
  mentioned_channels?: MentionedChannel[]
  mentioned_channels_ranges?: MentionedChannelsRange[]
  mentioned_profiles?: MentionedProfile[]
  mentioned_profiles_ranges?: MentionedProfilesRange[]
}

export interface MentionedChannel {
  object: string
  id: string
  name: string
  image_url: string
}

export interface MentionedChannelsRange {
  start: number
  end: number
}

export interface MentionedProfile {
  object: string
  fid: number
  username: string
  display_name: string
  pfp_url: string
  custody_address: string
}

export interface MentionedProfilesRange {
  start: number
  end: number
}

export interface Banner {
  url: string
}

export interface Location {
  latitude: number
  longitude: number
  address?: Address
}

export interface Address {
  city: string
  state?: string
  state_code?: string
  country: string
  country_code: string
}

export interface VerifiedAddresses {
  eth_addresses: string[]
  sol_addresses: string[]
  primary: Primary
}

export interface Primary {
  eth_address?: string
  sol_address?: string
}

export interface VerifiedAccount {
  platform: string
  username: string
}

export interface Experimental {
  neynar_user_score: number
  deprecation_notice: string
}

export interface Manifest {
  account_association: AccountAssociation
  frame: Frame
}

export interface AccountAssociation {
  header: string
  payload: string
  signature: string
}

export interface Frame {
  version: string
  name: string
  home_url: string
  icon_url: string
  button_title?: string
  splash_image_url?: string
  splash_background_color?: string
  webhook_url?: string
  primary_category?: string
  tags?: string[]
  subtitle?: string
  description?: string
  screenshot_urls?: string[]
  hero_image_url?: string
  tagline?: string
  og_title?: string
  og_description?: string
  og_image_url?: string
  noindex?: boolean
  image_url?: string
}

export interface Metadata {
  html: Html
}

export interface Html {
  ogUrl?: string
  ogLogo?: string
  ogType?: string
  favicon?: string
  ogImage?: OgImage[]
  ogTitle?: string
  ogLocale?: string
  ogSiteName?: string
  ogDescription?: string
  fcFrame?: FcFrame
  ogAudioURL?: string
  ogAudioType?: string
  ogDate?: string
  oembed?: Oembed
  ogLocaleAlternate?: string
}

export interface OgImage {
  url: string
  type?: string
  width?: string
  height?: string
  alt?: string
}

export interface FcFrame {
  button: Button
  version: string
  imageUrl: string
}

export interface Button {
  title: string
  action: Action
}

export interface Action {
  url?: string
  name?: string
  type: string
  splashImageUrl?: string
  splashBackgroundColor?: string
  swap?: boolean
  token?: string
}

export interface Oembed {
  html: string
  type: string
  title: string
  width: number
  height: number
  method: string
  version: string
  author_url: string
  author_name: string
  provider_url: string
  provider_name: string
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
}
