const $ = selector => document.querySelector(selector)

const gotoHome = () => {
    $("main .form").style.display = "flex"
    $("main .qrpage").style.display = "none"
}

const handleQRDownload = () => {
    const link = document.createElement("a")
    const urlImage = $("main .qrcode img").src
    link.href = urlImage
    link.download = "QRcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const setToClipboard = async blob => {
    const data = [new ClipboardItem({ [blob.type]: blob })]

    try {
        await navigator.clipboard.write(data)
    }
    catch (error) {
        console.error(error)
    }
}

const handleQRShare = async () => {
    const urlImage = $("main .qrcode img").src
    const response = await fetch(urlImage)
    const blob = await response.blob()
    await setToClipboard(blob)

    // disable button for 2 seconds
    $("main #qr-share").disabled = true
    setTimeout(() => {
        $("main #qr-share").disabled = false
    }, 2000)
}

const handleSubmit = (e) => {
    e.preventDefault()
    const input = $("main form input").value
    if (input === "") return

    $("main .form").style.display = "none"
    $("main .qrpage").style.display = "flex"

    const qrcode = new QRCode($("main .qrcode"), {
        text: input,
        width: 185,
        height: 185,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    })
}

$("main form button").addEventListener("click", handleSubmit)
$("main .qrpage img").addEventListener("click", gotoHome)
$("main #qr-download").addEventListener("click", handleQRDownload)
$("main #qr-share").addEventListener("click", handleQRShare)