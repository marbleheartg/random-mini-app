import { CA } from "@/lib/constants"
import miniappsJson from "@/lib/miniapps.json" assert { type: "json" }
import { MiniApp, MiniApps } from "@/lib/types"
import getContrastColor from "@/lib/utils/getContrastColor"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { parseAbi, parseEther } from "viem"
import { base } from "viem/chains"
import { useConnect, useSwitchChain, useWriteContract } from "wagmi"

const miniapps = miniappsJson as MiniApps

export default function Home() {
  const [miniapp, setMiniapp] = useState<MiniApp>()

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const idx = Math.floor(Math.random() * miniapps.length)
    setIdx(idx)
    setMiniapp(miniapps[idx])
  }, [])

  let { icon_url, home_url, name, description, screenshot_urls, splash_background_color } =
    miniapp?.manifest?.frame ?? {}

  const { ogUrl, ogImage, ogTitle, ogSiteName, ogDescription, fcFrame } = miniapp?.metadata.html ?? {}
  const { url } = ogImage?.[0] ?? {}
  const { imageUrl } = fcFrame ?? {}

  const og = url ?? imageUrl

  const link = home_url ?? ogUrl
  const title = name ?? ogTitle ?? ogSiteName
  description = description ?? ogDescription

  const { author } = miniapp ?? {}
  const { pfp_url, username, fid } = author ?? {}

  const [screenshotsFailed, setScreenshotsFailed] = useState<boolean>(false)
  const [ogFailed, setOgFailed] = useState<boolean>(false)
  const [iconFailed, setIconFailed] = useState<boolean>(false)
  const [pfpFailed, setPfpFailed] = useState<boolean>(false)

  useEffect(() => {
    setIconFailed(false)
    setScreenshotsFailed(false)
    setOgFailed(false)
    setPfpFailed(false)
    setMessage("⭐")
  }, [miniapp])

  const textColor = splash_background_color ? getContrastColor(splash_background_color) : "#000000"

  const { connect, connectors } = useConnect()
  const { status, writeContract } = useWriteContract()
  const { switchChain } = useSwitchChain()

  const [message, setMessage] = useState("⭐")

  useEffect(() => {
    switch (status) {
      case "success":
        setMessage("✅")
        break
      default:
        setMessage("⭐")
        break
    }
  }, [status])

  return (
    <main
      className={clsx("flex flex-col text-center text-xl border", "h-screen")}
      style={{
        backgroundColor: splash_background_color ?? "#6a7282",
        color: textColor,
      }}
    >
      <div className="flex">
        <div
          className={clsx(
            "aspect-square w-1/2 border-r overflow-hidden",
            (!icon_url || iconFailed) && "flex justify-center items-center",
          )}
        >
          {icon_url && !iconFailed ? (
            <img src={icon_url} alt="logo" className="w-full h-full object-fill" onError={() => setIconFailed(true)} />
          ) : (
            <div className="line-through">icon</div>
          )}
        </div>

        <div
          className={clsx(
            "aspect-square w-1/2",
            "flex justify-center items-center",
            "text-lg",
            "px-3",
            "line-clamp-2 pointer-events-none",
            !title && "line-through",
          )}
        >
          <div>
            {title
              ? !title.includes(" ") && title.length > 14
                ? `${title.replace(/\./g, "").slice(0, 14)}`
                : title
              : "name"}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "aspect-[4/1]",
          "flex justify-center items-center flex-1 line-clamp-3",
          "border-y",
          "text-sm",
          "px-3 pointer-events-none",
          !description && "line-through",
        )}
      >
        <div className="line-clamp-3">{description ?? "description"}</div>
      </div>

      <div className="flex flex-1">
        <div
          className={clsx(
            "flex justify-center aspect-[3/2] w-1/2 border-r overflow-hidden pointer-events-none",
            (!screenshot_urls?.length || screenshotsFailed) && "justify-center items-center text-sm",
          )}
        >
          {!screenshotsFailed && screenshot_urls?.length ? (
            screenshot_urls?.map((val, i) => (
              <img
                key={i}
                src={val}
                alt="screenshot"
                className="object-contain h-full"
                onError={() => setScreenshotsFailed(true)}
              />
            ))
          ) : !ogFailed && og ? (
            <img src={og} alt="og" className="w-full object-cover" onError={() => setOgFailed(true)} />
          ) : (
            <div className="line-through">pictures</div>
          )}
        </div>

        <div
          className={clsx("flex justify-center items-center aspect-[3/2] w-1/2 cursor-pointer", "text-2xl")}
          onClick={() => {
            try {
              connect({ connector: connectors[0] })
            } catch (error) {}

            try {
              switchChain({ chainId: base.id })
            } catch (error) {}

            writeContract({
              address: CA,
              abi: parseAbi(["function mint(uint256 id) payable"]),
              functionName: "mint",
              args: [BigInt(idx)],
              chain: base,
              value: parseEther("0.0000843"),
            })

            // writeContract({
            //   address: CA,
            //   abi: parseAbi(["function withdraw()"]),
            //   functionName: "withdraw",
            //   args: [],
            //   chain: base,
            // })
          }}
        >
          <div>{message}</div>
        </div>
      </div>

      <div
        className={clsx("flex justify-center items-center flex-1 gap-3", "border-y", "text-xl", "cursor-pointer")}
        onClick={() => sdk.actions.viewProfile({ fid: fid! })}
      >
        <img
          src={!pfpFailed && pfp_url ? pfp_url : "/images/global/user.svg"}
          alt="pfp"
          className="aspect-square w-8 rounded-full"
          onError={() => setPfpFailed(true)}
        />

        <div>@{username}</div>
      </div>

      <div
        className={clsx(
          "flex-1",
          "flex justify-center items-center",
          "border-b",
          "text-xs",
          "px-3 pointer-events-none",
        )}
      >
        <div>swipe from left to right or click the browser back button to go back after opening</div>
      </div>

      <div className="flex flex-1">
        <button
          className={clsx("aspect-[2/1] w-1/3", "flex justify-center items-center", "border-r underline")}
          onClick={() =>
            sdk.actions.composeCast({
              text: `hey, @${username}! just a reminder that your ${title} mini app is awesome! 💫\n\nfound it and many others here:`,
              embeds: [`https://${process.env.NEXT_PUBLIC_HOST}`],
            })
          }
        >
          <div>cast</div>
        </button>

        <button
          className={clsx("aspect-[2/1] w-1/3", "flex justify-center items-center", "border-r underline")}
          onClick={() => {
            const idx = Math.floor(Math.random() * miniapps.length)
            setIdx(idx)

            const { ogImage, fcFrame } = miniapps[idx]?.metadata.html ?? {}
            const { url } = ogImage?.[0] ?? {}
            const { imageUrl } = fcFrame ?? {}
            const og = url ?? imageUrl

            let iconLoaded = false
            let pfpLoaded = false
            let picturesLoaded = false

            const trySetMiniapp = () => {
              if (iconLoaded && picturesLoaded && pfpLoaded) {
                setMiniapp(miniapps[idx])
              }
            }

            const pfp = new Image()
            pfp.src = miniapps[idx]?.author.pfp_url ?? "/images/global/user.svg"

            pfp.onload = () => {
              pfpLoaded = true
              trySetMiniapp()
            }
            pfp.onerror = () => {
              pfpLoaded = true
              trySetMiniapp()
            }

            const icon = new Image()
            icon.src = miniapps[idx]?.manifest.frame?.icon_url ?? ""

            icon.onload = () => {
              iconLoaded = true
              trySetMiniapp()
            }
            icon.onerror = () => {
              iconLoaded = true
              setIconFailed(true)
              trySetMiniapp()
            }

            const screenshots = miniapps[idx].manifest.frame.screenshot_urls

            if (screenshots?.length) {
              screenshots.forEach(val => {
                const scr = new Image()
                scr.src = val

                scr.onload = () => {
                  picturesLoaded = true
                  trySetMiniapp()
                }
                scr.onerror = () => {
                  picturesLoaded = true
                  setScreenshotsFailed(true)
                  trySetMiniapp()
                }
              })
            } else if (og) {
              const ogLoad = new Image()
              ogLoad.src = og

              ogLoad.onload = () => {
                picturesLoaded = true
                trySetMiniapp()
              }
              ogLoad.onerror = () => {
                picturesLoaded = true
                setScreenshotsFailed(true)
                trySetMiniapp()
              }
            } else {
              picturesLoaded = true
              trySetMiniapp()
            }
          }}
        >
          <div>next</div>
        </button>

        <a
          href={link}
          rel="noreferrer"
          className={clsx("aspect-[2/1] w-1/3", "flex justify-center items-center underline")}
        >
          open
        </a>
      </div>
    </main>
  )
}
